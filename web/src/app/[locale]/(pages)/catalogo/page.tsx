'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {products, typeLabels, appLabels} from '@/lib/products';
import Image from 'next/image';

export default function CatalogPage() {
  const t = useTranslations('catalog');
  const [filterType, setFilterType] = useState('all');
  const [filterApp, setFilterApp] = useState('all');

  const filtered = products.filter((p) => {
    const typeMatch = filterType === 'all' || p.type === filterType;
    const appMatch = filterApp === 'all' || p.application === filterApp;
    return typeMatch && appMatch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-[#1E3A5F]">{t('title')}</h1>

      {
      /* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">{t('filter_type')}</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            <option value="all">Todos</option>
            <option value="acs">{t('acs')}</option>
            <option value="clima">{t('clima')}</option>
            <option value="pool">{t('pool')}</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">{t('filter_application')}</label>
          <select
            value={filterApp}
            onChange={(e) => setFilterApp(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            <option value="all">Todas</option>
            <option value="residential">{t('residential')}</option>
            <option value="commercial">{t('commercial')}</option>
            <option value="industrial">{t('industrial')}</option>
          </select>
        </div>
      </div>

      {
      /* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <div key={product.id} className="rounded-xl border border-gray-200 p-6 transition hover:shadow-lg">
            <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100">
              <div className="flex h-full items-center justify-center text-4xl text-gray-300">
                📦
              </div>
            </div>
            <div className="mb-2 inline-block rounded-full bg-[#1E3A5F]/10 px-3 py-1 text-xs font-medium text-[#1E3A5F]">
              {product.line}
            </div>
            <h3 className="mb-2 text-lg font-semibold">{product.model}</h3>
            <div className="mb-4 space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Capacidad:</span> {product.capacity} kW</p>
              {product.flow && <p><span className="font-medium">Caudal:</span> {product.flow}</p>}
              {product.area && <p><span className="font-medium">Área:</span> {product.area}</p>}
              {product.temp && <p><span className="font-medium">Temp:</span> {product.temp}</p>}
              {product.refrigerant && <p><span className="font-medium">Refrigerante:</span> {product.refrigerant}</p>}
              <p><span className="font-medium">Aplicación:</span> {appLabels[product.application]}</p>
            </div>
            <div className="mb-4 rounded-lg bg-green-50 p-3">
              <p className="text-xs font-medium text-green-700">☀️ {t('solar_section')}: Compatible con fotovoltaico</p>
            </div>
            <button className="w-full rounded-lg bg-[#1E3A5F] py-2 text-sm font-medium text-white hover:bg-[#152d4a]">
              {t('quote_button')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}