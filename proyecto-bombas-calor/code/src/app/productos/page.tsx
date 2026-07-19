import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { formatPrice } from '@/lib/utils'

export default async function ProductosPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  const { data: user } = session 
    ? await supabase.from('users').select('role').eq('id', session.user.id).single()
    : { data: null }
  
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('is_active', true)
    .order('sort_order')

  const canSeePrices = user?.role === 'distributor' || user?.role === 'admin'

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar session={session} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo técnico completo</h1>
        <p className="text-gray-600 mb-8">
          Bombas de calor para toda Latinoamérica. 
          {!canSeePrices && 'Regístrate para ver precios de distribuidor.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition">
              <div className="h-48 bg-gray-100 relative">
                {product.primary_image_url ? (
                  <img 
                    src={product.primary_image_url} 
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-1">
                  {product.categories?.name}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.short_description}</p>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  {canSeePrices ? (
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {formatPrice(product.price, product.currency)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Precio distribuidor
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-2xl">🔒</span>
                      <span className="text-gray-600">Precio visible para distribuidores</span>
                    </div>
                  )}
                </div>

                <Link 
                  href={`/productos/${product.slug}`}
                  className="block text-center bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
                >
                  Ver ficha técnica
                </Link>
              </div>
            </div>
          ))}
        </div>

        {(!products || products.length === 0) && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900">No hay productos aún</h3>
            <p className="text-gray-600">Los productos se agregan desde el panel de administración.</p>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
