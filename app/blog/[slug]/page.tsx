import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import LeadForm from '@/components/forms/LeadForm'
import { supabase } from '@/lib/supabase'
import { articleSchema, breadcrumbSchema } from '@/lib/schemas'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabase.from('blog_posts').select('meta_title,meta_desc,excerpt').eq('slug', slug).single()
  if (!data) return {}
  return {
    title: data.meta_title,
    description: data.meta_desc || data.excerpt,
    alternates: { canonical: `https://repararpinchazocoche.com/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: post } = await supabase.from('blog_posts').select('*').eq('slug', slug).single()
  if (!post) notFound()

  const { data: related } = await supabase
    .from('blog_posts')
    .select('slug,title,excerpt,read_time')
    .eq('category', post.category)
    .neq('slug', slug)
    .limit(3)

  const schemas = [
    articleSchema({ title: post.title, excerpt: post.excerpt, slug: post.slug, published_at: post.published_at, read_time: post.read_time }),
    breadcrumbSchema([
      { name: 'Inicio', url: 'https://repararpinchazocoche.com' },
      { name: 'Blog', url: 'https://repararpinchazocoche.com/blog' },
      { name: post.title, url: `https://repararpinchazocoche.com/blog/${post.slug}` },
    ]),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { name: 'Inicio', href: '/' },
            { name: 'Blog', href: '/blog' },
            { name: post.title },
          ]} />
        </div>
      </div>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wide">
              {post.category?.replace(/-/g, ' ')}
            </span>
            <span className="text-xs text-gray-400">{post.read_time} min lectura</span>
            <span className="text-xs text-gray-400">
              {new Date(post.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">{post.title}</h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-10 border-l-4 border-green-400 pl-5">{post.excerpt}</p>

          {/* Inline CTA */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-green-900">¿Tienes una emergencia ahora mismo?</p>
              <p className="text-green-700 text-sm">Llamamos a un técnico que sale hacia ti de inmediato</p>
            </div>
            <a href="tel:+34911676448" className="flex-shrink-0 bg-green-500 text-white font-black px-6 py-3 rounded-xl hover:bg-green-600 transition">
              📞 +34 911 676 448
            </a>
          </div>

          {/* Content */}
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Bottom CTA */}
          <div className="mt-14 p-8 bg-gray-900 rounded-3xl text-white text-center">
            <h3 className="text-2xl font-black mb-2">¿Necesitas ayuda con un pinchazo?</h3>
            <p className="text-gray-400 mb-6">Servicio disponible ahora mismo · 24 horas · Toda España</p>
            <a href="tel:+34911676448" className="inline-block bg-green-500 hover:bg-green-400 text-white font-black text-xl px-8 py-4 rounded-2xl transition">
              📞 +34 911 676 448
            </a>
          </div>
        </div>
      </article>

      {/* Contact form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-lg mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-2">Solicitar Asistencia</h2>
          <p className="text-gray-500 text-center text-sm mb-8">Te llamamos en menos de 15 minutos</p>
          <LeadForm pageSlug={`blog/${post.slug}`} />
        </div>
      </section>

      {/* Related posts */}
      {related && related.length > 0 && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-xl font-black text-gray-900 mb-6">Artículos relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="p-5 bg-gray-50 border border-gray-200 rounded-2xl hover:border-green-300 hover:bg-green-50 transition">
                  <h4 className="font-bold text-gray-900 text-sm mb-2 leading-snug">{r.title}</h4>
                  <p className="text-gray-500 text-xs line-clamp-2">{r.excerpt}</p>
                  <span className="text-xs text-green-600 font-bold mt-3 block">{r.read_time} min →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
