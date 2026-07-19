import {useTranslations} from 'next-intl';

export default function WhyPage() {
  const t = useTranslations('why');

  const benefits = [
    {title: t('savings'), desc: 'Reduce hasta 80% el consumo energético comparado con sistemas tradicionales de gas o electricidad.', icon: '⚡'},
    {title: t('co2'), desc: 'Tecnología limpia que reduce significativamente las emisiones de CO₂.', icon: '🌱'},
    {title: t('inverter'), desc: 'Compresores inverter de última generación para máximo rendimiento y durabilidad.', icon: '🔧'},
    {title: t('support'), desc: 'Acompañamiento técnico desde la cotización hasta la instalación final.', icon: '🤝'},
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-center text-3xl font-bold text-[#1E3A5F]">{t('title')}</h1>

      {
      /* Benefits */}
      <div className="mb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-xl border border-gray-200 p-6 text-center transition hover:shadow-lg">
            <div className="mb-4 text-4xl">{b.icon}</div>
            <h3 className="mb-2 text-lg font-semibold text-[#1E3A5F]">{b.title}</h3>
            <p className="text-sm text-gray-600">{b.desc}</p>
          </div>
        ))}
      </div>

      {
      /* Comparison */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-2xl font-bold">{t('comparison_title')}</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="grid grid-cols-4 bg-gray-50 p-4 text-sm font-semibold">
            <div>Tecnología</div>
            <div>Consumo</div>
            <div>CO₂</div>
            <div>Solar Ready</div>
          </div>
          <div className="grid grid-cols-4 border-t border-gray-200 bg-green-50 p-4">
            <div className="font-semibold text-green-700">NAE + Solar</div>
            <div>-90%</div>
            <div>-95%</div>
            <div>✅ Nativo</div>
          </div>
          <div className="grid grid-cols-4 border-t border-gray-200 p-4">
            <div>Gas</div>
            <div>Base</div>
            <div>Alto</div>
            <div>❌</div>
          </div>
          <div className="grid grid-cols-4 border-t border-gray-200 p-4">
            <div>Electricidad tradicional</div>
            <div>+40%</div>
            <div>Medio</div>
            <div>❌</div>
          </div>
          <div className="grid grid-cols-4 border-t border-gray-200 p-4">
            <div>Bomba convencional</div>
            <div>-50%</div>
            <div>-40%</div>
            <div>⚠️ Adaptable</div>
          </div>
        </div>
      </section>

      {
      /* Testimonials */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-2xl font-bold">{t('testimonials')}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {name: 'Carlos M.', country: 'México', text: 'Excelente soporte técnico. Me guiaron en la instalación paso a paso.'},
            {name: 'Ana R.', country: 'Argentina', text: 'Los equipos NAE son de primera calidad. Mis clientes están muy satisfechos.'},
            {name: 'João S.', country: 'Brasil', text: 'La integración con solar es perfecta. El soporte es excepcional.'},
          ].map((t) => (
            <div key={t.name} className="rounded-xl border border-gray-200 p-6">
              <p className="mb-4 text-gray-600">"{t.text}"</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.country}</p>
            </div>
          ))}
        </div>
      </section>

      {
      /* Coverage Map */}
      <section className="rounded-xl bg-[#1E3A5F] p-8 text-white">
        <h2 className="mb-4 text-center text-2xl font-bold">{t('coverage')}</h2>
        <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {['México', 'Argentina', 'Colombia', 'Perú', 'Brasil', 'Chile', 'Ecuador', 'USA Latino'].map((c) => (
            <div key={c} className="rounded-lg bg-white/10 p-3">
              {c}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}