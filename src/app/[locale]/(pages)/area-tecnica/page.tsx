import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function TechAreaPage() {
  const t = useTranslations('tech_area');

  const tools = [
    {title: t('budget'), desc: 'Genera presupuestos profesionales en minutos con datos actualizados.', icon: '💰'},
    {title: t('brain'), desc: 'Consulta técnica 24/7 con nuestro cerebro digital especializado en bombas de calor.', icon: '🧠'},
    {title: t('crm'), desc: 'Seguimiento completo de tus proyectos, clientes y cotizaciones.', icon: '📊'},
    {title: t('support'), desc: 'Videos, manuales y videollamadas de soporte durante la instalación.', icon: '📹'},
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-[#1E3A5F]">{t('title')}</h1>
        <p className="text-xl text-gray-600">{t('subtitle')}</p>
      </div>

      {
      /* Tools Grid */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">{t('tools')}</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <div key={tool.title} className="rounded-xl border border-gray-200 p-6 text-center transition hover:shadow-lg">
              <div className="mb-4 text-4xl">{tool.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-[#1E3A5F]">{tool.title}</h3>
              <p className="text-sm text-gray-600">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {
      /* Value Proposition */}
      <section className="mb-16 rounded-xl bg-gray-50 p-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-[#1E3A5F]">
              No vendemos equipos. Vendemos resultados.
            </h2>
            <p className="mb-4 text-gray-600">
              Cuando te conviertes en redistribuidor NAE, no solo recibes productos de alta calidad.
              Recibes un sistema completo de soporte que garantiza que cada instalación sea un éxito.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Herramientas de presupuesto inteligente</li>
              <li>✅ Cerebro digital para consultas técnicas 24/7</li>
              <li>✅ CRM para seguimiento de clientes y proyectos</li>
              <li>✅ Soporte paso a paso durante la instalación</li>
              <li>✅ Videollamadas en el punto de instalación si es necesario</li>
            </ul>
          </div>
          <div className="rounded-xl bg-[#1E3A5F] p-8 text-white">
            <h3 className="mb-4 text-xl font-bold">¿Por qué somos diferentes?</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-white/10 p-4">
                <p className="font-semibold">Otras empresas</p>
                <p className="text-sm text-gray-300">Te venden el equipo y desaparecen.</p>
              </div>
              <div className="rounded-lg bg-white/20 p-4">
                <p className="font-semibold">NAE</p>
                <p className="text-sm">Somos tu área técnica unificada. Estamos desde el primer paso hasta el último.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
      /* CTA */}
      <div className="text-center">
        <a
          href="/app/login"
          className="inline-block rounded-lg bg-[#1E3A5F] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#152d4a]"
        >
          {t('cta')}
        </a>
      </div>
    </div>
  );
}