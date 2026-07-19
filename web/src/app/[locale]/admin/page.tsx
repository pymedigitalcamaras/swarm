'use client';

import {useAuth} from '@/components/auth/AuthContext';
import {products} from '@/lib/products';
import Image from 'next/image';

export default function AdminPage() {
  const {logout} = useAuth();

  const stats = [
    {label: 'Total Productos', value: products.length, icon: '📦'},
    {label: 'Compatibles Solar', value: products.filter(p => p.solarCompatible).length, icon: '☀️'},
    {label: 'Residenciales', value: products.filter(p => p.application === 'residential').length, icon: '🏠'},
    {label: 'Comerciales', value: products.filter(p => p.application === 'commercial').length, icon: '🏢'},
    {label: 'Industriales', value: products.filter(p => p.application === 'industrial').length, icon: '🏭'},
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-[#1E3A5F] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
              <p className="text-sm text-white/70">NAE - Gestión de productos y cotizaciones</p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="mb-2 text-3xl">{stat.icon}</div>
              <div className="text-2xl font-bold text-[#1E3A5F]">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">Productos en catálogo</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-3">Imagen</th>
                  <th className="px-6 py-3">Modelo</th>
                  <th className="px-6 py-3">Línea</th>
                  <th className="px-6 py-3">Capacidad</th>
                  <th className="px-6 py-3">Aplicación</th>
                  <th className="px-6 py-3">Solar</th>
                  <th className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                        <Image
                          src={product.image}
                          alt={product.model}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{product.model}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#1E3A5F]/10 px-2 py-1 text-xs font-medium text-[#1E3A5F]">
                        {product.line}
                      </span>
                    </td>
                    <td className="px-6 py-4">{product.capacity} kW</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        product.application === 'industrial' 
                          ? 'bg-red-100 text-red-700' 
                          : product.application === 'commercial'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {product.application}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.solarCompatible ? (
                        <span className="text-lg">☀️</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="rounded-lg bg-[#1E3A5F] px-3 py-1 text-xs font-medium text-white hover:bg-[#152d4a]">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-2 font-bold text-gray-900">📊 Cotizaciones</h3>
            <p className="mb-4 text-sm text-gray-600">Ver solicitudes de cotización recibidas</p>
            <button className="rounded-lg bg-[#1E3A5F] px-4 py-2 text-sm font-medium text-white hover:bg-[#152d4a]">
              Ver cotizaciones
            </button>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-2 font-bold text-gray-900">📝 Contenido</h3>
            <p className="mb-4 text-sm text-gray-600">Editar textos e imágenes del sitio</p>
            <button className="rounded-lg bg-[#1E3A5F] px-4 py-2 text-sm font-medium text-white hover:bg-[#152d4a]">
              Editar contenido
            </button>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-2 font-bold text-gray-900">⚙️ Configuración</h3>
            <p className="mb-4 text-sm text-gray-600">Ajustes del sitio y contacto</p>
            <button className="rounded-lg bg-[#1E3A5F] px-4 py-2 text-sm font-medium text-white hover:bg-[#152d4a]">
              Configurar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
