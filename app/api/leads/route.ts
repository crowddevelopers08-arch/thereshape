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
    const { name, phone, email, area, duration, branch, source, medium, campaign, pageUrl } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    const leadPayload = {
      name,
      phone,
      email,
      area,
      duration,
      branch: branch || 'Reshape Clinic',
      source,
      medium,
      campaign,
      pageUrl,
    }

    // Deliver to TeleCRM + Google Sheet + our own database in parallel; independent best-effort.
    const [telecrmOutcome, sheetOutcome, dbOutcome] = await Promise.allSettled([
      sendToTeleCRM(leadPayload),
      sendToGoogleSheet(leadPayload),
      prisma.lead.create({ data: leadPayload }),
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

    if (dbOutcome.status === 'rejected') {
      console.error('Database save failed:', dbOutcome.reason)
    }

    // The lead is captured as long as it reached at least one destination.
    const captured = telecrmSynced || sheetSynced

    return NextResponse.json(
      {
        success: captured,
        telecrmSynced,
        sheetSynced,
        message: captured
          ? telecrmSynced && sheetSynced
            ? 'Lead delivered to TeleCRM and Google Sheets'
            : 'Lead captured; one integration failed'
          : 'Lead could not be delivered to any destination',
      },
      { status: captured ? 200 : 502 },
    )
  } catch (error) {
    console.error('Error handling lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
