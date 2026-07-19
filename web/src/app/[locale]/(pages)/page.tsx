import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import {Reveal} from '@/components/Reveal';

export default function HomePage() {
  const t = useTranslations('hero');

  return (
    <div className="relative">
      {/* Hero Section - Impactante con imagen real */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-bomba-atardecer.jpg"
            alt="Bomba de calor NAE con paisaje atardecer"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient #1E3A5F to transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F] via-[#1E3A5F]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/60 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge Solar prominente */}
            <div className="mb-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-bold text-[#1E3A5F] shadow-lg">
                <span className="text-lg">☀️</span>
                Diseñado para integración con energía solar fotovoltaica
              </div>
            </div>

            {/* Título grande */}
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl animate-fade-in-up delay-100 font-industrial">
              Bombas de calor de fábrica directa a Latinoamérica
            </h1>

            {/* Subtítulo */}
            <p className="mb-4 text-xl text-white/90 animate-fade-in-up delay-200">
              Tecnología china de 20 años. Capacitación directa. Soporte técnico completo.
            </p>

            {/* Badge instaladores */}
            <div className="mb-8 animate-fade-in-up delay-300">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-sm border border-white/20">
                <span>🔧</span>
                Para instaladores, distribuidores y proyectos industriales
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col items-start gap-4 sm:flex-row animate-fade-in-up delay-400">
              <Link
                href="/calculadora"
                className="rounded-lg bg-white px-8 py-4 text-lg font-bold text-[#1E3A5F] shadow-xl transition hover:bg-gray-100 hover:scale-105 hover:shadow-2xl"
              >
                Cotiza tu proyecto
              </Link>
              <Link
                href="/catalogo"
                className="rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white/15 hover:scale-105"
              >
                Ver catálogo de productos
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1E3A5F]/90 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                {value: '20+', label: 'Años de experiencia'},
                {value: '70-90%', label: 'Ahorro energético'},
                {value: '-25°C', label: 'Operación en frío extremo'},
                {value: '24/7', label: 'Soporte técnico'},
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why NAE Section - Con imagen real */}
      <section className="bg-[#e8eef5] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#1E3A5F] sm:text-4xl">
                ¿Por qué NAE?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Tecnología probada en fábrica china, adaptada para las condiciones de Latinoamérica
              </p>
            </div>
          </Reveal>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal delay={100}>
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/bombas-azotea.png"
                  alt="Instalación de bombas de calor NAE en azotea"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {title: 'AHORRO ENERGÉTICO', desc: 'Reduce hasta 80% tu consumo con tecnología inverter', icon: '⚡', value: '80%'},
                {title: 'REDUCCIÓN CO₂', desc: 'Tecnología limpia sin combustión de fósiles', icon: '🌱', value: '0'},
                {title: 'TECNOLOGÍA INVERTER', desc: 'Máximo rendimiento en todo el rango de temperatura', icon: '🔧', value: 'A+++'},
                {title: 'SOPORTE COMPLETO', desc: 'Capacitación directa desde fábrica', icon: '🤝', value: '24/7'},
              ].map((item, index) => (
                <Reveal key={item.title} delay={150 + index * 100}>
                  <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-xl hover:-translate-y-1">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-2xl font-bold text-[#1E3A5F]">{item.value}</span>
                    </div>
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-[#1E3A5F]">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solar Integration Section - NUEVA */}
      <section className="relative overflow-hidden bg-[#1E3A5F] px-4 py-20 sm:px-6 lg:px-8">
        {/* Background tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] to-[#152d4a]"></div>
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-[#1E3A5F]">
                  <span>☀️</span>
                  Integración Solar
                </div>
                <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl font-industrial">
                  Sistema autónomo: Bomba de calor + Energía solar
                </h2>
                <p className="mb-8 text-lg text-white/80">
                  Calienta agua y climatiza tu espacio con costos de energía cercanos a cero
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {value: '70-90%', label: 'Consumo eléctrico reducido', icon: '⚡'},
                    {value: 'Latam', label: 'Aprovecha la radiación solar de Latinoamérica', icon: '🌎'},
                    {value: '100%', label: 'Independencia de combustibles fósiles', icon: '♻️'},
                  ].map((benefit, index) => (
                    <Reveal key={benefit.label} delay={100 + index * 100}>
                      <div className="rounded-xl bg-white/10 p-5 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition">
                        <div className="mb-2 text-2xl">{benefit.icon}</div>
                        <div className="mb-1 text-2xl font-bold text-amber-400">{benefit.value}</div>
                        <div className="text-sm text-white/80">{benefit.label}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    href="/calculadora"
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-base font-bold text-[#1E3A5F] shadow-lg transition hover:bg-amber-400 hover:scale-105"
                  >
                    Descubre cómo funciona
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/alimenta-del-sol.png"
                  alt="Casa con paneles solares y bomba de calor NAE"
                  width={600}
                  height={500}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/40 to-transparent"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Residential Section */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal delay={200}>
              <div className="relative overflow-hidden rounded-2xl shadow-xl order-2 lg:order-1">
                <Image
                  src="/images/abosorve-calor.png"
                  alt="Instalación residencial de bomba de calor NAE"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal>
              <div className="order-1 lg:order-2">
                <h2 className="mb-6 text-3xl font-bold text-[#1E3A5F] sm:text-4xl font-industrial">
                  Climatización residencial inteligente
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Absorve el calor del ambiente para calentar agua y espacios de forma eficiente, incluso en temperaturas bajo cero.
                </p>
                <ul className="space-y-4">
                  {[
                    'Funciona desde -25°C hasta +43°C',
                    'Agua caliente sanitaria y calefacción',
                    'Control inteligente WiFi incluido',
                    'Diseño compacto para hogares',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1E3A5F] text-sm text-white">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Weather Resistant Section */}
      <section className="bg-[#e8eef5] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="mb-6 text-3xl font-bold text-[#1E3A5F] sm:text-4xl font-industrial">
                  Resistente a la intemperie
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Diseñadas para soportar lluvia, viento, sol intenso y condiciones extremas. Protección IP65 en componentes eléctricos.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {label: 'Protección IP65', desc: 'Contra polvo y agua'},
                    {label: 'Carcasa galvanizada', desc: 'Anti-corrosión'},
                    {label: 'Operación -25°C', desc: 'Climas extremos'},
                    {label: '10 años', desc: 'Vida útil estimada'},
                  ].map((spec) => (
                    <div key={spec.label} className="rounded-lg bg-white p-4 shadow-sm">
                      <div className="text-lg font-bold text-[#1E3A5F]">{spec.label}</div>
                      <div className="text-sm text-gray-600">{spec.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/resistente-intemperie.png"
                  alt="Bomba de calor NAE resistente a la lluvia"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1E3A5F] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl font-industrial">
              ¿Listo para transformar la energía de tus proyectos?
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Desde fábrica en China directo a tu proyecto en Latinoamérica. Cotiza hoy.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/calculadora"
                className="rounded-lg bg-white px-8 py-4 text-lg font-bold text-[#1E3A5F] shadow-lg transition hover:bg-gray-100 hover:scale-105"
              >
                Cotiza tu proyecto
              </Link>
              <Link
                href="/catalogo"
                className="rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
              >
                Ver catálogo completo
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
