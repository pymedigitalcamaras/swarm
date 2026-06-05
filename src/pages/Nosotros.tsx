import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Wrench,
  Zap,
  Users,
  Headphones,
} from 'lucide-react';
import Layout from '@/components/Layout';

gsap.registerPlugin(ScrollTrigger);

/* ───────────── data ───────────── */

const stats = [
  { number: '15+', label: 'AÑOS DE EXPERIENCIA' },
  { number: '5', label: 'PAÍSES' },
  { number: '200+', label: 'DISTRIBUIDORES' },
  { number: '2,000+', label: 'INSTALACIONES' },
];

const values = [
  {
    icon: Wrench,
    iconBg: 'rgba(21,72,160,0.1)',
    iconColor: '#1548a0',
    title: 'INGENIERÍA LOCAL',
    description:
      'Equipos diseñados y probados para las condiciones climáticas, eléctricas y constructivas de cada país latinoamericano.',
  },
  {
    icon: Zap,
    iconBg: 'rgba(42,157,143,0.1)',
    iconColor: '#2a9d8f',
    title: 'EFICIENCIA REAL',
    description:
      'COP verificado en condiciones reales de operación, no solo en laboratorio. Transparencia total en nuestros datos de rendimiento.',
  },
  {
    icon: Users,
    iconBg: 'rgba(230,57,70,0.1)',
    iconColor: '#e63946',
    title: 'FORMACIÓN CONTINUA',
    description:
      'Capacitamos a cada distribuidor para que sea un referente técnico en su región. Tu éxito es nuestro éxito.',
  },
  {
    icon: Headphones,
    iconBg: 'rgba(21,72,160,0.1)',
    iconColor: '#1548a0',
    title: 'SOPORTE DEDICADO',
    description:
      'Línea directa con ingenieros especializados. Respuesta en menos de 24 horas en todos los canales de comunicación.',
  },
];

const teamMembers = [
  {
    name: 'Andrés Herrera',
    role: 'CEO & Fundador',
    bio: '15 años en HVAC industrial. Lideró la expansión desde Chile a 5 países.',
    initials: 'AH',
    bgColor: '#1548a0',
  },
  {
    name: 'María Paz Soto',
    role: 'Directora de Ingeniería',
    bio: 'Ing. Mecánica UC. Diseñó la línea AquaPro R32 desde cero.',
    initials: 'MS',
    bgColor: '#2a9d8f',
  },
  {
    name: 'Diego Flores',
    role: 'Jefe de Formación',
    bio: 'Ex-installador certificado. Capacitó a 400+ distribuidores en la región.',
    initials: 'DF',
    bgColor: '#e63946',
  },
  {
    name: 'Carolina Ruiz',
    role: 'Gerente de Operaciones',
    bio: 'Gestión de cadena de suministro y logística multinacional.',
    initials: 'CR',
    bgColor: '#1548a0',
  },
];

const certifications = ['ISO 9001', 'CE', 'ERP', 'Keymark', 'Eurovent'];

const countries = [
  { flag: '🇨🇱', name: 'Chile', active: true },
  { flag: '🇲🇽', name: 'México', active: true },
  { flag: '🇨🇴', name: 'Colombia', active: true },
  { flag: '🇵🇪', name: 'Perú', active: true },
  { flag: '🇦🇷', name: 'Argentina', active: true },
];

/* ───────────── component ───────────── */

export default function Nosotros() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const easeSmooth = 'power2.out';

      /* ── hero eyebrow ── */
      gsap.from('.hero-eyebrow', {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
      });

      /* ── hero title ── */
      gsap.from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      });

      /* ── hero subtitle ── */
      gsap.from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: easeSmooth,
        delay: 0.6,
      });

      /* ── story image ── */
      gsap.from('.story-image', {
        x: -30,
        opacity: 0,
        duration: 0.9,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.story-image',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* ── story text ── */
      gsap.from('.story-text', {
        x: 30,
        opacity: 0,
        duration: 0.9,
        ease: easeSmooth,
        delay: 0.15,
        scrollTrigger: {
          trigger: '.story-text',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* ── quote block ── */
      gsap.from('.quote-block', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: easeSmooth,
        delay: 0.4,
        scrollTrigger: {
          trigger: '.quote-block',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      /* ── values header ── */
      gsap.from('.values-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.values-header',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* ── value cards stagger ── */
      gsap.from('.value-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* ── team header ── */
      gsap.from('.team-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.team-header',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* ── team cards stagger ── */
      gsap.from('.team-card', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* ── certifications ── */
      gsap.from('.cert-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.cert-row',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      /* ── country pills ── */
      gsap.from('.country-pill', {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.presence-row',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      /* ── stats ── */
      gsap.from('.stat-item', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.stats-row',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <Layout>
      <div ref={containerRef}>
        {/* ════════════════════════════════════
            SECTION 1 — Page Header (dark)
        ════════════════════════════════════ */}
        <section
          className="relative"
          style={{
            backgroundColor: '#0f0f12',
            padding: 'clamp(7rem, 12vw, 10rem) 0 clamp(3rem, 6vw, 5rem)',
          }}
        >
          <div className="container-tp text-center" style={{ maxWidth: '900px' }}>
            {/* eyebrow */}
            <div className="hero-eyebrow flex flex-col items-center gap-3 mb-6">
              <div
                className="flex items-center gap-3"
                style={{ justifyContent: 'center' }}
              >
                <span
                  className="inline-block"
                  style={{
                    width: '3rem',
                    height: '2px',
                    backgroundColor: '#e63946',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#2a9d8f',
                  }}
                >
                  NOSOTROS
                </span>
                <span
                  className="inline-block"
                  style={{
                    width: '3rem',
                    height: '2px',
                    backgroundColor: '#e63946',
                  }}
                />
              </div>
            </div>

            {/* title */}
            <h1
              className="hero-title uppercase"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                lineHeight: 1.05,
                color: '#ffffff',
              }}
            >
              INGENIERÍA TÉRMICA
              <br />
              PARA LATINOAMÉRICA
            </h1>

            {/* subtitle */}
            <p
              className="hero-subtitle mx-auto"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '620px',
                marginTop: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              Diseñamos y fabricamos bombas de calor con tecnología europea,
              adaptadas a las condiciones climáticas y constructivas de cada país
              latinoamericano.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 2 — Company Story
        ════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: '#f8f9fa',
            padding: 'clamp(5rem, 8vw, 8rem) 0',
          }}
        >
          <div className="container-tp">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              {/* Image left */}
              <div className="story-image w-full lg:w-[45%]">
                <div
                  className="overflow-hidden"
                  style={{
                    borderRadius: '8px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                  }}
                >
                  <img
                    src="/about-team.jpg"
                    alt="Equipo ThermaPro en laboratorio de ingeniería térmica"
                    className="w-full object-cover"
                    style={{ aspectRatio: '3/4' }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Text right */}
              <div className="story-text w-full lg:w-[55%]">
                {/* eyebrow */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    style={{
                      width: '2rem',
                      height: '2px',
                      backgroundColor: '#e63946',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#2a9d8f',
                    }}
                  >
                    NUESTRA HISTORIA
                  </span>
                </div>

                {/* title */}
                <h2
                  className="uppercase"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)',
                    color: '#1a1a2e',
                    lineHeight: 1.1,
                  }}
                >
                  DE LA INGENIERÍA AL IMPACTO
                </h2>

                {/* paragraphs */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '1rem',
                    color: '#4a5568',
                    lineHeight: 1.7,
                    marginTop: '1.5rem',
                  }}
                >
                  ThermaPro nació de una observación simple: Latinoamérica tiene un
                  clima ideal para las bombas de calor, pero la oferta tecnológica
                  estaba diseñada para Europa. Los equipos importados no resistían
                  las altas temperaturas, las variaciones de tensión ni las
                  condiciones de instalación locales.
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '1rem',
                    color: '#4a5568',
                    lineHeight: 1.7,
                    marginTop: '1rem',
                  }}
                >
                  En 2018 reunimos un equipo de ingenieros térmicos con experiencia
                  en el sector HVAC europeo y comenzamos a desarrollar equipos desde
                  cero, pensados para cada país de la región. Hoy operamos en Chile,
                  México, Colombia, Perú y Argentina con una red de más de 500
                  distribuidores certificados.
                </p>

                {/* Stats row */}
                <div
                  className="stats-row grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8"
                >
                  {stats.map((s) => (
                    <div key={s.label} className="stat-item text-center">
                      <div
                        className="text-gradient-teal"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 900,
                          fontSize: 'clamp(2rem, 3vw, 3rem)',
                          lineHeight: 1,
                        }}
                      >
                        {s.number}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: '#4a5568',
                          marginTop: '0.5rem',
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote block */}
                <div
                  className="quote-block"
                  style={{
                    marginTop: '2rem',
                    paddingLeft: '1.5rem',
                    borderLeft: '3px solid #e63946',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.05rem',
                      color: '#1a1a2e',
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                    }}
                  >
                    &ldquo;Nuestro objetivo no es solo vender equipos. Es formar
                    distribuidores exitosos que transformen la climatización en su
                    país.&rdquo;
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.85rem',
                      color: '#4a5568',
                      marginTop: '0.75rem',
                    }}
                  >
                    — Equipo directivo ThermaPro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 3 — Values / Pillars
        ════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: '#ffffff',
            padding: 'clamp(5rem, 8vw, 8rem) 0',
          }}
        >
          <div className="container-tp">
            {/* section header */}
            <div className="values-header text-center mb-12 lg:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span
                  style={{
                    width: '2rem',
                    height: '2px',
                    backgroundColor: '#e63946',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#2a9d8f',
                  }}
                >
                  NUESTROS PILARES
                </span>
                <span
                  style={{
                    width: '2rem',
                    height: '2px',
                    backgroundColor: '#e63946',
                  }}
                />
              </div>
              <h2
                className="uppercase"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  color: '#1a1a2e',
                  lineHeight: 1.1,
                }}
              >
                LO QUE NOS DEFINE
              </h2>
            </div>

            {/* value cards grid */}
            <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="value-card"
                    style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '2.5rem',
                      transition:
                        'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 300ms',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow =
                        '0 8px 24px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#1548a0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    {/* icon */}
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: '3rem',
                        height: '3rem',
                        backgroundColor: v.iconBg,
                        borderRadius: '8px',
                      }}
                    >
                      <Icon size={24} style={{ color: v.iconColor }} />
                    </div>

                    {/* title */}
                    <h3
                      className="uppercase"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a2e',
                        marginTop: '1.25rem',
                        lineHeight: 1.2,
                      }}
                    >
                      {v.title}
                    </h3>

                    {/* description */}
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '0.9rem',
                        color: '#4a5568',
                        marginTop: '0.75rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {v.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 4 — Team
        ════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: '#f8f9fa',
            padding: 'clamp(5rem, 8vw, 8rem) 0',
          }}
        >
          <div className="container-tp">
            {/* section header */}
            <div className="team-header text-center mb-12 lg:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span
                  style={{
                    width: '2rem',
                    height: '2px',
                    backgroundColor: '#e63946',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#2a9d8f',
                  }}
                >
                  EQUIPO
                </span>
                <span
                  style={{
                    width: '2rem',
                    height: '2px',
                    backgroundColor: '#e63946',
                  }}
                />
              </div>
              <h2
                className="uppercase"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  color: '#1a1a2e',
                  lineHeight: 1.1,
                }}
              >
                QUIENES ESTÁN DETRÁS
              </h2>
            </div>

            {/* team cards grid */}
            <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((m) => (
                <div
                  key={m.name}
                  className="team-card"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    textAlign: 'center',
                    transition:
                      'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 300ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow =
                      '0 8px 32px rgba(0,0,0,0.1)';
                    const img = e.currentTarget.querySelector(
                      '.team-photo',
                    ) as HTMLElement;
                    if (img) img.style.filter = 'grayscale(0%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    const img = e.currentTarget.querySelector(
                      '.team-photo',
                    ) as HTMLElement;
                    if (img) img.style.filter = 'grayscale(30%)';
                  }}
                >
                  {/* avatar placeholder */}
                  <div
                    className="team-photo flex items-center justify-center"
                    style={{
                      aspectRatio: '1/1',
                      backgroundColor: m.bgColor,
                      filter: 'grayscale(30%)',
                      transition: 'filter 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 800,
                        fontSize: '4rem',
                        color: 'rgba(255,255,255,0.4)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {m.initials}
                    </span>
                  </div>

                  {/* content */}
                  <div style={{ padding: '1.5rem' }}>
                    <h3
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: '#1a1a2e',
                      }}
                    >
                      {m.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        color: '#2a9d8f',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginTop: '0.25rem',
                      }}
                    >
                      {m.role}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '0.85rem',
                        color: '#4a5568',
                        marginTop: '0.75rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {m.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 5 — Certifications & Partners
        ════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: '#ffffff',
            padding: 'clamp(4rem, 6vw, 6rem) 0',
          }}
        >
          <div className="container-tp">
            {/* Certifications row */}
            <div className="cert-row text-center">
              <h3
                className="uppercase"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#1a1a2e',
                  letterSpacing: '0.05em',
                }}
              >
                CERTIFICACIONES Y NORMAS
              </h3>

              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mt-8">
                {certifications.map((cert) => (
                  <div
                    key={cert}
                    className="cert-item"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                      color: '#4a5568',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: '0.75rem 1.5rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      filter: 'grayscale(100%)',
                      opacity: 0.6,
                      transition:
                        'filter 300ms ease, opacity 300ms ease, border-color 300ms',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'grayscale(0%)';
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.borderColor = '#1548a0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(100%)';
                      e.currentTarget.style.opacity = '0.6';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    {cert}
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  color: '#4a5568',
                  maxWidth: '560px',
                  margin: '1.5rem auto 0',
                  lineHeight: 1.5,
                }}
              >
                Todos nuestros equipos cumplen con normativa europea ErP y están
                certificados CE. Operamos bajo estándar ISO 9001 de gestión de
                calidad.
              </p>
            </div>

            {/* Presence row */}
            <div
              className="presence-row text-center"
              style={{ marginTop: 'clamp(3rem, 5vw, 5rem)' }}
            >
              <h3
                className="uppercase"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#1a1a2e',
                  letterSpacing: '0.05em',
                }}
              >
                PRESENCIA EN LATINOAMÉRICA
              </h3>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {countries.map((c) => (
                  <div
                    key={c.name}
                    className="country-pill flex items-center gap-3"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '100px',
                      padding: '0.75rem 1.5rem',
                      transition:
                        'border-color 200ms ease, background-color 200ms ease, transform 200ms',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1548a0';
                      e.currentTarget.style.backgroundColor =
                        'rgba(21,72,160,0.05)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{c.flag}</span>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: '#1a1a2e',
                      }}
                    >
                      {c.name}
                    </span>
                    {c.active && (
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#2a9d8f',
                          display: 'inline-block',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.85rem',
                  color: '#4a5568',
                  marginTop: '1.5rem',
                }}
              >
                Oficinas centrales: Santiago de Chile · Ciudad de México · Bogotá
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
