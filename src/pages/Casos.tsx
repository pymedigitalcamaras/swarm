import { useRef, useState, useCallback, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowRight, MapPin, Thermometer, Calendar, Users } from 'lucide-react';
import Layout from '@/components/Layout';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── types ─────────────── */

type Category = 'TODOS' | 'RESIDENCIAL' | 'COMERCIAL' | 'INDUSTRIAL' | 'PISCINAS';

interface CaseStudy {
  id: number;
  name: string;
  location: string;
  countryFlag: string;
  category: Category;
  product: string;
  metric: string;
  metricLabel: string;
  metricColor: string;
  description: string;
  longDescription: string;
  details: string[];
  image: string;
  stats: { label: string; value: string }[];
  distributor: string;
  date: string;
}

/* ─────────────── data ─────────────── */

const categories: Category[] = ['TODOS', 'RESIDENCIAL', 'COMERCIAL', 'INDUSTRIAL', 'PISCINAS'];

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    name: 'Condominio Alto Maipo',
    location: 'Santiago, Chile',
    countryFlag: 'CL',
    category: 'RESIDENCIAL',
    product: 'AquaPro R32 20kW',
    metric: '68%',
    metricLabel: 'AHORRO ENERGÉTICO',
    metricColor: '#2a9d8f',
    description: 'Climatización completa de 24 departamentos con sistema aerotérmico centralizado.',
    longDescription: 'Climatización completa de 24 departamentos con sistema aerotérmico centralizado. Reemplazo de calefacción a gas por bombas de calor AquaPro R32 en configuración en cascada.',
    details: [
      'Equipos: 4× AquaPro R32 20kW en cascada',
      'Sistema: Monoblock con acumulación ACS centralizada',
      'Instalación: Noviembre 2023',
      'Distribuidor: Energía Verde Chile',
    ],
    image: '/product-aeroterm.jpg',
    stats: [
      { label: 'AHORRO ENERGÉTICO', value: '68%' },
      { label: 'DEPARTAMENTOS', value: '24' },
      { label: 'AÑOS PAYBACK', value: '3.2' },
    ],
    distributor: 'Energía Verde Chile',
    date: 'Noviembre 2023',
  },
  {
    id: 2,
    name: 'Hotel Costero del Pacífico',
    location: 'Viña del Mar, Chile',
    countryFlag: 'CL',
    category: 'COMERCIAL',
    product: 'AquaPro R32 12kW',
    metric: '72%',
    metricLabel: 'AHORRO ENERGÉTICO',
    metricColor: '#2a9d8f',
    description: 'Sistema de climatización y ACS para hotel boutique de 45 habitaciones frente al mar.',
    longDescription: 'Renovación completa del sistema térmico del hotel, reemplazando calderas de gas por bombas de calor AquaPro R32. Incluye climatización de espacios comunes y producción de agua caliente sanitaria para 45 habitaciones.',
    details: [
      'Equipos: 6× AquaPro R32 12kW',
      'Sistema: ACS + calefacción piscina climatizada',
      'Instalación: Marzo 2024',
      'Distribuidor: ClimaSoluciones',
    ],
    image: '/product-aeroterm.jpg',
    stats: [
      { label: 'AHORRO', value: '72%' },
      { label: 'HABITACIONES', value: '45' },
      { label: 'PAYBACK', value: '2.8' },
    ],
    distributor: 'ClimaSoluciones',
    date: 'Marzo 2024',
  },
  {
    id: 3,
    name: 'Residencia Los Robles',
    location: 'Querétaro, México',
    countryFlag: 'MX',
    category: 'RESIDENCIAL',
    product: 'AquaPro R32 8kW',
    metric: '65%',
    metricLabel: 'AHORRO ENERGÉTICO',
    metricColor: '#2a9d8f',
    description: 'Vivienda unifamiliar de 320m² con climatización por aerotermia y suelo radiante.',
    longDescription: 'Instalación completa de sistema aerotérmico en vivienda unifamiliar de lujo con suelo radiante refrescante. Integración con instalación fotovoltaica existente para maximizar ahorro.',
    details: [
      'Equipos: 2× AquaPro R32 8kW',
      'Sistema: Suelo radiante + fancoils',
      'Instalación: Enero 2024',
      'Distribuidor: HVAC Pro México',
    ],
    image: '/product-aeroterm.jpg',
    stats: [
      { label: 'AHORRO', value: '65%' },
      { label: 'SUPERFICIE', value: '320m²' },
      { label: 'PAYBACK', value: '4.1' },
    ],
    distributor: 'HVAC Pro México',
    date: 'Enero 2024',
  },
  {
    id: 4,
    name: 'Centro Logístico Andino',
    location: 'Bogotá, Colombia',
    countryFlag: 'CO',
    category: 'INDUSTRIAL',
    product: 'InduHeat 50kW',
    metric: '58%',
    metricLabel: 'AHORRO ENERGÉTICO',
    metricColor: '#1548a0',
    description: 'Climatización de nave industrial de 2,400m² con sistema de cascada de alta potencia.',
    longDescription: 'Sistema de climatización para centro logístico de 2,400m² utilizando 3 equipos InduHeat 50kW en cascada. Control zonificado con recuperación de calor de máquinas.',
    details: [
      'Equipos: 3× InduHeat 50kW en cascada',
      'Sistema: Conductos + recuperación calor',
      'Instalación: Agosto 2023',
      'Distribuidor: TermoAndina',
    ],
    image: '/product-industrial.jpg',
    stats: [
      { label: 'AHORRO', value: '58%' },
      { label: 'SUPERFICIE', value: '2,400m²' },
      { label: 'PAYBACK', value: '3.5' },
    ],
    distributor: 'TermoAndina',
    date: 'Agosto 2023',
  },
  {
    id: 5,
    name: 'Club de Golf El Lago',
    location: 'Buenos Aires, Argentina',
    countryFlag: 'AR',
    category: 'PISCINAS',
    product: 'PoolHeat 20kW',
    metric: '24°C',
    metricLabel: 'TEMP. ESTABLE',
    metricColor: '#e63946',
    description: 'Climatización de piscina olímpica al aire libre con mantenimiento de temperatura estable.',
    longDescription: 'Sistema de climatización para piscina olímpica al aire libre del Club de Golf El Lago. Mantenimiento de temperatura entre 24-26°C durante todo el año con intercambiador de titanio.',
    details: [
      'Equipos: 4× PoolHeat 20kW',
      'Sistema: Intercambiador titanio, 20-35°C',
      'Instalación: Octubre 2023',
      'Distribuidor: AquaHeat Argentina',
    ],
    image: '/product-piscina.jpg',
    stats: [
      { label: 'TEMPERATURA', value: '24°C' },
      { label: 'VOLUMEN', value: '1,250m³' },
      { label: 'EQUIPOS', value: '4' },
    ],
    distributor: 'AquaHeat Argentina',
    date: 'Octubre 2023',
  },
  {
    id: 6,
    name: 'Edificio Corporativo Nexus',
    location: 'Lima, Perú',
    countryFlag: 'PE',
    category: 'COMERCIAL',
    product: 'AquaPro R32 12kW',
    metric: '3.1',
    metricLabel: 'AÑOS ROI',
    metricColor: '#1548a0',
    description: 'Climatización de oficinas de 1,800m² con sistema aerotérmico y ACS para 120 empleados.',
    longDescription: 'Instalación de sistema aerotérmico para edificio corporativo de 8 pisos. Sistema integrado de climatización y producción de ACS para 120 empleados.',
    details: [
      'Equipos: 5× AquaPro R32 12kW',
      'Sistema: Fancoils + ACS centralizada',
      'Instalación: Febrero 2024',
      'Distribuidor: TermoAndina Perú',
    ],
    image: '/product-aeroterm.jpg',
    stats: [
      { label: 'ROI', value: '3.1 años' },
      { label: 'SUPERFICIE', value: '1,800m²' },
      { label: 'EMPLEADOS', value: '120' },
    ],
    distributor: 'TermoAndina Perú',
    date: 'Febrero 2024',
  },
  {
    id: 7,
    name: 'Vivienda Unifamiliar Altura',
    location: 'Puerto Varas, Chile',
    countryFlag: 'CL',
    category: 'RESIDENCIAL',
    product: 'AquaPro R32 8kW',
    metric: 'COP 4.7',
    metricLabel: 'COP REAL',
    metricColor: '#2a9d8f',
    description: 'Casa de 200m² en zona fría con sistema aerotérmico monoblock R32.',
    longDescription: 'Vivienda unifamiliar en la Patagonia chilena donde el frío intenso hacía inviable la climatización tradicional. El sistema AquaPro R32 demostró un COP real de 4.7 incluso a -7°C.',
    details: [
      'Equipos: 1× AquaPro R32 8kW',
      'Sistema: Monoblock + suelo radiante',
      'Instalación: Junio 2023',
      'Distribuidor: Energía Verde Chile',
    ],
    image: '/product-aeroterm.jpg',
    stats: [
      { label: 'COP REAL', value: '4.7' },
      { label: 'SUPERFICIE', value: '200m²' },
      { label: 'AHORRO', value: '70%' },
    ],
    distributor: 'Energía Verde Chile',
    date: 'Junio 2023',
  },
];

const aggregateStats = [
  { number: '120+', label: 'PROYECTOS INSTALADOS' },
  { number: '68%', label: 'AHORRO PROMEDIO' },
  { number: '5', label: 'PAÍSES' },
  { number: '3.5', label: 'AÑOS PAYBACK PROMEDIO' },
];

const flagEmoji: Record<string, string> = {
  CL: '🇨🇱', MX: '🇲🇽', CO: '🇨🇴', PE: '🇵🇪', AR: '🇦🇷',
};

/* ─────────────── component ─────────────── */

export default function Casos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('TODOS');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredCases = activeCategory === 'TODOS'
    ? caseStudies.slice(1)
    : caseStudies.slice(1).filter((c) => c.category === activeCategory);

  const featuredCase = caseStudies[0];

  /* Lock body scroll when modal open */
  useEffect(() => {
    if (selectedCase) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCase]);

  /* ─── GSAP animations ─── */
  useGSAP(() => {
    if (!containerRef.current) return;

    /* Hero */
    gsap.to('.casos-hero-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 });
    gsap.to('.casos-hero-title', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.4 });
    gsap.to('.casos-hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 });
    gsap.to('.casos-filter-pill', {
      opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.8,
    });

    /* Section headers */
    gsap.utils.toArray<HTMLElement>('.casos-section-header').forEach((header) => {
      gsap.from(header.children, {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: header, start: 'top 85%', once: true },
      });
    });

    /* Featured case */
    gsap.from('.casos-featured-image', {
      x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.casos-featured', start: 'top 80%', once: true },
    });
    gsap.from('.casos-featured-content', {
      x: 40, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.casos-featured', start: 'top 80%', once: true },
    });
    gsap.from('.casos-featured-metric', {
      y: 20, opacity: 0, duration: 0.6, stagger: 0.15, delay: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: '.casos-featured', start: 'top 80%', once: true },
    });

    /* Case study cards */
    gsap.from('.casos-card', {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.casos-grid', start: 'top 80%', once: true },
    });

    /* Stats bar */
    gsap.from('.casos-stat-number', {
      y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.casos-stats-bar', start: 'top 85%', once: true },
    });
    gsap.from('.casos-stat-label', {
      y: 15, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power3.out',
      scrollTrigger: { trigger: '.casos-stats-bar', start: 'top 85%', once: true },
    });
  }, { scope: containerRef });

  const handleFilter = useCallback((cat: Category) => {
    setActiveCategory(cat);
  }, []);

  const openCase = useCallback((c: CaseStudy) => {
    setSelectedCase(c);
  }, []);

  const closeCase = useCallback(() => {
    setSelectedCase(null);
  }, []);

  return (
    <Layout>
      <div ref={containerRef}>
        {/* ═══════════════ SECTION 1: PAGE HEADER ═══════════════ */}
        <section
          style={{
            backgroundColor: '#0f0f12',
            paddingTop: 'clamp(7rem, 10vw, 10rem)',
            paddingBottom: 'clamp(3rem, 5vw, 5rem)',
          }}
        >
          <div className="container-tp">
            {/* Eyebrow */}
            <div className="casos-hero-eyebrow opacity-0 translate-y-4 flex items-center" style={{ gap: '0.75rem' }}>
              <div style={{ width: '2rem', height: '2px', backgroundColor: '#e63946' }} />
              <span
                className="uppercase"
                style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em', color: '#2a9d8f' }}
              >
                CASOS DE ÉXITO
              </span>
            </div>

            {/* Title */}
            <h1
              className="casos-hero-title opacity-0 translate-y-8 uppercase"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                color: '#ffffff',
                marginTop: '1.5rem',
                whiteSpace: 'pre-line',
              }}
            >
              {'RESULTADOS REALES,\nAHORRO MEDIBLE'}
            </h1>

            {/* Subtitle */}
            <p
              className="casos-hero-subtitle opacity-0 translate-y-4"
              style={{
                fontSize: '1.1rem',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '600px',
                marginTop: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              Proyectos de climatización con bombas de calor ThermaPro en Latinoamérica. Datos verificados y métricas de desempeño.
            </p>

            {/* Filter pills */}
            <div className="flex flex-wrap" style={{ gap: '0.75rem', marginTop: '2rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className="casos-filter-pill opacity-0 scale-95 transition-all duration-200"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: activeCategory === cat ? '#1548a0' : 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 2: FEATURED CASE ═══════════════ */}
        <section
          style={{ backgroundColor: '#ffffff', paddingTop: '5rem', paddingBottom: '5rem' }}
        >
          <div className="container-tp">
            <div className="casos-featured grid grid-cols-1 lg:grid-cols-12" style={{ gap: '3rem' }}>
              {/* Image */}
              <div className="casos-featured-image lg:col-span-7 relative overflow-hidden" style={{ borderRadius: '8px' }}>
                <div
                  className="w-full relative"
                  style={{ aspectRatio: '16/10', borderRadius: '8px', overflow: 'hidden' }}
                >
                  <img
                    src={featuredCase.image}
                    alt={featuredCase.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-4 left-4 uppercase"
                    style={{
                      backgroundColor: 'rgba(21,72,160,0.9)',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '4px',
                    }}
                  >
                    {featuredCase.category}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="casos-featured-content lg:col-span-5 flex flex-col justify-center">
                <div
                  className="uppercase flex items-center"
                  style={{ fontSize: '0.8rem', fontWeight: 500, color: '#2a9d8f', letterSpacing: '0.05em' }}
                >
                  <MapPin size={14} style={{ marginRight: '0.35rem' }} />
                  {flagEmoji[featuredCase.countryFlag]} {featuredCase.location}
                </div>
                <h2
                  className="uppercase"
                  style={{
                    fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)',
                    fontWeight: 800,
                    color: '#1a1a2e',
                    marginTop: '0.5rem',
                  }}
                >
                  {featuredCase.name}
                </h2>
                <p style={{ fontSize: '1rem', color: '#4a5568', marginTop: '1rem', lineHeight: 1.6 }}>
                  {featuredCase.longDescription}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap" style={{ gap: '2rem', marginTop: '2rem' }}>
                  {featuredCase.stats.map((stat) => (
                    <div key={stat.label} className="casos-featured-metric">
                      <div
                        style={{
                          fontSize: '2rem',
                          fontWeight: 900,
                          color: stat.label === 'AHORRO ENERGÉTICO' ? '#2a9d8f' : stat.label === 'DEPARTAMENTOS' ? '#1548a0' : '#e63946',
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="uppercase"
                        style={{ fontSize: '0.7rem', fontWeight: 500, color: '#4a5568', letterSpacing: '0.05em' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Details */}
                <div className="flex flex-col" style={{ gap: '0.75rem', marginTop: '2rem' }}>
                  {featuredCase.details.map((detail) => (
                    <div key={detail} className="flex items-center" style={{ gap: '0.75rem' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2a9d8f', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: '#4a5568' }}>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => openCase(featuredCase)}
                  className="inline-flex items-center transition-all duration-200 link-underline"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#e63946',
                    textTransform: 'uppercase',
                    marginTop: '2rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                  }}
                >
                  VER PROYECTO COMPLETO <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 3: CASE STUDY GRID ═══════════════ */}
        <section
          style={{
            backgroundColor: '#f8f9fa',
            paddingTop: '5rem',
            paddingBottom: 'clamp(5rem, 8vw, 8rem)',
          }}
        >
          <div className="container-tp">
            <div className="casos-section-header" style={{ marginBottom: '3rem' }}>
              <div className="flex items-center" style={{ gap: '0.75rem' }}>
                <div style={{ width: '2rem', height: '2px', backgroundColor: '#e63946' }} />
                <span
                  className="uppercase"
                  style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em', color: '#2a9d8f' }}
                >
                  MÁS PROYECTOS
                </span>
              </div>
              <h2
                className="uppercase"
                style={{
                  fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#1a1a2e',
                  marginTop: '1rem',
                }}
              >
                INSTALACIONES EN TODA LATINOAMÉRICA
              </h2>
            </div>

            <div className="casos-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '2rem' }}>
              {filteredCases.map((c) => (
                <div
                  key={c.id}
                  className="casos-card group cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                  }}
                  onClick={() => openCase(c)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '16/10' }}
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-400"
                      style={{ transitionDuration: '400ms' }}
                    />
                    <div
                      className="absolute bottom-3 left-3 uppercase"
                      style={{
                        backgroundColor: 'rgba(21,72,160,0.9)',
                        color: '#ffffff',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                      }}
                    >
                      {c.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <div
                      className="uppercase flex items-center"
                      style={{ fontSize: '0.75rem', fontWeight: 500, color: '#2a9d8f', letterSpacing: '0.05em' }}
                    >
                      {flagEmoji[c.countryFlag]} {c.location}
                    </div>
                    <h3
                      className="uppercase"
                      style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginTop: '0.5rem' }}
                    >
                      {c.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#4a5568',
                        marginTop: '0.5rem',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {c.description}
                    </p>

                    <div className="flex items-end justify-between" style={{ marginTop: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: c.metricColor }}>{c.metric}</div>
                        <div
                          className="uppercase"
                          style={{ fontSize: '0.65rem', fontWeight: 500, color: '#4a5568', letterSpacing: '0.05em' }}
                        >
                          {c.metricLabel}
                        </div>
                      </div>
                      <span
                        className="uppercase transition-colors duration-200"
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#e63946',
                          letterSpacing: '0.05em',
                        }}
                      >
                        VER CASO →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCases.length === 0 && (
              <div className="text-center py-16">
                <p style={{ color: '#4a5568', fontSize: '1rem' }}>
                  No hay casos disponibles en esta categoría.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════ SECTION 4: STATS BAR ═══════════════ */}
        <section
          className="casos-stats-bar"
          style={{
            background: 'linear-gradient(135deg, #1548a0 0%, #2a9d8f 100%)',
            paddingTop: '5rem',
            paddingBottom: '5rem',
          }}
        >
          <div className="container-tp">
            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '2rem' }}>
              {aggregateStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="casos-stat-number"
                    style={{
                      fontSize: 'clamp(2.5rem, 4vw, 5rem)',
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="casos-stat-label uppercase"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: '0.5rem',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════ CASE DETAIL MODAL ═══════════════ */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '1.5rem' }}
          onClick={closeCase}
        >
          <div
            className="relative w-full overflow-y-auto"
            style={{
              maxWidth: '900px',
              maxHeight: '90vh',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeCase}
              className="absolute top-4 right-4 z-10 flex items-center justify-center transition-all duration-200"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.9)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X size={20} color="#1a1a2e" />
            </button>

            {/* Modal image */}
            <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
              <img
                src={selectedCase.image}
                alt={selectedCase.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal content */}
            <div style={{ padding: 'clamp(1.5rem, 3vw, 3rem)' }}>
              {/* Category + location */}
              <div className="flex flex-wrap items-center" style={{ gap: '1rem' }}>
                <span
                  className="uppercase"
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#ffffff',
                    backgroundColor: '#1548a0',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                  }}
                >
                  {selectedCase.category}
                </span>
                <span
                  className="uppercase flex items-center"
                  style={{ fontSize: '0.8rem', fontWeight: 500, color: '#2a9d8f', letterSpacing: '0.05em' }}
                >
                  <MapPin size={14} style={{ marginRight: '0.35rem' }} />
                  {flagEmoji[selectedCase.countryFlag]} {selectedCase.location}
                </span>
              </div>

              {/* Title */}
              <h2
                className="uppercase"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#1a1a2e',
                  marginTop: '1rem',
                }}
              >
                {selectedCase.name}
              </h2>

              {/* Description */}
              <p style={{ fontSize: '1rem', color: '#4a5568', lineHeight: 1.7, marginTop: '1rem' }}>
                {selectedCase.longDescription}
              </p>

              {/* Stats */}
              <div
                className="grid grid-cols-3"
                style={{
                  gap: '1.5rem',
                  marginTop: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                }}
              >
                {selectedCase.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: selectedCase.metricColor }}>
                      {stat.value}
                    </div>
                    <div
                      className="uppercase"
                      style={{ fontSize: '0.65rem', fontWeight: 500, color: '#4a5568', letterSpacing: '0.05em', marginTop: '0.25rem' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '2rem', marginTop: '2rem' }}>
                {/* Technical details */}
                <div>
                  <h4
                    className="uppercase flex items-center"
                    style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a1a2e', letterSpacing: '0.08em', marginBottom: '1rem' }}
                  >
                    <Thermometer size={16} style={{ marginRight: '0.5rem', color: '#1548a0' }} />
                    DETALLES TÉCNICOS
                  </h4>
                  <div className="flex flex-col" style={{ gap: '0.75rem' }}>
                    {selectedCase.details.map((d) => (
                      <div key={d} className="flex items-start" style={{ gap: '0.5rem' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2a9d8f', marginTop: '0.4rem', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.9rem', color: '#4a5568' }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project info */}
                <div>
                  <h4
                    className="uppercase flex items-center"
                    style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a1a2e', letterSpacing: '0.08em', marginBottom: '1rem' }}
                  >
                    <Calendar size={16} style={{ marginRight: '0.5rem', color: '#1548a0' }} />
                    INFO DEL PROYECTO
                  </h4>
                  <div className="flex flex-col" style={{ gap: '0.75rem' }}>
                    <div className="flex items-center" style={{ gap: '0.5rem' }}>
                      <Users size={14} style={{ color: '#4a5568', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                        <strong style={{ color: '#1a1a2e' }}>Distribuidor:</strong> {selectedCase.distributor}
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: '0.5rem' }}>
                      <Calendar size={14} style={{ color: '#4a5568', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                        <strong style={{ color: '#1a1a2e' }}>Fecha:</strong> {selectedCase.date}
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: '0.5rem' }}>
                      <Thermometer size={14} style={{ color: '#4a5568', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                        <strong style={{ color: '#1a1a2e' }}>Producto:</strong> {selectedCase.product}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
                <a
                  href="/contacto"
                  className="inline-flex items-center transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
                  style={{
                    backgroundColor: '#e63946',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    padding: '14px 32px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >
                  SOLICITAR INFO DE ESTE PROYECTO <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
