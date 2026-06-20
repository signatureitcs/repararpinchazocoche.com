import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/login/', '/admin/'],
      },
    ],
    sitemap: [
      'https://repararpinchazocoche.com/sitemap.xml',
      'https://repararpinchazocoche.com/sitemap-pages',
      'https://repararpinchazocoche.com/sitemap-blog',
    ],
  }
}
