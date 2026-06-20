import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { LOCATIONS } from '@/lib/locations'

export const revalidate = 3600

export async function GET() {
  const base = 'https://repararpinchazocoche.com'
  const urls: string[] = []

  // Static pages
  urls.push(`  <url><loc>${base}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`)
  urls.push(`  <url><loc>${base}/mobiletruckservice24-alternativa</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`)

  // District pages
  for (const district of LOCATIONS) {
    urls.push(`  <url><loc>${base}/neumaticos-camion/${district.slug}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`)

    for (const area of district.areas) {
      urls.push(`  <url><loc>${base}/neumaticos-camion/${district.slug}/${area.slug}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`)
      urls.push(`  <url><loc>${base}/neumaticos-camion/${district.slug}/${area.slug}/faq</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`)
    }
  }

  // Published pages from Supabase
  try {
    const { data: pages } = await supabaseAdmin
      .from('pages')
      .select('slug,created_at')
      .eq('status', 'published')

    if (pages) {
      const existingUrls = new Set(urls.map(u => u.match(/<loc>(.*?)<\/loc>/)?.[1]))
      for (const page of pages) {
        const url = `${base}/${page.slug}`
        if (!existingUrls.has(url)) {
          urls.push(`  <url><loc>${url}</loc><lastmod>${page.created_at ? new Date(page.created_at).toISOString() : new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`)
        }
      }
    }
  } catch (e) {
    console.error('Sitemap DB error:', e)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
