'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚛</span>
            <div>
              <span className="font-black text-gray-900 text-lg leading-tight block">Reparación Pinchazos</span>
              <span className="text-green-500 text-xs font-bold tracking-widest uppercase">Camión 24h · Toda España</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/neumaticos-camion/madrid" className="text-gray-600 hover:text-green-600 text-sm font-medium transition">Madrid</Link>
            <Link href="/neumaticos-camion/barcelona" className="text-gray-600 hover:text-green-600 text-sm font-medium transition">Barcelona</Link>
            <Link href="/neumaticos-camion/valencia" className="text-gray-600 hover:text-green-600 text-sm font-medium transition">Valencia</Link>
            <Link href="/blog" className="text-gray-600 hover:text-green-600 text-sm font-medium transition">Blog</Link>
            <a
              href="tel:+34911676448"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition shadow-md"
            >
              📞 +34 911 676 448
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-1">
            <Link href="/neumaticos-camion/madrid" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg">Madrid</Link>
            <Link href="/neumaticos-camion/barcelona" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg">Barcelona</Link>
            <Link href="/neumaticos-camion/valencia" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg">Valencia</Link>
            <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg">Blog</Link>
            <a href="tel:+34911676448" className="block bg-green-500 text-white text-center font-bold py-3 rounded-xl mt-2">
              📞 Llamar ahora: +34 911 676 448
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
