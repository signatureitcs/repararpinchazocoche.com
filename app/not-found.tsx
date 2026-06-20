import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <span className="text-8xl block mb-6">🚛</span>
        <h1 className="text-5xl font-black text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Página no encontrada</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          La página que buscas no existe. Puede que hayas seguido un enlace incorrecto o que la URL haya cambiado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl transition">
            Volver al inicio
          </Link>
          <a href="tel:+34911676448" className="border-2 border-green-500 text-green-600 font-bold px-8 py-4 rounded-2xl hover:bg-green-50 transition">
            📞 +34 911 676 448
          </a>
        </div>
      </div>
    </div>
  )
}
