import { NextRequest, NextResponse } from 'next/server'
import { sendToTeleCRM } from '@/lib/telecrm'
import { sendToGoogleSheet } from '@/lib/sheets'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs'

// Every submission is delivered to TeleCRM and the Google Sheet (system of
// record for the CRM team), and also saved to our own database for the
// admin dashboard.

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      phone,
      email,
      location,
      area,
      duration,
      photoData,
      branch,
      source,
      medium,
      campaign,
      pageUrl,
      formSource,
      hairLossArea,
      familyHistory,
    } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    const leadPayload = {
      name,
      phone,
      email,
      location,
      area,
      duration,
      branch: branch || 'Reshape Clinic',
      source,
      medium,
      campaign,
      pageUrl,
      formSource,
      hairLossArea,
      familyHistory,
    }
    const dbPayload = {
      name,
      phone,
      email,
      location,
      area,
      duration,
      branch: branch || 'Reshape Clinic',
      source,
      medium,
      campaign,
      pageUrl,
      formSource,
    }

    // Save first so an uploaded assessment image can be exposed to TeleCRM as a
    // stable lead-specific URL. CRM and Sheets remain independent best-effort syncs.
    const dbOutcome = await Promise.resolve(prisma.lead.create({ data: { ...dbPayload, photoData } }))
      .then((value) => ({ status: 'fulfilled' as const, value }))
      .catch((reason) => ({ status: 'rejected' as const, reason }))
    const photoUrl =
      dbOutcome.status === 'fulfilled' && photoData
        ? new URL(`/api/leads/${dbOutcome.value.id}/photo`, request.nextUrl.origin).toString()
        : undefined
    const [telecrmOutcome, sheetOutcome] = await Promise.allSettled([
      sendToTeleCRM({ ...leadPayload, photoUrl }),
      sendToGoogleSheet(leadPayload),
    ])

    let telecrmSynced = false
    if (telecrmOutcome.status === 'fulfilled') {
      telecrmSynced = telecrmOutcome.value.synced
      if (dbOutcome.status === 'fulfilled' && telecrmOutcome.value.telecrmId) {
        await prisma.lead
          .update({
            where: { id: dbOutcome.value.id },
            data: { telecrmSynced: true, telecrmId: telecrmOutcome.value.telecrmId },
          })
          .catch((err) => console.error('Failed to record telecrmId on lead:', err))
      }
    } else {
      console.error('TeleCRM sync failed:', telecrmOutcome.reason)
    }

    let sheetSynced = false
    if (sheetOutcome.status === 'fulfilled') {
      sheetSynced = sheetOutcome.value.synced
    } else {
      console.error('Google Sheets sync failed:', sheetOutcome.reason)
    }

    const dbSaved = dbOutcome.status === 'fulfilled'
    if (dbOutcome.status === 'rejected') {
      console.error('Database save failed:', dbOutcome.reason)
    }

    // Our own database is the system of record for the admin dashboard and the
    // booking flow (it's what lets the user continue to WhatsApp); TeleCRM and
    // Google Sheets are best-effort integrations layered on top.
    const captured = dbSaved || telecrmSynced || sheetSynced

    const failedIntegrations = [!telecrmSynced && 'TeleCRM', !sheetSynced && 'Google Sheets'].filter(Boolean)

    return NextResponse.json(
      {
        success: captured,
        telecrmSynced,
        sheetSynced,
        dbSaved,
        message: !captured
          ? 'Lead could not be saved or delivered to any destination'
          : failedIntegrations.length
            ? `Lead saved; ${failedIntegrations.join(' and ')} sync failed`
            : 'Lead saved and delivered to TeleCRM and Google Sheets',
      },
      { status: captured ? 200 : 502 },
    )
  } catch (error) {
    console.error('Error handling lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
