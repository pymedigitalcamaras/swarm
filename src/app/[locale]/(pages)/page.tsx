import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations('hero');

  return (
    <div className="relative">
      {
      /* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-[#1E3A5F] px-4">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            <span>☀️</span>
            {t('badge_solar')}
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mb-8 text-xl text-gray-200">
            {t('subtitle')}
          </p>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            {t('badge_installers')}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/calculadora"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#1E3A5F] shadow-lg transition hover:bg-gray-100"
            >
              {t('cta_primary')}
            </Link>
            <Link
              href="/catalogo"
              className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
            >
              {t('cta_secondary')}
            </Link>
          </div>
        </div>
      </section>

      {
      /* Why NAE Preview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {title: 'Ahorro energético', desc: 'Reduce hasta 80% tu consumo', icon: '⚡'},
            {title: 'Reducción CO₂', desc: 'Tecnología limpia y eficiente', icon: '🌱'},
            {title: 'Tecnología Inverter', desc: 'Máximo rendimiento', icon: '🔧'},
            {title: 'Soporte completo', desc: 'Acompañamiento total', icon: '🤝'},
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-gray-200 p-6 text-center transition hover:shadow-lg">
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-[#1E3A5F]">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {
      /* Solar Integration */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1E3A5F]/10 px-4 py-2 text-sm font-medium text-[#1E3A5F]">
                ☀️ Integración Solar
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Bomba de calor + Solar = Autonomía energética
              </h2>
              <p className="mb-4 text-lg text-gray-600">
                Nuestras bombas de calor están diseñadas para integrarse perfectamente con sistemas fotovoltaicos.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✅ Los paneles alimentan la bomba de calor directamente durante el día</li>
                <li>✅ Reduce el consumo de gas o electricidad en 70-90%</li>
                <li>✅ Sistema prácticamente autónomo</li>
                <li>✅ Ideal para climas latinoamericanos con alta radiación solar</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[#1E3A5F] p-8 text-white">
              <h3 className="mb-4 text-xl font-bold">Comparativa de tecnologías</h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-white/10 p-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">NAE + Solar</span>
                    <span className="font-bold text-green-400">-90%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/20">
                    <div className="h-full w-[10%] rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="rounded-lg bg-white/10 p-4">
                  <div className="flex justify-between">
                    <span>Gas</span>
                    <span>Base</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/20">
                    <div className="h-full w-full rounded-full bg-red-400"></div>
                  </div>
                </div>
                <div className="rounded-lg bg-white/10 p-4">
                  <div className="flex justify-between">
                    <span>Electricidad tradicional</span>
                    <span>+40%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/20">
                    <div className="h-full w-full rounded-full bg-red-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
      /* CTA Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-[#1E3A5F]">
            ¿Listo para transformar la energía de tus proyectos?
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/calculadora"
              className="rounded-lg bg-[#1E3A5F] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#152d4a]"
            >
              Cotiza tu proyecto
            </Link>
            <Link
              href="/area-tecnica"
              className="rounded-lg border-2 border-[#1E3A5F] px-8 py-4 text-lg font-semibold text-[#1E3A5F] transition hover:bg-[#1E3A5F]/5"
            >
              Conoce el área técnica
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}