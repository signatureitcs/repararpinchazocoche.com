import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const revalidate = 3600

export async function GET() {
  const base = 'https://repararpinchazocoche.com'

  const { data: posts } = await supabaseAdmin
    .from('blog_posts')
    .select('slug,published_at')
    .order('published_at', { ascending: false })

  const urls = [
    `  <url><loc>${base}/blog</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`,
    ...(posts || []).map(p =>
      `  <url><loc>${base}/blog/${p.slug}</loc><lastmod>${p.published_at ? new Date(p.published_at).toISOString() : new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    ),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
