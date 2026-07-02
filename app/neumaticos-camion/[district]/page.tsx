import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import Breadcrumb from '@/components/ui/Breadcrumb'
import TrustBar from '@/components/ui/TrustBar'
import { supabase } from '@/lib/supabase'
import { localBusinessSchema, breadcrumbSchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { district: string } }): Promise<Metadata> {
  const slug = `neumaticos-camion/${params.district}`
  const { data } = await supabase.from('pages').select('meta_title,meta_description,district').eq('slug', slug).single()
  const name = data?.district || params.district
  return {
    title: data?.meta_title || `Reparación Pinchazos Camión ${name} | Servicio 24h`,
    description: data?.meta_description || `Reparación urgente de neumáticos de camión en ${name} y alrededores. Técnicos disponibles 24 horas. Llegamos a tu vehículo donde estés. Llama: +34 911 676 448`,
    alternates: { canonical: `https://repararpinchazocoche.com/${slug}` },
  }
}

export default async function DistrictPage({ params }: { params: { district: string } }) {
  const slug = `neumaticos-camion/${params.district}`
  const { data: hub } = await supabase.from('pages').select('*').eq('slug', slug).single()

  // Gather all areas in this district from Supabase (service pages only, exclude /faq)
  const { data: areaPages } = await supabase
    .from('pages')
    .select('slug,city')
    .like('slug', `neumaticos-camion/${params.district}/%`)
    .not('slug', 'like', '%/faq')
    .order('city', { ascending: true })

  const areas = (areaPages || []).map(p => {
    const parts = p.slug.split('/')
    return { slug: parts[2], name: p.city || parts[2] }
  })

  // 404 only if the district has no pages at all
  if (!hub && areas.length === 0) notFound()

  const district = {
    slug: params.district,
    name: hub?.district || areas[0]?.name || params.district,
    address: hub?.address || '',
  }

  const schemas = [
    localBusinessSchema(district.address, district.name),
    breadcrumbSchema([
      { name: 'Inicio', url: 'https://repararpinchazocoche.com' },
      { name: district.name, url: `https://repararpinchazocoche.com/neumaticos-camion/${district.slug}` },
    ]),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { name: 'Inicio', href: '/' },
            { name: district.name },
          ]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-green-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                📍 {district.name} · 24h
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
                Reparación de Neumáticos de Camión en{' '}
                <span className="text-green-400">{district.name}</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Servicio urgente de reparación y cambio de neumáticos de camión en {district.name} y toda la provincia. Técnicos certificados desplazándose hasta tu vehículo. Disponible las 24 horas.
              </p>
              <a href="tel:+34911676448" className="inline-block bg-green-500 hover:bg-green-400 text-white font-black text-xl px-8 py-4 rounded-2xl transition shadow-xl">
                📞 +34 911 676 448
              </a>
            </div>
            <div className="bg-white rounded-3xl p-7 shadow-2xl">
              <h2 className="text-gray-900 text-xl font-black mb-2">Solicitar asistencia en {district.name}</h2>
              <p className="text-gray-500 text-sm mb-5">Respuesta garantizada en menos de 15 minutos</p>
              <LeadForm pageSlug={`neumaticos-camion/${district.slug}`} />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Areas grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-4">
            Todas las Zonas de {district.name}
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Selecciona tu barrio o municipio para ver información específica y solicitar asistencia
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {areas.map((area) => (
              <div key={area.slug} className="border border-gray-200 rounded-2xl p-4 hover:border-green-400 hover:bg-green-50 transition">
                <Link href={`/neumaticos-camion/${district.slug}/${area.slug}`} className="block">
                  <span className="font-bold text-gray-900 block mb-1 hover:text-green-700">{area.name}</span>
                </Link>
                <div className="flex gap-2 mt-3">
                  <Link href={`/neumaticos-camion/${district.slug}/${area.slug}`} className="text-xs text-green-600 font-medium hover:underline">Servicio</Link>
                  <span className="text-gray-300">·</span>
                  <Link href={`/neumaticos-camion/${district.slug}/${area.slug}/faq`} className="text-xs text-green-600 font-medium hover:underline">FAQ</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content block */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose-custom">
          <h2>Servicio de Reparación de Neumáticos de Camión en {district.name}</h2>
          <p>
            Cuando un camión sufre un pinchazo en {district.name}, cada minuto cuenta. La parada inesperada de un vehículo pesado en carretera o en una zona industrial puede suponer pérdidas económicas importantes para empresas de transporte, autónomos y flotas. Nuestro equipo de técnicos especializados en neumáticos de camión está disponible las 24 horas del día, los 7 días de la semana, para llegar hasta tu vehículo donde sea que estés dentro de la provincia de {district.name}.
          </p>
          <p>
            A diferencia de los servicios de taller convencionales, nos desplazamos hasta el lugar exacto donde se encuentra el camión: en la autovía, en un polígono industrial, en el arcén de una carretera secundaria o dentro del casco urbano de {district.name}. No necesitas organizar una grúa ni esperar a que abra un taller; nosotros venimos a ti.
          </p>
          <h3>¿Qué incluye nuestro servicio en {district.name}?</h3>
          <p>
            Ofrecemos reparación de pinchazos, cambio completo de neumáticos, asistencia por reventones y revisión del estado de los neumáticos en carretera. Trabajamos con camiones de todos los tipos: rígidos, articulados, semirremolques y trailers. También atendemos furgonetas y vehículos de reparto de forma complementaria.
          </p>
          <h3>Cobertura en toda la provincia de {district.name}</h3>
          <p>
            Cubrimos todos los municipios y barrios de {district.name} y su área metropolitana. Tenemos técnicos distribuidos estratégicamente para minimizar los tiempos de espera. Consulta las zonas específicas en el listado superior y accede a información detallada sobre el servicio en tu localidad.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-green-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">¿Necesitas asistencia en {district.name} ahora?</h2>
          <a href="tel:+34911676448" className="inline-block bg-white text-green-600 font-black text-2xl px-10 py-5 rounded-2xl shadow-xl hover:bg-green-50 transition">
            📞 +34 911 676 448
          </a>
          <p className="text-green-100 text-sm mt-4">Servicio 24h · 365 días · Sin esperas</p>
        </div>
      </section>
    </>
  )
}
