import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'

export default async function HomePage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar session={session} />
      
      {/* Hero */}
      <section className="relative bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/80 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920)' }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl">
            La calefacción que tu cliente ya debería tener
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-200">
            Bombas de calor de alta eficiencia para toda Latinoamérica. 
            Tecnología europea, adaptada a tu mercado. No vendemos cajas. 
            Formamos distribuidores que ganan dinero.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/productos"
              className="inline-flex justify-center items-center bg-white text-primary-dark px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Ver catálogo
            </Link>
            <Link 
              href="/distribuidores"
              className="inline-flex justify-center items-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Quiero ser distribuidor
            </Link>
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tecnología que no te deja solo</h3>
              <p className="text-gray-600">Bombas de calor con COP 4.0+, garantía extendida y repuestos garantizados por 10 años.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Capacitación que da resultados</h3>
              <p className="text-gray-600">No te damos un manual. Te damos un ingeniero que te acompaña en tus primeras 3 instalaciones.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Margen que te motiva</h3>
              <p className="text-gray-600">Precio de distribuidor con 40% de margen. Y leads de clientes finales en tu zona exclusiva.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold">2.000+</div>
              <div className="text-gray-300 mt-1">instalaciones</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold">200+</div>
              <div className="text-gray-300 mt-1">distribuidores</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold">5</div>
              <div className="text-gray-300 mt-1">países</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold">0%</div>
              <div className="text-gray-300 mt-1">devoluciones</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Instalas calefacción? Estás a un paso de facturar el doble.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Como distribuidor, no solo compras mejor. Vendes más. Ganas más. 
            Y tienes un equipo técnico respaldándote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/distribuidores"
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-hover transition"
            >
              Quiero ser distribuidor
            </Link>
            <Link 
              href="/productos"
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition"
            >
              Ver productos primero
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
