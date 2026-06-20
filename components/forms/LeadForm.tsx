'use client'

import { useState } from 'react'

export default function LeadForm({ pageSlug }: { pageSlug: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source_page_slug: pageSlug }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">¡Solicitud recibida!</h3>
        <p className="text-green-700">Nos pondremos en contacto contigo en menos de 15 minutos.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handle}
          placeholder="Tu nombre"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handle}
          placeholder="tu@email.com"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          required
          value={form.phone}
          onChange={handle}
          placeholder="+34 6XX XXX XXX"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">Ha ocurrido un error. Llámanos directamente: +34 911 676 448</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : '🚛 Solicitar Asistencia Urgente'}
      </button>

      <p className="text-center text-xs text-gray-500">
        Respuesta garantizada en menos de 15 minutos · Servicio 24h
      </p>
    </form>
  )
}
