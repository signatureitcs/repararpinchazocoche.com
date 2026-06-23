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

// Send email in background (don't await)
async function sendEmailAsync(recipients: string[], name: string, email: string, phone: string, source_page_slug: string) {
  try {
    // Validate SMTP config
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('❌ SMTP config missing:', {
        host: !!process.env.SMTP_HOST,
        user: !!process.env.SMTP_USER,
        pass: !!process.env.SMTP_PASS,
      })
      return
    }

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#16a34a;padding:20px;border-radius:8px 8px 0 0;">
          <h2 style="color:white;margin:0;">Nueva Solicitud de Asistencia</h2>
        </div>
        <div style="background:#f9fafb;padding:25px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;width:130px;">Nombre:</td><td style="padding:8px 0;color:#111827;">${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Email:</td><td style="padding:8px 0;color:#111827;">${email}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Telefono:</td><td style="padding:8px 0;color:#111827;font-size:18px;"><strong>${phone}</strong></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Pagina:</td><td style="padding:8px 0;color:#6b7280;">${source_page_slug}</td></tr>
          </table>
          <div style="margin-top:20px;padding:15px;background:#dcfce7;border-radius:8px;">
            <p style="margin:0;color:#15803d;font-weight:bold;">Contactar en menos de 15 minutos</p>
          </div>
        </div>
      </div>
    `

    console.log(`📧 Sending email to: ${recipients.join(', ')} from: ${process.env.SMTP_USER}`)
    
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipients.join(', '),
      subject: `Nueva solicitud de asistencia - ${name} - ${phone}`,
      html: emailHtml,
    })
    
    console.log(`✅ Email sent successfully. MessageID: ${info.messageId}`)
  } catch (error) {
    console.error('❌ Email failed:', error instanceof Error ? error.message : String(error))
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, source_page_slug } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    // Save to Supabase immediately
    const { error: dbError } = await supabaseAdmin.from('leads').insert({
      name,
      email,
      phone,
      source_page_slug: source_page_slug || 'unknown',
      service_type: 'neumaticos-camion',
      job_status: 'new',
      message: `Solicitud desde: ${source_page_slug}`,
    })

    if (dbError) {
      console.error('DB error:', dbError)
      return NextResponse.json({ error: 'Error al guardar solicitud' }, { status: 500 })
    }

    // Respond immediately to user
    const response = NextResponse.json({ success: true })

    // Send emails in background (after response is sent)
    const recipients = (process.env.LEAD_EMAILS || '').split(',').filter(Boolean)
    if (recipients.length > 0) {
      // Don't await - send in background
      sendEmailAsync(recipients, name, email, phone, source_page_slug).catch(e => console.error('Async email error:', e))
    }

    return response
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
