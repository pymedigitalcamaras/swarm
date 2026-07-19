import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Productos</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/productos" className="hover:text-white">Aerotermia</Link></li>
              <li><Link href="/productos" className="hover:text-white">Geotermia</Link></li>
              <li><Link href="/productos" className="hover:text-white">ACS</Link></li>
              <li><Link href="/productos" className="hover:text-white">Industrial</Link></li>
              <li><Link href="/productos" className="hover:text-white">Piscinas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/como-trabajamos" className="hover:text-white">Cómo trabajamos</Link></li>
              <li><Link href="/distribuidores" className="hover:text-white">Programa de distribuidores</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white">Centro de ayuda</Link></li>
              <li><Link href="#" className="hover:text-white">Fichas técnicas</Link></li>
              <li><Link href="#" className="hover:text-white">Videos de instalación</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>WhatsApp: +56 9 9011 7784</li>
              <li>Email: distribuidores@bombasdecalor.lat</li>
              <li>Lun-Vie: 9:00 - 18:00 (Chile)</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Bombas de Calor Latinoamérica. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
