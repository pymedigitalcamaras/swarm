'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {products} from '@/lib/products';

export default function CalculatorPage() {
  const t = useTranslations('calculator');
  const [form, setForm] = useState({
    m2: '',
    liters: '',
    buildingType: 'house',
    country: '',
    solar: false
  });
  const [result, setResult] = useState<any>(null);
  const [lead, setLead] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    projectType: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const calculate = () => {
    const m2 = Number(form.m2) || 100;
    const liters = Number(form.liters) || 300;
    const solarMultiplier = form.solar ? 0.2 : 1;

    const recommended = products.filter((p) => {
      const cap = p.capacity || 0;
      if (form.buildingType === 'house') return cap >= 15 && cap <= 30;
      if (form.buildingType === 'apartment') return cap >= 10 && cap <= 25;
      if (form.buildingType === 'building') return cap >= 35;
      return cap >= 20;
    }).slice(0, 3);

    const savings = Math.round((75 * solarMultiplier) * 100) / 100;
    const autonomy = form.solar ? '85-95%' : '60-70%';

    setResult({
      products: recommended,
      savings: `${savings}%`,
      autonomy,
      solarText: form.solar ? 'Incluyendo ahorro adicional por energía solar' : ''
    });
  };

  const submitLead = () => {
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-[#1E3A5F]">{t('title')}</h1>

      {
      /* Calculator Form */}
      <div className="mb-8 rounded-xl border border-gray-200 p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">{t('m2')}</label>
            <input
              type="number"
              value={form.m2}
              onChange={(e) => setForm({...form, m2: e.target.value})}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              placeholder="100"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">{t('liters')}</label>
            <input
              type="number"
              value={form.liters}
              onChange={(e) => setForm({...form, liters: e.target.value})}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              placeholder="300"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">{t('building_type')}</label>
            <select
              value={form.buildingType}
              onChange={(e) => setForm({...form, buildingType: e.target.value})}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="house">{t('house')}</option>
              <option value="apartment">{t('apartment')}</option>
              <option value="building">{t('building')}</option>
              <option value="commercial">{t('commercial')}</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">{t('country')}</label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => setForm({...form, country: e.target.value})}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              placeholder="México, Argentina, Colombia..."
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="solar"
            checked={form.solar}
            onChange={(e) => setForm({...form, solar: e.target.checked})}
            className="h-5 w-5 rounded border-gray-300 text-[#1E3A5F]"
          />
          <label htmlFor="solar" className="text-sm font-medium">{t('solar_checkbox')}</label>
        </div>

        <button
          onClick={calculate}
          className="mt-6 w-full rounded-lg bg-[#1E3A5F] py-3 text-lg font-semibold text-white hover:bg-[#152d4a]"
        >
          {t('submit')}
        </button>
      </div>

      {
      /* Results */}
      {result && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-4 text-xl font-bold">Resultados</h2>
          <div className="mb-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4 text-center">
              <p className="text-sm text-gray-600">{t('result_savings')}</p>
              <p className="text-2xl font-bold text-green-600">{result.savings}</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <p className="text-sm text-gray-600">{t('result_autonomy')}</p>
              <p className="text-2xl font-bold text-[#1E3A5F]">{result.autonomy}</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <p className="text-sm text-gray-600">Recomendaciones</p>
              <p className="text-2xl font-bold text-[#1E3A5F]">{result.products.length}</p>
            </div>
          </div>
          {result.solarText && (
            <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
              ☀️ {result.solarText}
            </div>
          )}
          <div className="space-y-3">
            {result.products.map((p: any) => (
              <div key={p.id} className="rounded-lg bg-white p-4">
                <p className="font-semibold">{p.model}</p>
                <p className="text-sm text-gray-600">{p.capacity} kW — {p.line}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {
      /* Lead Form */}
      {result && !submitted && (
        <div className="rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-bold">Solicitar cotización</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder={t('form_name')} className="rounded-lg border border-gray-300 px-4 py-2" value={lead.name} onChange={(e) => setLead({...lead, name: e.target.value})} />
            <input placeholder={t('form_company')} className="rounded-lg border border-gray-300 px-4 py-2" value={lead.company} onChange={(e) => setLead({...lead, company: e.target.value})} />
            <input placeholder={t('form_email')} type="email" className="rounded-lg border border-gray-300 px-4 py-2" value={lead.email} onChange={(e) => setLead({...lead, email: e.target.value})} />
            <input placeholder={t('form_phone')} className="rounded-lg border border-gray-300 px-4 py-2" value={lead.phone} onChange={(e) => setLead({...lead, phone: e.target.value})} />
            <input placeholder={t('form_whatsapp')} className="rounded-lg border border-gray-300 px-4 py-2" value={lead.whatsapp} onChange={(e) => setLead({...lead, whatsapp: e.target.value})} />
            <input placeholder={t('form_project_type')} className="rounded-lg border border-gray-300 px-4 py-2" value={lead.projectType} onChange={(e) => setLead({...lead, projectType: e.target.value})} />
          </div>
          <button
            onClick={submitLead}
            className="mt-6 w-full rounded-lg bg-[#1E3A5F] py-3 text-lg font-semibold text-white hover:bg-[#152d4a]"
          >
            {t('form_submit')}
          </button>
        </div>
      )}

      {submitted && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="text-lg font-semibold text-green-800">✅ ¡Solicitud enviada con éxito!</p>
          <p className="text-green-700">Te contactaremos pronto.</p>
        </div>
      )}
    </div>
  );
}