import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import Breadcrumb from '@/components/ui/Breadcrumb'
import TrustBar from '@/components/ui/TrustBar'
import { LOCATIONS, getDistrictBySlug, getAreaBySlug } from '@/lib/locations'
import { supabase } from '@/lib/supabase'
import { localBusinessSchema, breadcrumbSchema } from '@/lib/schemas'

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  // Fetch all pages from Supabase that match the pattern neumaticos-camion/{district}/{city}
  const { data: pages } = await supabase
    .from('pages')
    .select('slug')
    .like('slug', 'neumaticos-camion/%')
    .not('slug', 'like', '%/faq') // Exclude FAQ pages - they share parent route

  const params: { district: string; city: string }[] = []
  
  if (pages) {
    for (const page of pages) {
      const parts = page.slug.split('/')
      if (parts.length === 3) {
        // neumaticos-camion/madrid/salamanca
        params.push({ district: parts[1], city: parts[2] })
      }
    }
  }
  
  return params
}

export async function generateMetadata({ params }: { params: { district: string; city: string } }): Promise<Metadata> {
  const district = getDistrictBySlug(params.district)
  const area = getAreaBySlug(params.district, params.city)
  if (!district || !area) return {}

  const slug = `neumaticos-camion/${params.district}/${params.city}`
  const { data } = await supabase.from('pages').select('meta_title,meta_description').eq('slug', slug).single()

  return {
    title: data?.meta_title || `Reparación Pinchazos Camión ${area.name} | Servicio 24h`,
    description: data?.meta_description || `Reparación urgente de neumáticos de camión en ${area.name}, ${district.name}. Técnicos disponibles 24h. Llamamos al +34 911 676 448`,
    alternates: { canonical: `https://repararpinchazocoche.com/${slug}` },
  }
}

export default async function CityPage({ params }: { params: { district: string; city: string } }) {
  const district = getDistrictBySlug(params.district)
  const area = getAreaBySlug(params.district, params.city)
  if (!district || !area) notFound()

  const slug = `neumaticos-camion/${params.district}/${params.city}`
  const { data: page } = await supabase.from('pages').select('*').eq('slug', slug).eq('status', 'published').single()

  const schemas = [
    localBusinessSchema(area.address, area.name),
    breadcrumbSchema([
      { name: 'Inicio', url: 'https://repararpinchazocoche.com' },
      { name: district.name, url: `https://repararpinchazocoche.com/neumaticos-camion/${district.slug}` },
      { name: area.name, url: `https://repararpinchazocoche.com/${slug}` },
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
            { name: area.name },
          ]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-green-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                📍 {area.name} · 24h
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
                {page?.h1 || `Reparación de Neumáticos de Camión en ${area.name}`}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Servicio urgente de reparación y cambio de neumáticos de camión en {area.name}. Técnicos certificados que llegan hasta tu vehículo. Disponibles las 24 horas del día.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+34911676448" className="bg-green-500 hover:bg-green-400 text-white font-black text-xl px-8 py-4 rounded-2xl transition shadow-xl text-center">
                  📞 +34 911 676 448
                </a>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-7 shadow-2xl">
              <h2 className="text-gray-900 text-xl font-black mb-2">Asistencia en {area.name}</h2>
              <p className="text-gray-500 text-sm mb-5">Respuesta en menos de 15 minutos</p>
              <LeadForm pageSlug={slug} />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Content from Supabase */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {page ? (
            <div className="prose-custom">
              <div dangerouslySetInnerHTML={{ __html: page.intro?.replace(/\n/g, '<br/>') || '' }} />
              <div className="my-10 p-6 bg-green-50 border border-green-200 rounded-2xl">
                <h3 className="text-green-800 font-bold text-lg mb-2">¿Necesitas asistencia urgente en {area.name}?</h3>
                <p className="text-green-700 text-sm mb-4">Nuestros técnicos están disponibles ahora mismo. Tiempo de llegada estimado: 30–60 minutos.</p>
                <a href="tel:+34911676448" className="inline-block bg-green-500 text-white font-black px-6 py-3 rounded-xl hover:bg-green-600 transition">
                  📞 Llamar: +34 911 676 448
                </a>
              </div>
              <div dangerouslySetInnerHTML={{ __html: page.body_section?.replace(/\n/g, '<br/>') || '' }} />
              <div dangerouslySetInnerHTML={{ __html: page.deep_section?.replace(/\n/g, '<br/>') || '' }} />
            </div>
          ) : (
            // Fallback content if Supabase page not yet generated
            <div className="prose-custom">
              <h2>Reparación de Neumáticos de Camión en {area.name}</h2>
              <p>
                ¿Tu camión ha sufrido un pinchazo en {area.name}? No te preocupes. Nuestro equipo de técnicos especializados está disponible las 24 horas para desplazarse hasta tu posición y resolver la avería en el menor tiempo posible.
              </p>
              <p>
                Nos especializamos en la reparación y sustitución de neumáticos de vehículos pesados: camiones rígidos, articulados, semirremolques y trailers. También atendemos furgonetas y vehículos comerciales de reparto.
              </p>
              <h3>Servicio a domicilio en {area.name}</h3>
              <p>
                No necesitas organizar un remolque ni buscar un taller cercano. Nuestros técnicos llegan directamente al lugar donde se encuentra tu vehículo: en la autovía, en el arcén, en un polígono industrial, en el aparcamiento de un centro logístico o en cualquier calle de {area.name}.
              </p>
              <h3>¿Qué hacemos?</h3>
              <p>Reparamos pinchazos simples cuando el daño lo permite. Si el neumático no tiene reparación, lo sustituimos por uno nuevo en el mismo momento. También revisamos la presión y el estado general de los neumáticos del vehículo antes de irnos.</p>
            </div>
          )}
        </div>
      </section>

      {/* Internal links */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Más información sobre {area.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href={`/neumaticos-camion/${district.slug}/${area.slug}/faq`}
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl hover:border-green-400 hover:bg-green-50 transition">
              <span className="text-2xl">❓</span>
              <div>
                <span className="font-bold text-gray-900 block text-sm">Preguntas Frecuentes</span>
                <span className="text-xs text-gray-500">FAQ sobre {area.name}</span>
              </div>
            </Link>
            <Link href={`/blog?zona=${area.slug}`}
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl hover:border-green-400 hover:bg-green-50 transition">
              <span className="text-2xl">📖</span>
              <div>
                <span className="font-bold text-gray-900 block text-sm">Artículos del blog</span>
                <span className="text-xs text-gray-500">Consejos y guías</span>
              </div>
            </Link>
            <Link href={`/neumaticos-camion/${district.slug}`}
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl hover:border-green-400 hover:bg-green-50 transition">
              <span className="text-2xl">🗺️</span>
              <div>
                <span className="font-bold text-gray-900 block text-sm">Toda {district.name}</span>
                <span className="text-xs text-gray-500">Ver todas las zonas</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Other areas */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Otras zonas en {district.name}</h3>
          <div className="flex flex-wrap gap-3">
            {district.areas.filter(a => a.slug !== area.slug).slice(0, 10).map(a => (
              <Link key={a.slug} href={`/neumaticos-camion/${district.slug}/${a.slug}`}
                className="px-4 py-2 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-xl text-sm font-medium transition">
                {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
