import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import TrustBar from '@/components/ui/TrustBar'
import { LOCATIONS } from '@/lib/locations'
import { localBusinessSchema, websiteSchema, serviceSchema, faqSchema } from '@/lib/schemas'

const HOME_FAQS = [
  { question: '¿Cuánto tiempo tardan en llegar?', answer: 'Nuestro tiempo de respuesta medio es de 30 a 60 minutos dependiendo de tu ubicación en España. En zonas metropolitanas como Madrid y Barcelona solemos llegar en 20-30 minutos.' },
  { question: '¿Reparan neumáticos de camión en carretera?', answer: 'Sí, nos desplazamos directamente al lugar donde se encuentra tu camión, ya sea en carretera, autovía, polígono industrial o cualquier punto de España.' },
  { question: '¿Trabajan las 24 horas?', answer: 'Sí, nuestro servicio está disponible las 24 horas del día, los 7 días de la semana, incluidos festivos y fines de semana.' },
  { question: '¿Qué tipo de vehículos reparan?', answer: 'Nos especializamos en camiones pesados, semirremolques y trailers como servicio principal. También atendemos furgonetas y vehículos de reparto como servicio complementario.' },
  { question: '¿Cuánto cuesta la reparación?', answer: 'El precio varía según el tipo de avería, el modelo de neumático y tu ubicación. Llámanos y te daremos un presupuesto sin compromiso antes de desplazarnos.' },
]

export default function HomePage() {
  const schemas = [
    localBusinessSchema('Toda España', 'España'),
    websiteSchema(),
    serviceSchema(),
    faqSchema(HOME_FAQS),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                ⚡ Servicio urgente · 24h
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Reparación de Pinchazos de{' '}
                <span className="text-green-400">Camión</span>{' '}
                a Domicilio en Toda España
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                ¿Pinchazo en carretera? Llegamos a tu camión en menos de 60 minutos. Servicio de reparación y cambio de neumáticos disponible 24 horas, 365 días al año en toda España.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+34911676448"
                  className="bg-green-500 hover:bg-green-400 text-white font-black text-xl px-8 py-5 rounded-2xl text-center transition shadow-2xl"
                >
                  📞 +34 911 676 448
                </a>
                <a
                  href="#contacto"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold text-lg px-8 py-5 rounded-2xl text-center transition"
                >
                  Solicitar online
                </a>
              </div>
            </div>

            {/* Form */}
            <div id="contacto" className="bg-white rounded-3xl p-8 shadow-2xl">
              <h2 className="text-gray-900 text-2xl font-black mb-2">Solicita asistencia ahora</h2>
              <p className="text-gray-500 text-sm mb-6">Te llamamos en menos de 15 minutos</p>
              <LeadForm pageSlug="homepage" />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-4">
            ¿Cómo funciona nuestro servicio?
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            En 3 sencillos pasos tu camión vuelve a estar en marcha
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📞', title: 'Llama o escribe', desc: 'Contacta con nosotros por teléfono o a través del formulario. Cuéntanos tu ubicación y el tipo de avería.' },
              { step: '02', icon: '🚐', title: 'Nos desplazamos', desc: 'Un técnico certificado parte de inmediato hacia tu posición. Tiempo medio de llegada: 30-60 minutos.' },
              { step: '03', icon: '✅', title: 'Problema resuelto', desc: 'Reparamos o cambiamos el neumático en el lugar. Tu camión vuelve a circular lo antes posible.' },
            ].map((item) => (
              <div key={item.step} className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-green-50 transition">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <span className="text-green-500 font-black text-sm tracking-widest block mb-2">PASO {item.step}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🔧', title: 'Reparación de pinchazos', desc: 'Reparamos pinchazos en el momento, sin necesidad de grúa ni desplazamiento a taller.', primary: true },
              { icon: '🔄', title: 'Cambio de neumáticos', desc: 'Sustituimos neumáticos desgastados o dañados con garantía y materiales de calidad.' },
              { icon: '🚨', title: 'Asistencia en carretera', desc: 'Servicio de emergencia en autovías, carreteras nacionales y zonas industriales.' },
              { icon: '🚛', title: 'Camiones pesados', desc: 'Especialistas en camiones de gran tonelaje, semirremolques y trailers.' },
              { icon: '🚐', title: 'Furgonetas y vans', desc: 'Atendemos también furgonetas de reparto y vehículos comerciales ligeros.' },
              { icon: '📍', title: 'Toda España', desc: 'Cobertura en las principales ciudades y carreteras de toda la geografía española.' },
            ].map((s) => (
              <div
                key={s.title}
                className={`p-6 rounded-2xl border ${s.primary ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'} hover:shadow-md transition`}
              >
                <span className="text-3xl block mb-3">{s.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-4">
            Zonas de Cobertura
          </h2>
          <p className="text-gray-500 text-center mb-12">Selecciona tu provincia para ver todas las áreas disponibles</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {LOCATIONS.map((d) => (
              <Link
                key={d.slug}
                href={`/neumaticos-camion/${d.slug}`}
                className="flex flex-col items-center p-5 border border-gray-200 rounded-2xl hover:border-green-400 hover:bg-green-50 transition group text-center"
              >
                <span className="text-2xl mb-2">📍</span>
                <span className="font-bold text-gray-900 group-hover:text-green-700 text-sm">{d.name}</span>
                <span className="text-xs text-gray-400 mt-1">{d.areas.length} zonas</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {HOME_FAQS.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-6 group cursor-pointer hover:border-green-300 transition"
              >
                <summary className="font-bold text-gray-900 text-lg list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-green-500 text-2xl group-open:rotate-45 transition-transform ml-4 flex-shrink-0">+</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 bg-green-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            ¿Pinchazo ahora mismo?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            No pierdas tiempo. Llámanos y un técnico sale hacia ti de inmediato.
          </p>
          <a
            href="tel:+34911676448"
            className="inline-block bg-white text-green-600 font-black text-2xl px-10 py-5 rounded-2xl shadow-2xl hover:bg-green-50 transition"
          >
            📞 +34 911 676 448
          </a>
          <p className="text-green-200 text-sm mt-4">Disponible 24 horas · 365 días al año · Toda España</p>
        </div>
      </section>
    </>
  )
}
