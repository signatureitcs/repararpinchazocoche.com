import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 pt-14 pb-24 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🚛</span>
                <div>
                  <span className="font-black text-white text-base block">Reparación Pinchazos</span>
                  <span className="text-green-400 text-xs font-bold tracking-widest uppercase">Camión 24h</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Servicio urgente de reparación de neumáticos de camión y furgoneta en toda España. Disponibles 24 horas, 365 días.
              </p>
              <a href="tel:+34911676448" className="text-green-400 font-bold text-lg hover:text-green-300 transition">
                +34 911 676 448
              </a>
            </div>

            {/* Zonas */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Principales Zonas</h3>
              <ul className="space-y-2 text-sm">
                {[
                  ['Madrid', '/neumaticos-camion/madrid'],
                  ['Barcelona', '/neumaticos-camion/barcelona'],
                  ['Valencia', '/neumaticos-camion/valencia'],
                  ['Sevilla', '/neumaticos-camion/sevilla'],
                  ['Zaragoza', '/neumaticos-camion/zaragoza'],
                  ['Málaga', '/neumaticos-camion/malaga'],
                  ['Bilbao', '/neumaticos-camion/bilbao'],
                  ['Alicante', '/neumaticos-camion/alicante'],
                ].map(([name, href]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-green-400 transition">{name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicios */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Nuestros Servicios</h3>
              <ul className="space-y-2 text-sm">
                <li>🔧 Reparación de pinchazos</li>
                <li>🔄 Cambio de neumáticos</li>
                <li>🚨 Asistencia en carretera</li>
                <li>🚛 Camiones pesados</li>
                <li>🚐 Furgonetas y vans</li>
                <li>⚡ Servicio 24 horas</li>
              </ul>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Información</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-green-400 transition">Blog</Link></li>
                <li><Link href="/mobiletruckservice24-alternativa" className="hover:text-green-400 transition">Alternativa a MobileTruckService24</Link></li>
                <li>
                  <a href="mailto:info@repararpinchazocoche.com" className="hover:text-green-400 transition">
                    info@repararpinchazocoche.com
                  </a>
                </li>
              </ul>
              <div className="mt-6 p-3 bg-gray-800 rounded-xl text-xs">
                <p className="text-green-400 font-bold mb-1">⏰ Horario de atención</p>
                <p>Lunes a Domingo: 24 horas</p>
                <p>365 días al año</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3">
            <p>© {new Date().getFullYear()} Reparación Pinchazos Camión 24h · Todos los derechos reservados</p>
            <p>Servicio disponible en toda España · <a href="tel:+34911676448" className="text-green-400">+34 911 676 448</a></p>
          </div>
        </div>
      </footer>

      {/* Sticky phone button - mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-green-500 shadow-2xl">
        <a
          href="tel:+34911676448"
          className="flex items-center justify-center gap-3 text-white font-black text-lg py-4"
        >
          <span className="text-2xl">📞</span>
          <span>Llamar ahora · +34 911 676 448</span>
        </a>
      </div>

      {/* Sticky phone button - desktop */}
      <a
        href="tel:+34911676448"
        className="hidden md:flex fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-2xl shadow-2xl items-center gap-3 transition-all hover:scale-105"
      >
        <span className="text-xl">📞</span>
        <div>
          <span className="block text-xs opacity-90">Llamada urgente</span>
          <span className="block text-base">+34 911 676 448</span>
        </div>
      </a>
    </>
  )
}
