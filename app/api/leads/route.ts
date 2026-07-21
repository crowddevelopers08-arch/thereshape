import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendToTeleCRM } from '@/lib/telecrm'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      where: status && status !== 'all' ? { status: status as any } : undefined,
    })

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  let savedLead: { id: string } | null = null

  try {
    const body = await request.json()
    const {
      name,
      phone,
      area,
      duration,
      branch,
      source,
      medium,
      campaign,
      pageUrl,
    } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    // 1) Save to the database first so no lead is ever lost.
    savedLead = await prisma.lead.create({
      data: {
        name,
        phone,
        area: area || null,
        duration: duration || null,
        branch: branch || 'Reshape Clinic',
        source: source || 'direct',
        medium: medium || null,
        campaign: campaign || null,
        pageUrl: pageUrl || null,
        status: 'NEW',
        telecrmSynced: false,
      },
    })

    // 2) Best-effort push to TeleCRM; record the outcome on the lead.
    let telecrmSynced = false
    let telecrmError: string | null = null
    try {
      const result = await sendToTeleCRM({
        name,
        phone,
        area,
        duration,
        branch: branch || 'Reshape Clinic',
        source,
        medium,
        campaign,
        pageUrl,
      })
      telecrmSynced = result.synced
      await prisma.lead.update({
        where: { id: savedLead.id },
        data: { telecrmSynced: result.synced, telecrmId: result.telecrmId },
      })
    } catch (error) {
      telecrmError = error instanceof Error ? error.message : String(error)
      console.error('TeleCRM sync failed:', telecrmError)
    }

    return NextResponse.json({
      success: true,
      lead: savedLead,
      telecrmSynced,
      message: telecrmError
        ? 'Lead saved but TeleCRM sync failed'
        : 'Lead created successfully',
    })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Internal server error', leadSaved: !!savedLead },
      { status: 500 }
    )
  }
}
