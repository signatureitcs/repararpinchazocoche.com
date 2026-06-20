import type { Metadata } from 'next'
import LeadForm from '@/components/forms/LeadForm'
import { localBusinessSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'Alternativa a MobileTruckService24 en España | Reparación Pinchazos Camión 24h',
  description: 'Buscas una alternativa a MobileTruckService24 en España? Nuestro servicio de reparación de neumáticos de camión es más rápido, económico y disponible en toda España.',
  alternates: { canonical: 'https://repararpinchazocoche.com/mobiletruckservice24-alternativa' },
}

const COMPARISONS = [
  { feature: 'Cobertura en España', us: '✅ Toda España', them: '⚠️ Zonas limitadas' },
  { feature: 'Disponibilidad', us: '✅ 24h / 365 días', them: '⚠️ Horario restringido' },
  { feature: 'Tiempo de respuesta', us: '✅ 30–60 minutos', them: '⚠️ Variable' },
  { feature: 'Presupuesto previo', us: '✅ Sin compromiso', them: '❓ No siempre' },
  { feature: 'Camiones pesados', us: '✅ Especialistas', them: '⚠️ Servicio general' },
  { feature: 'Furgonetas y vans', us: '✅ Incluido', them: '⚠️ Adicional' },
  { feature: 'Servicio en autovía', us: '✅ Sí', them: '⚠️ Limitado' },
  { feature: 'Factura para empresa', us: '✅ Sí', them: '❓ Consultar' },
]

export default function CompetitorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema('Toda España', 'España')) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-green-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-green-500 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Comparativa</span>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
            ¿Buscas una alternativa a{' '}
            <span className="text-green-400">MobileTruckService24</span>{' '}
            en España?
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Descubre por qué miles de conductores de camión en España eligen nuestro servicio de reparación de neumáticos a domicilio.
          </p>
          <a href="tel:+34911676448" className="inline-block bg-green-500 hover:bg-green-400 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-2xl transition">
            📞 +34 911 676 448
          </a>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Comparativa de Servicios</h2>
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-gray-900 text-white text-sm font-bold">
              <div className="p-4">Característica</div>
              <div className="p-4 text-center text-green-400">Nosotros</div>
              <div className="p-4 text-center text-gray-400">MobileTruckService24</div>
            </div>
            {COMPARISONS.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-sm border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="p-4 font-medium text-gray-700">{row.feature}</div>
                <div className="p-4 text-center font-semibold">{row.us}</div>
                <div className="p-4 text-center text-gray-500">{row.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">¿Por qué elegir nuestro servicio?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '🇪🇸', title: 'Especialistas en España', desc: 'Conocemos las autovías, polígonos industriales y carreteras nacionales de toda España. Nuestros técnicos trabajan exclusivamente en el mercado español.' },
              { icon: '⚡', title: 'Respuesta ultrarrápida', desc: 'Tiempo medio de llegada de 30 a 60 minutos. En Madrid, Barcelona y Valencia frecuentemente en 20–30 minutos.' },
              { icon: '🚛', title: 'Especialistas en camiones', desc: 'Nuestra especialidad son los vehículos pesados: camiones rígidos, articulados, semirremolques y trailers de todo tipo.' },
              { icon: '💼', title: 'Servicio profesional', desc: 'Emitimos factura para empresas y flotas. Trabajamos con transportistas, empresas logísticas y autónomos del transporte.' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-green-300 transition">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">Prueba la diferencia</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                No tienes que conformarte con un servicio lento o con cobertura limitada. Llámanos ahora o rellena el formulario y te llamamos nosotros en menos de 15 minutos.
              </p>
              <a href="tel:+34911676448" className="inline-block bg-green-500 text-white font-black text-xl px-8 py-4 rounded-2xl hover:bg-green-600 transition shadow-lg">
                📞 +34 911 676 448
              </a>
            </div>
            <div className="bg-gray-50 rounded-3xl p-7 border border-gray-200">
              <h3 className="text-xl font-black text-gray-900 mb-2">Solicitar presupuesto gratis</h3>
              <p className="text-gray-500 text-sm mb-5">Sin compromiso · Respuesta en 15 min</p>
              <LeadForm pageSlug="mobiletruckservice24-alternativa" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
