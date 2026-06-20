const PHONE = '+34911676448'
const SITE_URL = 'https://repararpinchazocoche.com'
const BUSINESS_NAME = 'Reparación Pinchazos Camión 24h'
const EMAIL = 'info@repararpinchazocoche.com'

export function localBusinessSchema(address: string, areaName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_NAME,
    description: `Reparación de pinchazos de camión y furgoneta a domicilio en ${areaName}. Servicio 24 horas, 365 días al año.`,
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressCountry: 'ES',
    },
    openingHours: 'Mo-Su 00:00-24:00',
    priceRange: 'Consultar precio',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
    areaServed: { '@type': 'Country', name: 'España' },
    serviceType: 'Reparación de neumáticos de camión a domicilio',
    image: `${SITE_URL}/logo.png`,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function articleSchema(post: {
  title: string
  excerpt: string
  slug: string
  published_at: string
  read_time: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at,
    author: { '@type': 'Organization', name: BUSINESS_NAME },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    timeRequired: `PT${post.read_time}M`,
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Reparación de Pinchazos de Camión a Domicilio',
    provider: { '@type': 'LocalBusiness', name: BUSINESS_NAME },
    areaServed: { '@type': 'Country', name: 'España' },
    description:
      'Servicio urgente de reparación y cambio de neumáticos de camión y furgoneta a domicilio en toda España. Disponible 24 horas al día, 7 días a la semana.',
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: PHONE },
    },
  }
}
