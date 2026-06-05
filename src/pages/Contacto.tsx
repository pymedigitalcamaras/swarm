import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MessageCircle, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLeads } from '@/hooks/useLeads';

gsap.registerPlugin(ScrollTrigger);

/* ── spinner keyframe (scoped to avoid modifying index.css) ── */
const spinnerStyle = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

/* ───────────── data ───────────── */

interface Office {
  flag: string;
  country: string;
  city: string;
  address: string;
  phone: string;
}

const offices: Office[] = [
  {
    flag: '🇨🇱',
    country: 'Chile',
    city: 'Santiago',
    address: 'Av. Apoquindo 5400, Of. 302, Las Condes',
    phone: '+56 2 2345 6789',
  },
  {
    flag: '🇲🇽',
    country: 'México',
    city: 'Ciudad de México',
    address: 'Paseo de la Reforma 342, Piso 8, Juárez',
    phone: '+52 55 1234 5678',
  },
  {
    flag: '🇨🇴',
    country: 'Colombia',
    city: 'Bogotá',
    address: 'Cra. 7 #71-21, Of. 501, Chapinero',
    phone: '+57 1 234 5678',
  },
  {
    flag: '🇵🇪',
    country: 'Perú',
    city: 'Lima',
    address: 'Av. José Larco 880, Of. 401, Miraflores',
    phone: '+51 1 234 5678',
  },
  {
    flag: '🇦🇷',
    country: 'Argentina',
    city: 'Buenos Aires',
    address: 'Av. del Libertador 1000, Piso 3, Retiro',
    phone: '+54 11 2345 6789',
  },
];

interface FormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  pais: string;
  motivo: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  pais?: string;
  motivo?: string;
  mensaje?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

/* ───────────── component ───────────── */

export default function Contacto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createLead, isSubmitting } = useLeads();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    pais: '',
    motivo: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  /* ── validation ── */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    }

    if (!formData.pais) {
      newErrors.pais = 'Selecciona un país';
    }

    if (!formData.motivo) {
      newErrors.motivo = 'Selecciona un motivo';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ── submit handler ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');

    const success = await createLead({
      name: formData.nombre,
      email: formData.email,
      phone: formData.telefono,
      company: formData.empresa,
      country: formData.pais,
      message: `Motivo: ${formData.motivo} | ${formData.mensaje}`,
      source: 'contacto',
    });

    if (success) {
      setStatus('success');
      setFormData({
        nombre: '',
        empresa: '',
        email: '',
        telefono: '',
        pais: '',
        motivo: '',
        mensaje: '',
      });
    } else {
      setStatus('error');
    }
  };

  /* ── input change ── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }

    // Reset status when user starts typing again
    if (status === 'success') {
      setStatus('idle');
    }
  };

  /* ── GSAP animations ── */
  useGSAP(
    () => {
      const easeSmooth = 'power2.out';

      /* hero eyebrow */
      gsap.from('.contact-hero-eyebrow', {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
      });

      /* hero title */
      gsap.from('.contact-hero-title', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      });

      /* hero subtitle */
      gsap.from('.contact-hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: easeSmooth,
        delay: 0.6,
      });

      /* contact cards stagger */
      gsap.from('.contact-channel-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.contact-cards-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* form section header */
      gsap.from('.form-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.form-header',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* form container */
      gsap.from('.form-container', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.form-container',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* offices header */
      gsap.from('.offices-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.offices-header',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* office cards stagger */
      gsap.from('.office-card', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: easeSmooth,
        scrollTrigger: {
          trigger: '.offices-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef },
  );

  /* ── shared input styles ── */
  const inputBaseStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    color: '#1a1a2e',
    backgroundColor: '#ffffff',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    outline: 'none',
  };

  const inputFocusStyle = {
    borderColor: '#022067',
    boxShadow: '0 0 0 3px rgba(21,72,160,0.1)',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#4a5568',
    marginBottom: '0.5rem',
    display: 'block',
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.8rem',
    color: '#e63946',
    marginTop: '0.35rem',
  };

  return (
    <Layout>
      <style>{spinnerStyle}</style>
      <div ref={containerRef}>
        {/* ════════════════════════════════════
            SECTION 1 — Page Header (teal gradient)
        ════════════════════════════════════ */}
        <section
          className="relative"
          style={{
            background: 'linear-gradient(135deg, #022067 0%, #2a9d8f 100%)',
            padding: 'clamp(7rem, 12vw, 10rem) 0 clamp(3rem, 6vw, 5rem)',
          }}
        >
          <div className="container-tp" style={{ maxWidth: '1280px' }}>
            {/* eyebrow */}
            <div className="contact-hero-eyebrow flex items-center gap-3 mb-6">
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
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                CONTÁCTANOS
              </span>
            </div>

            {/* title */}
            <h1
              className="contact-hero-title uppercase"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                lineHeight: 1.05,
                color: '#ffffff',
              }}
            >
              HABLEMOS DE TU PROYECTO
            </h1>

            {/* subtitle */}
            <p
              className="contact-hero-subtitle"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '620px',
                marginTop: '1.5rem',
                lineHeight: 1.5,
              }}
            >
              Ya sea que seas un instalador buscando tu primer equipo o una empresa
              evaluando climatización a gran escala, nuestro equipo está listo para
              ayudarte.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 2 — Contact Cards (3 channels)
        ════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: '#f8f9fa',
            padding: 'clamp(3rem, 5vw, 5rem) 0',
          }}
        >
          <div className="container-tp">
            <div className="contact-cards-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ── WhatsApp Card ── */}
              <div
                className="contact-channel-card"
                style={{
                  backgroundColor: '#25D366',
                  borderRadius: '8px',
                  padding: '2.5rem',
                  textAlign: 'center',
                  transition:
                    'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 300ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 32px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <MessageCircle
                  size={48}
                  style={{ color: '#ffffff', margin: '0 auto' }}
                />
                <h3
                  className="uppercase"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#ffffff',
                    marginTop: '1rem',
                  }}
                >
                  WHATSAPP
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.85)',
                    marginTop: '0.75rem',
                    lineHeight: 1.5,
                  }}
                >
                  Respuesta inmediata en horario laboral. Ideal para consultas
                  técnicas rápidas.
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: '#ffffff',
                    marginTop: '1.5rem',
                  }}
                >
                  +56 9 9011 7784
                </p>
                <a
                  href="https://wa.me/+56990117784"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#25D366',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    marginTop: '1.5rem',
                    textDecoration: 'none',
                    transition: 'background-color 200ms ease, transform 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  INICIAR CHAT →
                </a>
              </div>

              {/* ── Phone Card ── */}
              <div
                className="contact-channel-card"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '2.5rem',
                  textAlign: 'center',
                  transition:
                    'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 300ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 32px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="flex items-center justify-center mx-auto"
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    backgroundColor: 'rgba(21,72,160,0.1)',
                    borderRadius: '8px',
                  }}
                >
                  <Phone size={32} style={{ color: '#022067' }} />
                </div>
                <h3
                  className="uppercase"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#1a1a2e',
                    marginTop: '1rem',
                  }}
                >
                  TELÉFONO
                </h3>
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
                  Atención de lunes a viernes, 9:00–18:00 (hora Chile). Para
                  distribuidores: línea prioritaria.
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: '#022067',
                    marginTop: '1.5rem',
                  }}
                >
                  +56 2 2345 6789
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.8rem',
                    color: '#4a5568',
                    marginTop: '0.5rem',
                  }}
                >
                  Línea distribuidores: +56 2 2345 6790
                </p>
              </div>

              {/* ── Email Card ── */}
              <div
                className="contact-channel-card"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '2.5rem',
                  textAlign: 'center',
                  transition:
                    'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 300ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 32px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="flex items-center justify-center mx-auto"
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    backgroundColor: 'rgba(230,57,70,0.1)',
                    borderRadius: '8px',
                  }}
                >
                  <Mail size={32} style={{ color: '#e63946' }} />
                </div>
                <h3
                  className="uppercase"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#1a1a2e',
                    marginTop: '1rem',
                  }}
                >
                  EMAIL
                </h3>
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
                  Para cotizaciones, soporte técnico y consultas generales.
                  Respondemos en menos de 24 horas.
                </p>
                <div
                  className="flex flex-col items-start gap-2"
                  style={{ marginTop: '1.5rem' }}
                >
                  {[
                    { label: 'Ventas', email: 'distribuidores@bombasdecalor.lat' },
                    { label: 'Soporte', email: 'soporte@thermapro.com' },
                    { label: 'Ingeniería', email: 'ingenieria@thermapro.com' },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={`mailto:${item.email}`}
                      className="link-underline"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        color: '#022067',
                        textDecoration: 'none',
                        transition: 'color 200ms ease',
                      }}
                    >
                      {item.label}: {item.email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 3 — Contact Form
        ════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: '#ffffff',
            padding: 'clamp(5rem, 8vw, 8rem) 0',
          }}
        >
          <div className="container-tp" style={{ maxWidth: '800px' }}>
            {/* section header */}
            <div className="form-header text-center mb-10 lg:mb-12">
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
                  FORMULARIO
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
                  fontSize: 'clamp(2rem, 3vw, 3rem)',
                  color: '#1a1a2e',
                  lineHeight: 1.1,
                }}
              >
                ENVÍANOS TU CONSULTA
              </h2>
            </div>

            {/* form */}
            <div
              className="form-container"
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              }}
            >
              {status === 'success' ? (
                <div
                  className="flex flex-col items-center justify-center text-center"
                  style={{ padding: '3rem 1rem' }}
                >
                  <CheckCircle size={56} style={{ color: '#2a9d8f' }} />
                  <h3
                    className="uppercase"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      color: '#2a9d8f',
                      marginTop: '1.5rem',
                    }}
                  >
                    ¡MENSAJE ENVIADO!
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '1rem',
                      color: '#4a5568',
                      marginTop: '0.75rem',
                    }}
                  >
                    Te contactaremos pronto.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    style={{
                      marginTop: '1.5rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: '#022067',
                      textDecoration: 'underline',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    ENVIAR OTRO MENSAJE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Row 1: Nombre + Empresa */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label style={labelStyle}>
                        Nombre completo <span style={{ color: '#e63946' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        style={{
                          ...inputBaseStyle,
                          ...(errors.nombre
                            ? { borderColor: '#e63946' }
                            : {}),
                        }}
                        onFocus={(e) => {
                          if (!errors.nombre) {
                            Object.assign(e.target.style, inputFocusStyle);
                          }
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.nombre
                            ? '#e63946'
                            : '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      {errors.nombre && (
                        <p style={errorStyle}>{errors.nombre}</p>
                      )}
                    </div>

                    <div>
                      <label style={labelStyle}>Empresa</label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        style={inputBaseStyle}
                        onFocus={(e) =>
                          Object.assign(e.target.style, inputFocusStyle)
                        }
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label style={labelStyle}>
                        Email <span style={{ color: '#e63946' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        style={{
                          ...inputBaseStyle,
                          ...(errors.email ? { borderColor: '#e63946' } : {}),
                        }}
                        onFocus={(e) => {
                          if (!errors.email) {
                            Object.assign(e.target.style, inputFocusStyle);
                          }
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.email
                            ? '#e63946'
                            : '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      {errors.email && (
                        <p style={errorStyle}>{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label style={labelStyle}>
                        Teléfono <span style={{ color: '#e63946' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+56 9 1234 5678"
                        style={{
                          ...inputBaseStyle,
                          ...(errors.telefono
                            ? { borderColor: '#e63946' }
                            : {}),
                        }}
                        onFocus={(e) => {
                          if (!errors.telefono) {
                            Object.assign(e.target.style, inputFocusStyle);
                          }
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.telefono
                            ? '#e63946'
                            : '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      {errors.telefono && (
                        <p style={errorStyle}>{errors.telefono}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: País */}
                  <div className="mb-5">
                    <label style={labelStyle}>
                      País <span style={{ color: '#e63946' }}>*</span>
                    </label>
                    <select
                      name="pais"
                      value={formData.pais}
                      onChange={handleChange}
                      style={{
                        ...inputBaseStyle,
                        ...(errors.pais ? { borderColor: '#e63946' } : {}),
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a5568' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        paddingRight: '40px',
                      }}
                      onFocus={(e) => {
                        if (!errors.pais) {
                          Object.assign(e.target.style, inputFocusStyle);
                        }
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.pais
                          ? '#e63946'
                          : '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="" disabled>
                        Selecciona tu país
                      </option>
                      <option value="Chile">Chile</option>
                      <option value="México">México</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Perú">Perú</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Otro">Otro</option>
                    </select>
                    {errors.pais && <p style={errorStyle}>{errors.pais}</p>}
                  </div>

                  {/* Row 4: Motivo */}
                  <div className="mb-5">
                    <label style={labelStyle}>
                      Motivo de contacto{' '}
                      <span style={{ color: '#e63946' }}>*</span>
                    </label>
                    <select
                      name="motivo"
                      value={formData.motivo}
                      onChange={handleChange}
                      style={{
                        ...inputBaseStyle,
                        ...(errors.motivo ? { borderColor: '#e63946' } : {}),
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a5568' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        paddingRight: '40px',
                      }}
                      onFocus={(e) => {
                        if (!errors.motivo) {
                          Object.assign(e.target.style, inputFocusStyle);
                        }
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.motivo
                          ? '#e63946'
                          : '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="" disabled>
                        Selecciona un motivo
                      </option>
                      <option value="distribuidor">Quiero ser distribuidor</option>
                      <option value="cotizacion">Cotización de equipos</option>
                      <option value="soporte">Soporte técnico</option>
                      <option value="general">Consulta general</option>
                      <option value="otro">Otro</option>
                    </select>
                    {errors.motivo && <p style={errorStyle}>{errors.motivo}</p>}
                  </div>

                  {/* Row 5: Mensaje */}
                  <div className="mb-6">
                    <label style={labelStyle}>
                      Mensaje <span style={{ color: '#e63946' }}>*</span>
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Cuéntanos sobre tu proyecto, consulta o solicitud..."
                      style={{
                        ...inputBaseStyle,
                        ...(errors.mensaje ? { borderColor: '#e63946' } : {}),
                        resize: 'vertical',
                      }}
                      onFocus={(e) => {
                        if (!errors.mensaje) {
                          Object.assign(e.target.style, inputFocusStyle);
                        }
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.mensaje
                          ? '#e63946'
                          : '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {errors.mensaje && (
                      <p style={errorStyle}>{errors.mensaje}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-110 disabled:opacity-70"
                    style={{
                      backgroundColor: '#e63946',
                      color: '#ffffff',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '14px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="inline-block"
                          style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: '#ffffff',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                          }}
                        />
                        ENVIANDO...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        ENVIAR MENSAJE
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 4 — Offices
        ════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: '#f8f9fa',
            padding: 'clamp(5rem, 8vw, 8rem) 0',
          }}
        >
          <div className="container-tp">
            {/* section header */}
            <div className="offices-header text-center mb-10 lg:mb-12">
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
                  OFICINAS
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
                  fontSize: 'clamp(2rem, 3vw, 3rem)',
                  color: '#1a1a2e',
                  lineHeight: 1.1,
                }}
              >
                PRESENCIA EN LATINOAMÉRICA
              </h2>
            </div>

            {/* offices grid */}
            <div className="offices-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {offices.map((office) => (
                <div
                  key={office.country}
                  className="office-card bg-white rounded-lg border p-5"
                  style={{ borderColor: '#e2e8f0' }}
                >
                  <div
                    className="text-2xl mb-3"
                    style={{ lineHeight: 1 }}
                  >
                    {office.flag}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#1a1a2e',
                    }}
                  >
                    {office.country}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '0.85rem',
                      color: '#4a5568',
                      marginTop: '0.25rem',
                    }}
                  >
                    {office.city}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.8rem',
                      color: '#4a5568',
                      marginTop: '0.75rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {office.address}
                  </p>
                  <a
                    href={`tel:${office.phone.replace(/\s/g, '')}`}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '0.85rem',
                      color: '#022067',
                      marginTop: '0.75rem',
                      display: 'block',
                      textDecoration: 'none',
                    }}
                  >
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
