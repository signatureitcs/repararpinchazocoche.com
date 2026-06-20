const SIGNALS = [
  { icon: '⚡', label: 'Respuesta en 15 min' },
  { icon: '🕐', label: 'Servicio 24h / 365 días' },
  { icon: '🇪🇸', label: 'Toda España' },
  { icon: '🚛', label: 'Camiones y Furgonetas' },
  { icon: '🔧', label: 'Técnicos certificados' },
  { icon: '💳', label: 'Pago fácil' },
]

export default function TrustBar() {
  return (
    <div className="bg-green-50 border-y border-green-100 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {SIGNALS.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="text-lg">{s.icon}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
