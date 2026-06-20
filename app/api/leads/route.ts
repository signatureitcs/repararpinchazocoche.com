import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 25,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, source_page_slug } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    // Save to Supabase
    const { error: dbError } = await supabaseAdmin.from('leads').insert({
      name,
      email,
      phone,
      source_page_slug: source_page_slug || 'unknown',
      service_type: 'neumaticos-camion',
      job_status: 'new',
      message: `Solicitud desde: ${source_page_slug}`,
    })

    if (dbError) console.error('DB error:', dbError)

    // Send email notifications
    const recipients = (process.env.LEAD_EMAILS || '').split(',').filter(Boolean)
    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#16a34a;padding:20px;border-radius:8px 8px 0 0;">
          <h2 style="color:white;margin:0;">🚛 Nueva Solicitud de Asistencia</h2>
        </div>
        <div style="background:#f9fafb;padding:25px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;width:130px;">Nombre:</td><td style="padding:8px 0;color:#111827;">${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Email:</td><td style="padding:8px 0;color:#111827;">${email}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Teléfono:</td><td style="padding:8px 0;color:#111827;font-size:18px;"><strong>${phone}</strong></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Página:</td><td style="padding:8px 0;color:#6b7280;">${source_page_slug}</td></tr>
          </table>
          <div style="margin-top:20px;padding:15px;background:#dcfce7;border-radius:8px;">
            <p style="margin:0;color:#15803d;font-weight:bold;">⚡ Contactar en menos de 15 minutos</p>
          </div>
        </div>
      </div>
    `

    if (recipients.length > 0) {
      await transporter.sendMail({
        from: `"Reparación Pinchazos 24h" <${process.env.SMTP_USER}>`,
        to: recipients.join(', '),
        subject: `🚛 Nueva solicitud de asistencia — ${name} — ${phone}`,
        html: emailHtml,
      }).catch(e => console.error('Email error:', e))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
