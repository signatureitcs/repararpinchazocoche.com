import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import LeadForm from '@/components/forms/LeadForm'
import { supabase } from '@/lib/supabase'
import { faqSchema, breadcrumbSchema, localBusinessSchema } from '@/lib/schemas'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const { data: pages, error } = await supabase
    .from('pages')
    .select('slug')
    .like('slug', 'neumaticos-camion/%/faq')

  console.log(`[generateStaticParams faq] fetched ${pages?.length ?? 0} faq pages`, error ? `ERROR: ${error.message}` : '')

  const params: { district: string; city: string }[] = []
  if (pages) {
    for (const page of pages) {
      const parts = page.slug.split('/')
      // neumaticos-camion/madrid/salamanca/faq -> 4 parts
      if (parts.length === 4) {
        params.push({ district: parts[1], city: parts[2] })
      }
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: { district: string; city: string } }): Promise<Metadata> {
  const slug = `neumaticos-camion/${params.district}/${params.city}/faq`
  const { data } = await supabase.from('pages').select('city').eq('slug', slug).single()
  if (!data) return {}
  return {
    title: `Preguntas Frecuentes Neumáticos Camión ${data.city} | FAQ`,
    description: `Respuestas a las preguntas más habituales sobre reparación de pinchazos de camión en ${data.city}. Servicio 24h disponible. Llama: +34 911 676 448`,
    alternates: { canonical: `https://repararpinchazocoche.com/${slug}` },
  }
}

function parseFaqs(raw: string): { question: string; answer: string }[] {
  if (!raw) return []
  return raw.split('|||').map((block) => {
    const trimmed = block.trim()
    // Support two formats:
    //   "Q1: question\nA: answer"  (newline separated)
    //   "Q1: question|A: answer"   (pipe separated)
    let questionPart = ''
    let answerPart = ''
    if (trimmed.includes('|')) {
      const [q, ...rest] = trimmed.split('|')
      questionPart = q
      answerPart = rest.join('|')
    } else {
      const lines = trimmed.split('\n')
      questionPart = lines[0] || ''
      answerPart = lines.slice(1).join(' ')
    }
    const question = questionPart.replace(/^Q\d*:\s*/i, '').trim()
    const answer = answerPart.replace(/^A:\s*/i, '').trim()
    return { question, answer }
  }).filter(f => f.question && f.answer)
}

const DEFAULT_FAQS = (areaName: string, districtName: string) => [
  { question: `¿Cuánto tiempo tardan en llegar a ${areaName}?`, answer: `El tiempo medio de llegada en ${areaName} es de 30 a 60 minutos desde que realizas la llamada. En situaciones de baja demanda podemos llegar en menos tiempo.` },
  { question: `¿Reparan neumáticos de camión directamente en ${areaName}?`, answer: `Sí, nos desplazamos hasta el punto exacto donde se encuentra tu vehículo en ${areaName}, ya sea en carretera, autovía, polígono industrial o en plena vía urbana.` },
  { question: `¿Están disponibles las 24 horas en ${areaName}?`, answer: `Sí, nuestro servicio en ${areaName} está operativo las 24 horas del día, los 7 días de la semana, incluidos festivos.` },
  { question: `¿Qué tipos de vehículos atienden en ${areaName}?`, answer: `En ${areaName} atendemos principalmente camiones pesados: rígidos, articulados, semirremolques y trailers. También prestamos servicio a furgonetas y vehículos comerciales de reparto.` },
  { question: `¿Puedo solicitar presupuesto antes de que vengan a ${areaName}?`, answer: `Sí. Llámanos al +34 911 676 448 y te damos un presupuesto orientativo antes de desplazarnos. El precio final puede variar según el tipo concreto de avería.` },
  { question: `¿Qué pasa si el neumático no tiene reparación en ${areaName}?`, answer: `Si el daño es irreparable, lo sustituimos por un neumático nuevo en el mismo momento. Llevamos stock de los tamaños más habituales para vehículos pesados.` },
  { question: `¿Trabajan en autovías y carreteras de ${districtName}?`, answer: `Sí, atendemos averías en autovías, carreteras nacionales, secundarias y vías de acceso dentro de ${districtName}. Por seguridad, aplicamos protocolos específicos para trabajar en vías de alta velocidad.` },
  { question: `¿Cuánto cuesta la reparación de un pinchazo de camión en ${areaName}?`, answer: `El precio depende del tipo de neumático, la gravedad del daño y tu ubicación exacta. Ofrecemos presupuesto sin compromiso. Llama al +34 911 676 448 para obtener tu tarifa.` },
  { question: `¿Aceptan pagos con tarjeta en ${areaName}?`, answer: `Sí, aceptamos pago en efectivo y con tarjeta de crédito o débito. También podemos emitir factura para empresas de transporte y flotas.` },
  { question: `¿Atienden averías en polígonos industriales de ${areaName}?`, answer: `Por supuesto. Los polígonos industriales son una de las zonas donde más frecuentemente prestamos servicio. Conocemos los principales polígonos de ${areaName} y sus accesos.` },
]

export default async function FaqPage({ params }: { params: { district: string; city: string } }) {
  const slug = `neumaticos-camion/${params.district}/${params.city}/faq`
  const { data: page } = await supabase.from('pages').select('body_section,city,district,address,status').eq('slug', slug).single()

  // If the FAQ page does not exist in Supabase, it's a genuine 404
  if (!page) notFound()
  if (page.status === 'draft') notFound()

  const area = {
    slug: params.city,
    name: page.city || params.city,
    address: page.address || '',
  }
  const district = {
    slug: params.district,
    name: page.district || params.district,
  }

  const faqs = page.body_section ? parseFaqs(page.body_section) : DEFAULT_FAQS(area.name, district.name)

  const schemas = [
    faqSchema(faqs),
    localBusinessSchema(area.address, area.name),
    breadcrumbSchema([
      { name: 'Inicio', url: 'https://repararpinchazocoche.com' },
      { name: district.name, url: `https://repararpinchazocoche.com/neumaticos-camion/${district.slug}` },
      { name: area.name, url: `https://repararpinchazocoche.com/neumaticos-camion/${district.slug}/${area.slug}` },
      { name: 'FAQ', url: `https://repararpinchazocoche.com/${slug}` },
    ]),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { name: 'Inicio', href: '/' },
            { name: district.name, href: `/neumaticos-camion/${district.slug}` },
            { name: area.name, href: `/neumaticos-camion/${district.slug}/${area.slug}` },
            { name: 'Preguntas Frecuentes' },
          ]} />
        </div>
      </div>

      <section className="bg-gradient-to-br from-gray-900 to-green-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">FAQ</span>
          <h1 className="text-4xl md:text-5xl font-black mb-5">
            Preguntas Frecuentes sobre Reparación de Neumáticos de Camión en{' '}
            <span className="text-green-400">{area.name}</span>
          </h1>
          <p className="text-gray-300 text-lg">Todo lo que necesitas saber sobre nuestro servicio en {area.name}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-gray-50 rounded-2xl border border-gray-200 p-6 group cursor-pointer hover:border-green-300 transition">
                <summary className="font-bold text-gray-900 text-lg list-none flex justify-between items-center">
                  <span>{faq.question}</span>
                  <span className="text-green-500 text-2xl group-open:rotate-45 transition-transform ml-4 flex-shrink-0">+</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-lg mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-2">¿Tienes más preguntas?</h2>
          <p className="text-gray-500 text-center text-sm mb-8">Contáctanos o llama directamente. Estamos disponibles 24h.</p>
          <LeadForm pageSlug={slug} />
        </div>
      </section>

      {/* Internal links */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-900 mb-5">Páginas relacionadas</h3>
          <div className="flex flex-wrap gap-3">
            <Link href={`/neumaticos-camion/${district.slug}/${area.slug}`}
              className="px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100 transition">
              🔧 Servicio en {area.name}
            </Link>
            <Link href={`/neumaticos-camion/${district.slug}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">
              🗺️ Toda la zona de {district.name}
            </Link>
            <Link href="/blog"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">
              📖 Blog y consejos
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
