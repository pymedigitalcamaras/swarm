'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {products, typeLabels, appLabels} from '@/lib/products';
import Image from 'next/image';
import {Reveal} from '@/components/Reveal';

export default function CatalogPage() {
  const t = useTranslations('catalog');
  const [filterType, setFilterType] = useState('all');
  const [filterApp, setFilterApp] = useState('all');

  const filtered = products.filter((p) => {
    const typeMatch = filterType === 'all' || p.type === filterType;
    const appMatch = filterApp === 'all' || p.application === filterApp;
    return typeMatch && appMatch;
  });

  const categories = [
    {id: 'all', label: 'Todos', count: products.length},
    {id: 'acs', label: 'Agua Caliente', count: products.filter(p => p.type === 'acs').length},
    {id: 'clima', label: 'Climatización', count: products.filter(p => p.type === 'clima').length},
    {id: 'pool', label: 'Piscina', count: products.filter(p => p.type === 'pool').length},
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Catalog */}
      <section className="bg-[#1E3A5F] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl font-industrial">
                Catálogo de Productos NAE
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-white/80">
                Bombas de calor de fábrica directa. Tecnología probada para Latinoamérica.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[72px] z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterType(cat.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    filterType === cat.id
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    filterType === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Application filter */}
            <select
              value={filterApp}
              onChange={(e) => setFilterApp(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
            >
              <option value="all">Todas las aplicaciones</option>
              <option value="residential">Residencial</option>
              <option value="commercial">Comercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-bold text-[#1E3A5F]">{filtered.length}</span> productos
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => (
            <Reveal key={product.id} delay={index * 50}>
              <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.model}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {/* Badges */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#1E3A5F] px-3 py-1 text-xs font-bold text-white">
                      {product.line}
                    </span>
                    {product.solarCompatible && (
                      <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-[#1E3A5F]">
                        ☀️ Compatible con solar
                      </span>
                    )}
                  </div>
                  {/* Application badge */}
                  <div className="absolute right-3 top-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      product.application === 'industrial' 
                        ? 'bg-red-500 text-white' 
                        : product.application === 'commercial'
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}>
                      {appLabels[product.application]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{product.model}</h3>
                  <p className="mb-4 text-sm text-gray-600">{product.description}</p>

                  {/* Specs */}
                  <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-lg bg-gray-50 p-2">
                      <span className="text-xs text-gray-500">Capacidad</span>
                      <p className="font-bold text-[#1E3A5F]">{product.capacity} kW</p>
                    </div>
                    {product.flow && (
                      <div className="rounded-lg bg-gray-50 p-2">
                        <span className="text-xs text-gray-500">Caudal</span>
                        <p className="font-bold text-[#1E3A5F]">{product.flow}</p>
                      </div>
                    )}
                    {product.area && (
                      <div className="rounded-lg bg-gray-50 p-2">
                        <span className="text-xs text-gray-500">Área</span>
                        <p className="font-bold text-[#1E3A5F]">{product.area}</p>
                      </div>
                    )}
                    {product.temp && (
                      <div className="rounded-lg bg-gray-50 p-2">
                        <span className="text-xs text-gray-500">Temperatura</span>
                        <p className="font-bold text-[#1E3A5F]">{product.temp}</p>
                      </div>
                    )}
                    {product.refrigerant && (
                      <div className="rounded-lg bg-gray-50 p-2">
                        <span className="text-xs text-gray-500">Refrigerante</span>
                        <p className="font-bold text-[#1E3A5F]">{product.refrigerant}</p>
                      </div>
                    )}
                    {product.volume && (
                      <div className="rounded-lg bg-gray-50 p-2">
                        <span className="text-xs text-gray-500">Volumen</span>
                        <p className="font-bold text-[#1E3A5F]">{product.volume}</p>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <button className="w-full rounded-lg bg-[#1E3A5F] py-3 text-sm font-bold text-white transition hover:bg-[#152d4a] hover:scale-[1.02]">
                    Solicitar cotización
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">No se encontraron productos</h3>
            <p className="text-gray-600">Prueba con otros filtros</p>
          </div>
        )}
      </section>
    </div>
  );
}
