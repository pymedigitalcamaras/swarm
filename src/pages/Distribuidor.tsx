import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Tag,
  GraduationCap,
  Headphones,
  BarChart3,
  Shield,
  MapPin,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import Layout from '@/components/Layout';
import { useLeads } from '@/hooks/useLeads';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── data ─────────────── */

const benefitCards = [
  {
    icon: Tag,
    iconBg: 'rgba(230,57,70,0.1)',
    iconColor: '#e63946',
    title: 'PRECIOS EXCLUSIVOS',
    description: 'Hasta un 40% de descuento sobre lista de instalador. Precios diferenciados por volumen y categoría de distribuidor.',
    highlight: 'Desde 35% de margen bruto',
  },
  {
    icon: GraduationCap,
    iconBg: 'rgba(42,157,143,0.1)',
    iconColor: '#2a9d8f',
    title: 'FORMACIÓN CERTIFICADA',
    description: 'Cursos online y presenciales: selección de equipos, instalación, puesta en marcha, diagnóstico y mantenimiento.',
    highlight: 'Certificación oficial incluida',
  },
  {
    icon: Headphones,
    iconBg: 'rgba(21,72,160,0.1)',
    iconColor: '#022067',
    title: 'SOPORTE TÉCNICO DEDICADO',
    description: 'Línea directa con ingenieros especializados. Respuesta en menos de 24 horas. Soporte en instalación y post-venta.',
    highlight: 'Canal WhatsApp directo',
  },
  {
    icon: BarChart3,
    iconBg: 'rgba(230,57,70,0.1)',
    iconColor: '#e63946',
    title: 'HERRAMIENTAS DE VENTA',
    description: 'Calculadoras de ahorro, fichas técnicas personalizables, presentaciones para clientes finales y material de marketing.',
    highlight: 'Todo listo para usar',
  },
  {
    icon: Shield,
    iconBg: 'rgba(42,157,143,0.1)',
    iconColor: '#2a9d8f',
    title: 'GARANTÍA EXTENDIDA',
    description: 'Garantía de 5 años en equipos para distribuidores certificados, extensible a 7 años con programa de mantenimiento.',
    highlight: '5–7 años de cobertura',
  },
  {
    icon: MapPin,
    iconBg: 'rgba(21,72,160,0.1)',
    iconColor: '#022067',
    title: 'LEADS DE TU ZONA',
    description: 'Derivamos consultas de tu región directamente a ti. Acceso a portal de oportunidades y lista de proyectos en desarrollo.',
    highlight: 'Oportunidades certificadas',
  },
];

const steps = [
  {
    number: '1',
    title: 'REGÍSTRATE EN EL PROGRAMA',
    description: 'Completa el formulario de aplicación con los datos de tu empresa. Revisamos tu perfil en 24–48 horas.',
    detail: 'Sin costo de inscripción',
  },
  {
    number: '2',
    title: 'CAPACÍTATE CERTIFÍCATE',
    description: 'Accede a nuestra plataforma de formación online. Completa los módulos técnicos y obtén tu certificación oficial.',
    detail: 'Formación gratuita incluida',
  },
  {
    number: '3',
    title: 'COMPRA A PRECIO DISTRIBUIDOR',
    description: 'Accede a tu lista de precios exclusivos. Realiza pedidos directamente desde el portal con envío a tu país.',
    detail: 'Hasta 40% de descuento',
  },
  {
    number: '4',
    title: 'CRECE CON NUESTRO APOYO',
    description: 'Recibe leads de tu zona, accede a herramientas de venta y cuenta con soporte técnico dedicado para cada proyecto.',
    detail: 'Soporte continuo garantizado',
  },
];

const testimonials = [
  {
    quote: 'En menos de 6 meses duplicamos nuestra facturación de climatización. El soporte técnico de ThermaPro es el diferenciador: responden en horas, no en días.',
    author: 'Carlos Mendoza',
    role: 'Director, ClimaSoluciones',
    location: 'Ciudad de México',
    flag: 'MX',
  },
  {
    quote: 'Los precios de distribuidor nos permiten competir con las grandes marcas y mantener márgenes saludables. La formación técnica nos dio credibilidad desde el primer proyecto.',
    author: 'Andrea Vásquez',
    role: 'Ingeniera, Energía Verde Chile',
    location: 'Santiago',
    flag: 'CL',
  },
  {
    quote: 'Derivan leads calificados de nuestra zona. En el primer trimestre cerramos 4 proyectos residenciales que nos llegaron directamente desde ThermaPro.',
    author: 'Roberto Díaz',
    role: 'Gerente, TermoAndina',
    location: 'Lima',
    flag: 'PE',
  },
];

/* ─────────────── component ─────────────── */

export default function Distribuidor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createLead, isSubmitting } = useLeads();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    pais: '',
    ciudad: '',
    tipoEmpresa: '',
    proyectosAno: '',
    experiencia: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  }, []);

  const validate = useCallback(() => {
    const required = ['nombre', 'email', 'telefono', 'empresa', 'pais', 'ciudad', 'tipoEmpresa', 'proyectosAno'];
    const newErrors: Record<string, boolean> = {};
    let valid = true;
    required.forEach((field) => {
      if (!formData[field as keyof typeof formData]?.trim()) {
        newErrors[field] = true;
        valid = false;
      }
    });
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = true;
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await createLead({
      name: formData.nombre,
      email: formData.email,
      phone: formData.telefono,
      company: formData.empresa,
      country: formData.pais,
      city: formData.ciudad,
      message: `Tipo: ${formData.tipoEmpresa} | Proyectos/año: ${formData.proyectosAno} | Experiencia: ${formData.experiencia} | Mensaje: ${formData.mensaje}`,
      source: 'distribuidor',
    });

    if (success) {
      setFormState('success');
    }
  }, [validate, createLead, formData]);

  /* ─── GSAP animations ─── */
  useGSAP(() => {
    if (!containerRef.current) return;

    /* Hero elements */
    gsap.to('.dist-hero-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 });
    gsap.to('.dist-hero-title', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.4 });
    gsap.to('.dist-hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 });
    gsap.to('.dist-hero-stat', {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.8,
    });
    gsap.to('.dist-hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 1.0 });

    /* Section headers */
    gsap.utils.toArray<HTMLElement>('.dist-section-header').forEach((header) => {
      gsap.from(header.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: header, start: 'top 85%', once: true },
      });
    });

    /* Benefit cards */
    gsap.from('.dist-benefit-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.dist-benefits-grid', start: 'top 80%', once: true },
    });

    /* Timeline */
    gsap.from('.dist-timeline-line', {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.dist-timeline', start: 'top 80%', once: true },
    });
    gsap.from('.dist-step-number', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.dist-timeline', start: 'top 75%', once: true },
    });
    gsap.from('.dist-step-content', {
      x: (i: number) => (i % 2 === 0 ? -40 : 40),
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.dist-timeline', start: 'top 75%', once: true },
    });

    /* Testimonials */
    gsap.from('.dist-testimonial-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.dist-testimonials-grid', start: 'top 80%', once: true },
    });

    /* Form */
    gsap.from('.dist-form-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.dist-form-section', start: 'top 80%', once: true },
    });
    gsap.from('.dist-form-field', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.dist-form-card', start: 'top 80%', once: true },
    });
  }, { scope: containerRef });

  return (
    <Layout>
      <div ref={containerRef}>
        {/* ═══════════════ SECTION 1: HERO ═══════════════ */}
        <section
          className="relative"
          style={{
            backgroundColor: '#0f0f12',
            paddingTop: 'clamp(8rem, 12vw, 12rem)',
            paddingBottom: 'clamp(4rem, 6vw, 6rem)',
          }}
        >
          <div className="container-tp text-center" style={{ maxWidth: '900px' }}>
            {/* Eyebrow */}
            <div className="dist-hero-eyebrow opacity-0 translate-y-4 flex flex-col items-center">
              <div style={{ width: '3rem', height: '2px', backgroundColor: '#e63946', marginBottom: '1rem' }} />
              <span
                className="uppercase"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: '#2a9d8f',
                }}
              >
                PROGRAMA DE DISTRIBUIDORES
              </span>
            </div>

            {/* Title */}
            <h1
              className="dist-hero-title opacity-0 translate-y-8 uppercase"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                color: '#ffffff',
                marginTop: '1.5rem',
              }}
            >
              CONVIÉRTE EN DISTRIBUIDOR OFICIAL
            </h1>

            {/* Subtitle */}
            <p
              className="dist-hero-subtitle opacity-0 translate-y-4"
              style={{
                fontSize: '1.15rem',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.75)',
                maxWidth: '640px',
                margin: '1.5rem auto 0',
              }}
            >
              Accede a precios exclusivos, formación certificada, herramientas de venta y el respaldo de un equipo de ingeniería dedicado a hacer crecer tu negocio.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 flex-wrap" style={{ marginTop: '3rem' }}>
              {[
                { number: '40%', label: 'MÁXIMO DESCUENTO' },
                { number: '500+', label: 'DISTRIBUIDORES ACTIVOS' },
                { number: '24h', label: 'RESPUESTA DE INGENIERÍA' },
              ].map((stat) => (
                <div key={stat.label} className="dist-hero-stat opacity-0 translate-y-4 text-center">
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>{stat.number}</div>
                  <div
                    className="uppercase"
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="dist-hero-cta opacity-0 translate-y-4" style={{ marginTop: '3rem' }}>
              <a
                href="#formulario"
                className="inline-block transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
                style={{
                  backgroundColor: '#e63946',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '18px 40px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                }}
              >
                POSTULARME AHORA &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 2: BENEFITS ═══════════════ */}
        <section
          style={{
            backgroundColor: '#f8f9fa',
            paddingTop: 'clamp(5rem, 8vw, 8rem)',
            paddingBottom: 'clamp(5rem, 8vw, 8rem)',
          }}
        >
          <div className="container-tp">
            {/* Section header */}
            <div className="dist-section-header text-center" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
              <div className="flex flex-col items-center">
                <div style={{ width: '2rem', height: '2px', backgroundColor: '#e63946', marginBottom: '1rem' }} />
                <span
                  className="uppercase"
                  style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em', color: '#2a9d8f' }}
                >
                  BENEFICIOS EXCLUSIVOS
                </span>
              </div>
              <h2
                className="uppercase"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 4rem)',
                  fontWeight: 800,
                  color: '#1a1a2e',
                  marginTop: '1rem',
                }}
              >
                TODO LO QUE NECESITAS PARA VENDER MÁS
              </h2>
            </div>

            {/* Cards grid */}
            <div className="dist-benefits-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '2rem' }}>
              {benefitCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="dist-benefit-card group transition-all duration-300"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '2.5rem',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#022067';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: '3rem',
                        height: '3rem',
                        backgroundColor: card.iconBg,
                        borderRadius: '8px',
                      }}
                    >
                      <Icon size={20} style={{ color: card.iconColor }} />
                    </div>
                    <h3
                      className="uppercase"
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#1a1a2e',
                        marginTop: '1.5rem',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', fontWeight: 400, color: '#4a5568', marginTop: '0.75rem', lineHeight: 1.6 }}>
                      {card.description}
                    </p>
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2a9d8f', marginTop: '0.75rem' }}>
                      {card.highlight}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 3: HOW IT WORKS ═══════════════ */}
        <section
          style={{
            backgroundColor: '#ffffff',
            paddingTop: 'clamp(5rem, 8vw, 8rem)',
            paddingBottom: 'clamp(5rem, 8vw, 8rem)',
          }}
        >
          <div className="container-tp" style={{ maxWidth: '1000px' }}>
            {/* Section header */}
            <div className="dist-section-header text-center" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
              <div className="flex flex-col items-center">
                <div style={{ width: '2rem', height: '2px', backgroundColor: '#e63946', marginBottom: '1rem' }} />
                <span
                  className="uppercase"
                  style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em', color: '#2a9d8f' }}
                >
                  PROCESO SIMPLE
                </span>
              </div>
              <h2
                className="uppercase"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#1a1a2e',
                  marginTop: '1rem',
                }}
              >
                4 PASOS PARA EMPEZAR
              </h2>
            </div>

            {/* Timeline */}
            <div className="dist-timeline relative">
              {/* Vertical line - desktop only */}
              <div
                className="dist-timeline-line hidden lg:block"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  backgroundColor: '#e2e8f0',
                  transform: 'translateX(-50%)',
                }}
              />

              <div className="flex flex-col" style={{ gap: '4rem' }}>
                {steps.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div
                      key={step.number}
                      className="dist-step-content relative flex flex-col lg:flex-row items-center"
                    >
                      {/* Number circle on timeline */}
                      <div
                        className="dist-step-number flex-shrink-0 flex items-center justify-center z-10 sm:mb-0 mb-4"
                        style={{
                          width: '3rem',
                          height: '3rem',
                          borderRadius: '50%',
                          backgroundColor: '#022067',
                          color: '#ffffff',
                          fontSize: '1.2rem',
                          fontWeight: 900,
                        }}
                      >
                        {step.number}
                      </div>

                      {/* Content card */}
                      <div
                        className="flex-1"
                        style={{
                          marginLeft: isLeft ? 0 : '2rem',
                          marginRight: isLeft ? '2rem' : 0,
                          textAlign: isLeft ? 'right' : 'left',
                        }}
                      >
                        <div className="lg:hidden">
                          <h3
                            className="uppercase"
                            style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a2e' }}
                          >
                            {step.title}
                          </h3>
                          <p style={{ fontSize: '0.95rem', color: '#4a5568', marginTop: '0.5rem', lineHeight: 1.6 }}>
                            {step.description}
                          </p>
                          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2a9d8f', marginTop: '0.5rem' }}>
                            {step.detail}
                          </p>
                        </div>
                        <div
                          className="hidden lg:block"
                          style={{
                            textAlign: isLeft ? 'right' : 'left',
                            paddingLeft: isLeft ? 0 : '2rem',
                            paddingRight: isLeft ? '2rem' : 0,
                          }}
                        >
                          <h3
                            className="uppercase"
                            style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a2e' }}
                          >
                            {step.title}
                          </h3>
                          <p style={{ fontSize: '0.95rem', color: '#4a5568', marginTop: '0.5rem', lineHeight: 1.6 }}>
                            {step.description}
                          </p>
                          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2a9d8f', marginTop: '0.5rem' }}>
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 4: TESTIMONIALS ═══════════════ */}
        <section
          style={{
            backgroundColor: '#0f0f12',
            paddingTop: 'clamp(5rem, 8vw, 8rem)',
            paddingBottom: 'clamp(5rem, 8vw, 8rem)',
          }}
        >
          <div className="container-tp">
            {/* Section header */}
            <div className="dist-section-header text-center" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
              <div className="flex flex-col items-center">
                <div style={{ width: '2rem', height: '2px', backgroundColor: '#e63946', marginBottom: '1rem' }} />
                <span
                  className="uppercase"
                  style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em', color: '#2a9d8f' }}
                >
                  TESTIMONIOS
                </span>
              </div>
              <h2
                className="uppercase"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginTop: '1rem',
                }}
              >
                DISTRIBUIDORES QUE YA CRECIERON
              </h2>
            </div>

            {/* Testimonial cards */}
            <div className="dist-testimonials-grid grid grid-cols-1 lg:grid-cols-3" style={{ gap: '2rem' }}>
              {testimonials.map((t) => (
                <div
                  key={t.author}
                  className="dist-testimonial-card"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    padding: '2.5rem',
                  }}
                >
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: '#2a9d8f', lineHeight: 0.5, marginBottom: '1.5rem' }}>
                    &ldquo;
                  </div>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.6,
                    }}
                  >
                    {t.quote}
                  </p>
                  <div style={{ marginTop: '2rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>{t.author}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 400, color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>
                      {t.role}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>
                      {t.flag === 'MX' && '🇲🇽'} {t.flag === 'CL' && '🇨🇱'} {t.flag === 'PE' && '🇵🇪'} {t.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 5: APPLICATION FORM ═══════════════ */}
        <section
          id="formulario"
          className="dist-form-section"
          style={{
            backgroundColor: '#f8f9fa',
            paddingTop: 'clamp(5rem, 8vw, 8rem)',
            paddingBottom: 'clamp(5rem, 8vw, 8rem)',
          }}
        >
          <div className="container-tp" style={{ maxWidth: '700px' }}>
            {/* Section header */}
            <div className="dist-section-header text-center" style={{ marginBottom: 'clamp(3rem, 4vw, 4rem)' }}>
              <div className="flex flex-col items-center">
                <div style={{ width: '2rem', height: '2px', backgroundColor: '#e63946', marginBottom: '1rem' }} />
                <span
                  className="uppercase"
                  style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em', color: '#2a9d8f' }}
                >
                  POSTULAR
                </span>
              </div>
              <h2
                className="uppercase"
                style={{
                  fontSize: 'clamp(2rem, 3vw, 3rem)',
                  fontWeight: 800,
                  color: '#1a1a2e',
                  marginTop: '1rem',
                }}
              >
                SOLICITA TU ADMISIÓN
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 400,
                  color: '#4a5568',
                  marginTop: '1rem',
                  textAlign: 'center',
                }}
              >
                Completa el formulario. Revisaremos tu perfil y te contactaremos en 24–48 horas.
              </p>
            </div>

            {/* Form card */}
            <div
              className="dist-form-card"
              style={{
                backgroundColor: '#ffffff',
                padding: 'clamp(1.5rem, 3vw, 3rem)',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}
            >
              {formState === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} style={{ color: '#2a9d8f', margin: '0 auto' }} />
                  <h3
                    className="uppercase"
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#2a9d8f',
                      marginTop: '1.5rem',
                    }}
                  >
                    ¡SOLICITUD ENVIADA!
                  </h3>
                  <p style={{ color: '#4a5568', marginTop: '0.75rem' }}>
                    Hemos recibido tu solicitud. Te contactaremos pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '1.5rem' }}>
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.5rem' }}>
                    <div className="dist-form-field">
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>
                        Nombre completo <span style={{ color: '#e63946' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full transition-all duration-200"
                        style={{
                          fontSize: '0.95rem',
                          backgroundColor: '#f8f9fa',
                          border: `1px solid ${errors.nombre ? '#e63946' : '#e2e8f0'}`,
                          borderRadius: '6px',
                          padding: '12px 16px',
                          outline: 'none',
                        }}
                        onFocus={(e) => { if (!errors.nombre) e.currentTarget.style.borderColor = '#022067'; }}
                        onBlur={(e) => { if (!errors.nombre) e.currentTarget.style.borderColor = '#e2e8f0'; }}
                      />
                    </div>
                    <div className="dist-form-field">
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>
                        Empresa <span style={{ color: '#e63946' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        placeholder="Nombre de tu empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full transition-all duration-200"
                        style={{
                          fontSize: '0.95rem',
                          backgroundColor: '#f8f9fa',
                          border: `1px solid ${errors.empresa ? '#e63946' : '#e2e8f0'}`,
                          borderRadius: '6px',
                          padding: '12px 16px',
                          outline: 'none',
                        }}
                        onFocus={(e) => { if (!errors.empresa) e.currentTarget.style.borderColor = '#022067'; }}
                        onBlur={(e) => { if (!errors.empresa) e.currentTarget.style.borderColor = '#e2e8f0'; }}
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.5rem' }}>
                    <div className="dist-form-field">
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>
                        Email <span style={{ color: '#e63946' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full transition-all duration-200"
                        style={{
                          fontSize: '0.95rem',
                          backgroundColor: '#f8f9fa',
                          border: `1px solid ${errors.email ? '#e63946' : '#e2e8f0'}`,
                          borderRadius: '6px',
                          padding: '12px 16px',
                          outline: 'none',
                        }}
                        onFocus={(e) => { if (!errors.email) e.currentTarget.style.borderColor = '#022067'; }}
                        onBlur={(e) => { if (!errors.email) e.currentTarget.style.borderColor = '#e2e8f0'; }}
                      />
                    </div>
                    <div className="dist-form-field">
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>
                        Teléfono <span style={{ color: '#e63946' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        placeholder="+56 9 1234 5678"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full transition-all duration-200"
                        style={{
                          fontSize: '0.95rem',
                          backgroundColor: '#f8f9fa',
                          border: `1px solid ${errors.telefono ? '#e63946' : '#e2e8f0'}`,
                          borderRadius: '6px',
                          padding: '12px 16px',
                          outline: 'none',
                        }}
                        onFocus={(e) => { if (!errors.telefono) e.currentTarget.style.borderColor = '#022067'; }}
                        onBlur={(e) => { if (!errors.telefono) e.currentTarget.style.borderColor = '#e2e8f0'; }}
                      />
                    </div>
                  </div>

                  {/* Row 3: País */}
                  <div className="dist-form-field">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>
                      País <span style={{ color: '#e63946' }}>*</span>
                    </label>
                    <select
                      name="pais"
                      value={formData.pais}
                      onChange={handleChange}
                      className="w-full transition-all duration-200"
                      style={{
                        fontSize: '0.95rem',
                        backgroundColor: '#f8f9fa',
                        border: `1px solid ${errors.pais ? '#e63946' : '#e2e8f0'}`,
                        borderRadius: '6px',
                        padding: '12px 16px',
                        outline: 'none',
                        appearance: 'none',
                      }}
                    >
                      <option value="">Selecciona tu país</option>
                      <option value="Chile">Chile</option>
                      <option value="México">México</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Perú">Perú</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  {/* Row 4: Ciudad */}
                  <div className="dist-form-field">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>
                      Ciudad / Región <span style={{ color: '#e63946' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="ciudad"
                      placeholder="Tu ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      className="w-full transition-all duration-200"
                      style={{
                        fontSize: '0.95rem',
                        backgroundColor: '#f8f9fa',
                        border: `1px solid ${errors.ciudad ? '#e63946' : '#e2e8f0'}`,
                        borderRadius: '6px',
                        padding: '12px 16px',
                        outline: 'none',
                      }}
                      onFocus={(e) => { if (!errors.ciudad) e.currentTarget.style.borderColor = '#022067'; }}
                      onBlur={(e) => { if (!errors.ciudad) e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    />
                  </div>

                  {/* Row 5: Tipo empresa */}
                  <div className="dist-form-field">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>
                      ¿Qué tipo de empresa eres? <span style={{ color: '#e63946' }}>*</span>
                    </label>
                    <select
                      name="tipoEmpresa"
                      value={formData.tipoEmpresa}
                      onChange={handleChange}
                      className="w-full transition-all duration-200"
                      style={{
                        fontSize: '0.95rem',
                        backgroundColor: '#f8f9fa',
                        border: `1px solid ${errors.tipoEmpresa ? '#e63946' : '#e2e8f0'}`,
                        borderRadius: '6px',
                        padding: '12px 16px',
                        outline: 'none',
                        appearance: 'none',
                      }}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Instalador HVAC">Instalador HVAC</option>
                      <option value="Integrador energético">Integrador energético</option>
                      <option value="Distribuidor de climatización">Distribuidor de climatización</option>
                      <option value="Ingeniería">Ingeniería</option>
                      <option value="Constructora">Constructora</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  {/* Row 6: Proyectos/año */}
                  <div className="dist-form-field">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>
                      ¿Cuántos proyectos de climatización realizas al año? <span style={{ color: '#e63946' }}>*</span>
                    </label>
                    <select
                      name="proyectosAno"
                      value={formData.proyectosAno}
                      onChange={handleChange}
                      className="w-full transition-all duration-200"
                      style={{
                        fontSize: '0.95rem',
                        backgroundColor: '#f8f9fa',
                        border: `1px solid ${errors.proyectosAno ? '#e63946' : '#e2e8f0'}`,
                        borderRadius: '6px',
                        padding: '12px 16px',
                        outline: 'none',
                        appearance: 'none',
                      }}
                    >
                      <option value="">Selecciona un rango</option>
                      <option value="1-5">1 – 5</option>
                      <option value="6-15">6 – 15</option>
                      <option value="16-30">16 – 30</option>
                      <option value="31-50">31 – 50</option>
                      <option value="Más de 50">Más de 50</option>
                    </select>
                  </div>

                  {/* Row 7: Experiencia */}
                  <div className="dist-form-field">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>
                      ¿Tienes experiencia con bombas de calor?
                    </label>
                    <select
                      name="experiencia"
                      value={formData.experiencia}
                      onChange={handleChange}
                      className="w-full transition-all duration-200"
                      style={{
                        fontSize: '0.95rem',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        outline: 'none',
                        appearance: 'none',
                      }}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Sí, instalador certificado">Sí, instalador certificado</option>
                      <option value="Sí, algunos proyectos">Sí, algunos proyectos</option>
                      <option value="No, pero conozco la tecnología">No, pero conozco la tecnología</option>
                      <option value="No experiencia">No experiencia</option>
                    </select>
                  </div>

                  {/* Row 8: Mensaje */}
                  <div className="dist-form-field">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>
                      Mensaje adicional
                    </label>
                    <textarea
                      name="mensaje"
                      rows={4}
                      placeholder="Cuéntanos sobre tu negocio, tu región y por qué quieres distribuir ThermaPro..."
                      value={formData.mensaje}
                      onChange={handleChange}
                      className="w-full transition-all duration-200 resize-none"
                      style={{
                        fontSize: '0.95rem',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="dist-form-field w-full transition-all duration-200 hover:brightness-110 disabled:opacity-70"
                    style={{
                      backgroundColor: '#e63946',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '14px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        ENVIANDO...
                      </span>
                    ) : (
                      'ENVIAR SOLICITUD →'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
