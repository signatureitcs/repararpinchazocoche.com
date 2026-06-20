import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Blog | Reparación Pinchazos Camión 24h',
  description: 'Artículos, guías y consejos sobre reparación de neumáticos de camión en España. Qué hacer si tienes un pinchazo, cómo elegir neumáticos y más.',
  alternates: { canonical: 'https://repararpinchazocoche.com/blog' },
}

export default async function BlogIndex() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug,title,excerpt,category,read_time,published_at,district,city')
    .order('published_at', { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-green-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Blog</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Consejos y Guías sobre Neumáticos de Camión</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre pinchazos, reparaciones y mantenimiento de neumáticos de vehículos pesados en España.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition group">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wide">
                        {post.category?.replace(/-/g, ' ') || 'Consejos'}
                      </span>
                      <span className="text-xs text-gray-400">{post.read_time} min lectura</span>
                    </div>
                    <h2 className="text-lg font-black text-gray-900 mb-3 group-hover:text-green-700 transition leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                      </span>
                      <Link href={`/blog/${post.slug}`} className="text-green-600 text-sm font-bold hover:underline">
                        Leer más →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4">📝</span>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Artículos próximamente</h2>
              <p className="text-gray-500">Estamos preparando contenido de calidad. Mientras tanto, llámanos si tienes una emergencia.</p>
              <a href="tel:+34911676448" className="inline-block mt-6 bg-green-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-600 transition">
                📞 +34 911 676 448
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-green-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">¿Tienes un pinchazo ahora mismo?</h2>
          <a href="tel:+34911676448" className="inline-block bg-white text-green-600 font-black text-2xl px-10 py-5 rounded-2xl shadow-xl hover:bg-green-50 transition">
            📞 +34 911 676 448
          </a>
        </div>
      </section>
    </div>
  )
}
