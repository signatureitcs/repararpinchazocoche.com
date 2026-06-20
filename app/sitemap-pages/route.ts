import { MetadataRoute } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import { LOCATIONS } from '@/lib/locations'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://repararpinchazocoche.com'
  const urls: MetadataRoute.Sitemap = []

  // Static pages
  urls.push(
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/mobiletruckservice24-alternativa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  )

  // District pages
  for (const district of LOCATIONS) {
    urls.push({
      url: `${base}/neumaticos-camion/${district.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    // Area + FAQ pages
    for (const area of district.areas) {
      urls.push({
        url: `${base}/neumaticos-camion/${district.slug}/${area.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
      urls.push({
        url: `${base}/neumaticos-camion/${district.slug}/${area.slug}/faq`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  // Published pages from Supabase
  const { data: pages } = await supabaseAdmin
    .from('pages')
    .select('slug,created_at')
    .eq('status', 'published')

  if (pages) {
    for (const page of pages) {
      const url = `${base}/${page.slug}`
      if (!urls.find(u => u.url === url)) {
        urls.push({
          url,
          lastModified: page.created_at ? new Date(page.created_at) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  }

  return urls
}
