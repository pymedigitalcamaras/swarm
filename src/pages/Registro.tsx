import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Eye, EyeOff, Check, Shield, Lock, Clock, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useAuthContext } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   Registration Page Component
   ═══════════════════════════════════════════════════════════ */

interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  company: string;
  password: string;
  confirmPassword: string;
  userType: 'personal_natural' | 'instalador' | 'distribuidor_acs';
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  password?: string;
  confirmPassword?: string;
  userType?: string;
  acceptTerms?: string;
}

const countries = [
  'Chile',
  'México',
  'Colombia',
  'Perú',
  'Argentina',
  'Ecuador',
  'Uruguay',
  'Otro',
];

const benefits = [
  {
    title: 'Precios de distribuidor',
    description: 'Hasta 40% de descuento sobre precio de instalador.',
  },
  {
    title: 'Fichas técnicas descargables',
    description: 'PDFs de todos los equipos, manuales y certificados.',
  },
  {
    title: 'Calculadora de ahorro',
    description: 'Compara costos de operación entre tecnologías.',
  },
  {
    title: 'Selector de equipos',
    description: 'Encuentra el equipo ideal en 30 segundos.',
  },
  {
    title: 'Soporte técnico priorizado',
    description: 'Respuesta en menos de 24 horas.',
  },
  {
    title: 'Leads de tu zona',
    description: 'Oportunidades de proyectos en tu región.',
  },
];

export default function Registro() {
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { register } = useAuthContext();

  const [form, setForm] = useState<RegisterForm>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    company: '',
    password: '',
    confirmPassword: '',
    userType: 'personal_natural',
    acceptTerms: false,
    acceptMarketing: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // OTP verification states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');

  /* ── GSAP entrance animations ── */
  useGSAP(() => {
    if (!pageRef.current) return;

    gsap.from('.reg-eyebrow', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.reg-eyebrow', start: 'top 85%' },
    });

    gsap.from('.reg-title', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.reg-title', start: 'top 85%' },
    });

    gsap.from('.reg-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.reg-subtitle', start: 'top 85%' },
    });

    if (formRef.current) {
      gsap.from(formRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
      });
    }

    if (sidebarRef.current) {
      gsap.from(sidebarRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.8,
        delay: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: sidebarRef.current, start: 'top 80%' },
      });
    }

    gsap.from('.benefit-item', {
      opacity: 0,
      y: 15,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.benefits-list', start: 'top 85%' },
    });

    if (trustRef.current) {
      gsap.from(trustRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: trustRef.current, start: 'top 85%' },
      });
    }
  }, { scope: pageRef });

  /* ── Form validation ── */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.fullName.trim() || form.fullName.length < 3) {
      newErrors.fullName = 'Nombre completo es obligatorio (mín. 3 caracteres)';
    }
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      newErrors.email = 'Ingresa un email válido';
    }
    if (!form.phone.trim() || form.phone.length < 7) {
      newErrors.phone = 'Teléfono es obligatorio (mín. 7 dígitos)';
    }
    if (!form.country) {
      newErrors.country = 'Selecciona un país';
    }
    if (!form.city.trim()) {
      newErrors.city = 'Ciudad es obligatoria';
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!form.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ── Submit handler ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Corrige los errores del formulario');
      return;
    }

    setIsSubmitting(true);
    const result = await register(form.email, form.password, {
      full_name: form.fullName,
      phone: form.phone,
      country: form.country,
      city: form.city,
      company_name: form.company,
      user_type: form.userType,
    });
    setIsSubmitting(false);

    if (result.error) {
      toast.error('Error al crear cuenta', { description: result.error });
      return;
    }

    setIsSuccess(true);
    toast.success('Cuenta creada exitosamente', {
      description: 'Revisa tu correo para confirmar tu cuenta.',
    });

    // Send OTP for email verification
    setOtpEmail(form.email);
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: 'https://swarm-ehde.vercel.app/#/login',
      },
    });

    if (otpError) {
      toast.error('Error al enviar código', { description: otpError.message });
    } else {
      setShowOtpModal(true);
      toast.success('Código enviado', {
        description: `Revisa tu correo ${form.email} e ingresa el código de 6 dígitos.`,
      });
    }
  };

  const verifyOtp = async () => {
    if (!otpCode || otpCode.length < 6) {
      setOtpError('Ingresa el código de 6 dígitos');
      return;
    }
    setIsVerifyingOtp(true);
    setOtpError('');

    const { data, error } = await supabase.auth.verifyOtp({
      email: otpEmail,
      token: otpCode,
      type: 'email',
    });

    if (error) {
      setOtpError('Código inválido. Verifica e intenta de nuevo.');
      setIsVerifyingOtp(false);
      return;
    }

    if (data.user) {
      setIsOtpVerified(true);
      toast.success('¡Cuenta confirmada!', {
        description: 'Tu email ha sido verificado exitosamente.',
      });

      // Auto-redirect to products after 2 seconds
      setTimeout(() => {
        navigate('/productos');
      }, 2000);
    }
    setIsVerifyingOtp(false);
  };

  const resendOtp = async () => {
    setOtpError('');
    const { error } = await supabase.auth.signInWithOtp({
      email: otpEmail,
      options: { shouldCreateUser: false },
    });
    if (error) {
      toast.error('Error al reenviar', { description: error.message });
    } else {
      toast.success('Código reenviado', { description: 'Revisa tu correo.' });
    }
  };

  const updateField = (field: keyof RegisterForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ═══════════════════════════════════════════
            SECTION 1: Page Header
            ═══════════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: '#0f0f12',
            padding: 'clamp(7rem, 12vw, 10rem) 0 clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <div className="container-tp text-center" style={{ maxWidth: '900px' }}>
            <div className="reg-eyebrow flex items-center justify-center gap-3 mb-6">
              <span
                className="inline-block"
                style={{ width: '3rem', height: '2px', backgroundColor: '#e63946' }}
              />
              <span
                className="text-xs font-medium uppercase"
                style={{ letterSpacing: '0.12em', color: '#2a9d8f' }}
              >
                REGISTRO GRATUITO
              </span>
              <span
                className="inline-block"
                style={{ width: '3rem', height: '2px', backgroundColor: '#e63946' }}
              />
            </div>
            <h1
              className="reg-title font-black uppercase"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 5rem)',
                color: '#ffffff',
                lineHeight: 1.05,
              }}
            >
              ACCEDE A PRECIOS Y HERRAMIENTAS EXCLUSIVAS
            </h1>
            <p
              className="reg-subtitle mt-5"
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '600px',
                margin: '1.5rem auto 0',
                lineHeight: 1.5,
              }}
            >
              Regístrate gratis como instalador o distribuidor. Obtén acceso inmediato a precios, fichas técnicas descargables y nuestras calculadoras interactivas.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 2: Form + Benefits
            ═══════════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: '#f8f9fa',
            padding: '5rem 0 clamp(5rem, 8vw, 8rem)',
          }}
        >
          <div className="container-tp" style={{ maxWidth: '1100px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* LEFT: Registration Form */}
              <div ref={formRef} className="lg:col-span-3">
                <div
                  className="bg-white rounded-lg border p-8"
                  style={{ borderColor: '#e2e8f0' }}
                >
                  {isSuccess ? (
                    /* Success State */
                    <div className="text-center py-8">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                        style={{ backgroundColor: 'rgba(42,157,143,0.15)' }}
                      >
                        <Check size={32} style={{ color: '#2a9d8f' }} />
                      </div>
                      <h3
                        className="font-bold uppercase mt-5"
                        style={{ fontSize: '1.2rem', color: '#1a1a2e' }}
                      >
                        ¡CUENTA CREADA!
                      </h3>
                      <p className="mt-3" style={{ fontSize: '1rem', color: '#4a5568', lineHeight: 1.5 }}>
                        Revisa tu correo para confirmar tu cuenta.
                      </p>
                      <p className="mt-2" style={{ fontSize: '0.9rem', color: '#2a9d8f' }}>
                        En 24-48 horas un asesor te contactará.
                      </p>
                      <div className="flex justify-center gap-4 mt-6">
                        <Button
                          className="font-semibold uppercase text-sm transition-all hover:brightness-110"
                          style={{
                            backgroundColor: '#1548a0',
                            color: '#ffffff',
                            padding: '12px 32px',
                            borderRadius: '4px',
                          }}
                          onClick={() => navigate('/productos')}
                        >
                          VER PRODUCTOS
                        </Button>
                        <Button
                          variant="outline"
                          className="font-semibold uppercase text-sm"
                          onClick={() => {
                            setIsSuccess(false);
                            setForm({
                              fullName: '',
                              email: '',
                              phone: '',
                              country: '',
                              city: '',
                              company: '',
                              password: '',
                              confirmPassword: '',
                              userType: 'personal_natural',
                              acceptTerms: false,
                              acceptMarketing: false,
                            });
                          }}
                        >
                          CREAR OTRA CUENTA
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3
                        className="font-bold uppercase"
                        style={{ fontSize: '1.1rem', color: '#1a1a2e', letterSpacing: '0.05em' }}
                      >
                        CREAR CUENTA DE DISTRIBUIDOR
                      </h3>
                      <p className="mt-2" style={{ fontSize: '0.85rem', color: '#4a5568' }}>
                        Regístrate gratis. Te contactamos en 24 horas.
                      </p>

                      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        {/* Full name */}
                        <div>
                          <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                            Nombre completo *
                          </Label>
                          <Input
                            placeholder="Ej: Carlos Rodríguez"
                            value={form.fullName}
                            onChange={e => updateField('fullName', e.target.value)}
                            className="mt-1.5"
                            style={{
                              backgroundColor: '#f8f9fa',
                              borderColor: errors.fullName ? '#e63946' : '#e2e8f0',
                              fontSize: '0.95rem',
                              padding: '12px 16px',
                            }}
                          />
                          {errors.fullName && (
                            <p className="mt-1 text-xs" style={{ color: '#e63946' }}>{errors.fullName}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                            Correo electrónico *
                          </Label>
                          <Input
                            type="email"
                            placeholder="tu@email.com"
                            value={form.email}
                            onChange={e => updateField('email', e.target.value)}
                            className="mt-1.5"
                            style={{
                              backgroundColor: '#f8f9fa',
                              borderColor: errors.email ? '#e63946' : '#e2e8f0',
                              fontSize: '0.95rem',
                              padding: '12px 16px',
                            }}
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs" style={{ color: '#e63946' }}>{errors.email}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                            Teléfono / WhatsApp *
                          </Label>
                          <Input
                            type="tel"
                            placeholder="Ej: +52 55 1234 5678"
                            value={form.phone}
                            onChange={e => updateField('phone', e.target.value)}
                            className="mt-1.5"
                            style={{
                              backgroundColor: '#f8f9fa',
                              borderColor: errors.phone ? '#e63946' : '#e2e8f0',
                              fontSize: '0.95rem',
                              padding: '12px 16px',
                            }}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs" style={{ color: '#e63946' }}>{errors.phone}</p>
                          )}
                        </div>

                        {/* Country + City (2-col) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                              País *
                            </Label>
                            <select
                              className="mt-1.5 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                              style={{
                                backgroundColor: '#f8f9fa',
                                borderColor: errors.country ? '#e63946' : '#e2e8f0',
                                color: form.country ? '#1a1a2e' : '#a0aec0',
                                fontSize: '0.95rem',
                              }}
                              value={form.country}
                              onChange={e => updateField('country', e.target.value)}
                            >
                              <option value="">Selecciona país</option>
                              {countries.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            {errors.country && (
                              <p className="mt-1 text-xs" style={{ color: '#e63946' }}>{errors.country}</p>
                            )}
                          </div>
                          <div>
                            <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                              Ciudad *
                            </Label>
                            <Input
                              placeholder="Ej: Santiago"
                              value={form.city}
                              onChange={e => updateField('city', e.target.value)}
                              className="mt-1.5"
                              style={{
                                backgroundColor: '#f8f9fa',
                                borderColor: errors.city ? '#e63946' : '#e2e8f0',
                                fontSize: '0.95rem',
                                padding: '12px 16px',
                              }}
                            />
                            {errors.city && (
                              <p className="mt-1 text-xs" style={{ color: '#e63946' }}>{errors.city}</p>
                            )}
                          </div>
                        </div>

                        {/* Company (optional) */}
                        <div>
                          <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                            Empresa <span style={{ color: '#a0aec0' }}>(opcional)</span>
                          </Label>
                          <Input
                            placeholder="Ej: ClimaSoluciones S.A."
                            value={form.company}
                            onChange={e => updateField('company', e.target.value)}
                            className="mt-1.5"
                            style={{
                              backgroundColor: '#f8f9fa',
                              borderColor: '#e2e8f0',
                              fontSize: '0.95rem',
                              padding: '12px 16px',
                            }}
                          />
                        </div>

                        {/* User Type - Critical for pricing */}
                        <div>
                          <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                            ¿Cómo te describes? *
                          </Label>
                          <div className="mt-1.5 space-y-2">
                            {[
                              { value: 'personal_natural', label: 'Personal Natural', desc: 'Verás precios de venta al público' },
                              { value: 'instalador', label: 'Instalador de Productos', desc: 'Verás precios de distribuidor' },
                              { value: 'distribuidor_acs', label: 'Distribuidor Local de Equipos ACS', desc: 'Verás precios de distribuidor' },
                            ].map(option => (
                              <label
                                key={option.value}
                                className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all"
                                style={{
                                  borderColor: form.userType === option.value ? '#1548a0' : '#e2e8f0',
                                  backgroundColor: form.userType === option.value ? '#eef2ff' : '#f8f9fa',
                                }}
                                onClick={() => updateField('userType', option.value)}
                              >
                                <div
                                  className="w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center"
                                  style={{
                                    borderColor: form.userType === option.value ? '#1548a0' : '#cbd5e1',
                                  }}
                                >
                                  {form.userType === option.value && (
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#1548a0' }} />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium" style={{ color: '#1a1a2e' }}>{option.label}</p>
                                  <p className="text-xs" style={{ color: '#64748b' }}>{option.desc}</p>
                                </div>
                              </label>
                            ))}
                          </div>
                          {errors.userType && (
                            <p className="mt-1 text-xs" style={{ color: '#e63946' }}>{errors.userType}</p>
                          )}
                        </div>

                        {/* Password */}
                        <div>
                          <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                            Contraseña *
                          </Label>
                          <div className="relative mt-1.5">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Mínimo 6 caracteres"
                              value={form.password}
                              onChange={e => updateField('password', e.target.value)}
                              className="pr-10"
                              style={{
                                backgroundColor: '#f8f9fa',
                                borderColor: errors.password ? '#e63946' : '#e2e8f0',
                                fontSize: '0.95rem',
                                padding: '12px 16px',
                                paddingRight: '40px',
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(prev => !prev)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                              style={{ color: '#4a5568' }}
                              onMouseEnter={e => { e.currentTarget.style.color = '#1548a0'; }}
                              onMouseLeave={e => { e.currentTarget.style.color = '#4a5568'; }}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="mt-1 text-xs" style={{ color: '#e63946' }}>{errors.password}</p>
                          )}
                        </div>

                        {/* Confirm password */}
                        <div>
                          <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                            Confirmar contraseña *
                          </Label>
                          <div className="relative mt-1.5">
                            <Input
                              type={showConfirm ? 'text' : 'password'}
                              placeholder="Repite tu contraseña"
                              value={form.confirmPassword}
                              onChange={e => updateField('confirmPassword', e.target.value)}
                              className="pr-10"
                              style={{
                                backgroundColor: '#f8f9fa',
                                borderColor: errors.confirmPassword ? '#e63946' : '#e2e8f0',
                                fontSize: '0.95rem',
                                padding: '12px 16px',
                                paddingRight: '40px',
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm(prev => !prev)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                              style={{ color: '#4a5568' }}
                              onMouseEnter={e => { e.currentTarget.style.color = '#1548a0'; }}
                              onMouseLeave={e => { e.currentTarget.style.color = '#4a5568'; }}
                            >
                              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <p className="mt-1 text-xs" style={{ color: '#e63946' }}>{errors.confirmPassword}</p>
                          )}
                        </div>

                        {/* Legal note */}
                        <p
                          className="text-xs py-2 px-3 rounded"
                          style={{ color: '#4a5568', backgroundColor: 'rgba(21,72,160,0.04)', lineHeight: 1.4 }}
                        >
                          Al registrarte, aceptas que te contactemos por WhatsApp y correo para activar tu cuenta y brindarte soporte.
                        </p>

                        {/* Terms checkbox */}
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => updateField('acceptTerms', !form.acceptTerms)}
                            className="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200"
                            style={{
                              borderColor: errors.acceptTerms ? '#e63946' : form.acceptTerms ? '#2a9d8f' : '#e2e8f0',
                              backgroundColor: form.acceptTerms ? '#2a9d8f' : 'transparent',
                            }}
                          >
                            {form.acceptTerms && <Check size={12} style={{ color: '#ffffff' }} />}
                          </button>
                          <label className="text-sm cursor-pointer" style={{ color: '#4a5568' }}>
                            Acepto la{' '}
                            <button type="button" className="underline" style={{ color: '#1548a0' }}>política de privacidad</button>
                            {' '}y los{' '}
                            <button type="button" className="underline" style={{ color: '#1548a0' }}>términos de uso</button>
                            {' '}*
                          </label>
                        </div>
                        {errors.acceptTerms && (
                          <p className="text-xs" style={{ color: '#e63946' }}>{errors.acceptTerms}</p>
                        )}

                        {/* Marketing checkbox */}
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => updateField('acceptMarketing', !form.acceptMarketing)}
                            className="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200"
                            style={{
                              borderColor: form.acceptMarketing ? '#2a9d8f' : '#e2e8f0',
                              backgroundColor: form.acceptMarketing ? '#2a9d8f' : 'transparent',
                            }}
                          >
                            {form.acceptMarketing && <Check size={12} style={{ color: '#ffffff' }} />}
                          </button>
                          <label className="text-sm cursor-pointer" style={{ color: '#4a5568' }}>
                            Quiero recibir información técnica y ofertas de ThermaPro
                          </label>
                        </div>

                        {/* Submit */}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full font-semibold uppercase text-sm transition-all hover:brightness-110 disabled:opacity-70"
                          style={{
                            backgroundColor: '#e63946',
                            color: '#ffffff',
                            padding: '16px',
                            borderRadius: '4px',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              CREANDO CUENTA...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-1">
                              CREAR CUENTA <ArrowRight size={16} />
                            </span>
                          )}
                        </Button>

                        {/* Login link */}
                        <p className="text-center text-sm" style={{ color: '#4a5568' }}>
                          ¿Ya tienes cuenta?{' '}
                          <Link
                            to="/login"
                            className="font-semibold transition-all duration-200"
                            style={{ color: '#e63946' }}
                            onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                            onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
                          >
                            Inicia sesión aquí &rarr;
                          </Link>
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* RIGHT: Benefits Sidebar */}
              <div ref={sidebarRef} className="lg:col-span-2">
                <div
                  className="lg:sticky"
                  style={{ top: '100px' }}
                >
                  <h4
                    className="font-bold uppercase"
                    style={{ fontSize: '1rem', color: '#1a1a2e', letterSpacing: '0.05em' }}
                  >
                    AL REGISTRARTE OBTIENES:
                  </h4>

                  <div className="benefits-list mt-5 space-y-4">
                    {benefits.map((b, i) => (
                      <div key={i} className="benefit-item flex items-start gap-3">
                        <Check
                          size={18}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: '#2a9d8f' }}
                        />
                        <div>
                          <p className="text-sm font-semibold" style={{ color: '#1a1a2e' }}>
                            {b.title}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: '#4a5568', lineHeight: 1.4 }}>
                            {b.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial mini-card */}
                  <div
                    className="mt-8 rounded-lg p-5 border"
                    style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }}
                  >
                    <p
                      className="text-sm italic"
                      style={{ color: '#4a5568', lineHeight: 1.5 }}
                    >
                      "Me registré para ver los precios y terminé convirtiéndome en distribuidor. El soporte técnico es excelente."
                    </p>
                    <p className="text-sm font-medium mt-3" style={{ color: '#1a1a2e' }}>
                      Carlos M., ClimaSoluciones México
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3: Trust Signals
            ═══════════════════════════════════════════ */}
        <section
          ref={trustRef}
          style={{
            backgroundColor: '#ffffff',
            padding: '4rem 0',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <div className="container-tp text-center" style={{ maxWidth: '800px' }}>
            <p
              className="font-medium"
              style={{ fontSize: '1rem', color: '#4a5568' }}
            >
              Registro 100% gratuito. Sin compromiso. Sin tarjeta de crédito.
            </p>
            <div className="flex justify-center gap-8 mt-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield size={20} style={{ color: '#2a9d8f' }} />
                <span className="text-sm font-medium" style={{ color: '#4a5568' }}>Datos protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={20} style={{ color: '#2a9d8f' }} />
                <span className="text-sm font-medium" style={{ color: '#4a5568' }}>Conexión segura SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} style={{ color: '#2a9d8f' }} />
                <span className="text-sm font-medium" style={{ color: '#4a5568' }}>Activación en minutos</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            OTP VERIFICATION MODAL
            ═══════════════════════════════════════════ */}
        {showOtpModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => !isVerifyingOtp && !isOtpVerified && setShowOtpModal(false)}
          >
            <div
              className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative"
              onClick={e => e.stopPropagation()}
            >
              {isOtpVerified ? (
                <div className="text-center py-6">
                  <div
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                    style={{ backgroundColor: '#ecfdf5' }}
                  >
                    <Check size={32} style={{ color: '#2a9d8f' }} />
                  </div>
                  <h3 className="font-bold uppercase mt-5 text-lg" style={{ color: '#1a1a2e' }}>
                    ¡CUENTA VERIFICADA!
                  </h3>
                  <p className="mt-3" style={{ color: '#4a5568' }}>
                    Tu email ha sido confirmado exitosamente.
                  </p>
                  <p className="mt-2 text-sm" style={{ color: '#2a9d8f' }}>
                    Redirigiendo a productos...
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div
                      className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4"
                      style={{ backgroundColor: '#eef2ff' }}
                    >
                      <Mail size={28} style={{ color: '#1548a0' }} />
                    </div>
                    <h3 className="font-bold uppercase text-lg" style={{ color: '#1a1a2e' }}>
                      VERIFICA TU CORREO
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: '#4a5568' }}>
                      Hemos enviado un código de 6 dígitos a
                    </p>
                    <p className="font-semibold text-sm mt-1" style={{ color: '#1548a0' }}>
                      {otpEmail}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase text-slate-500">
                        Código de verificación
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otpCode}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setOtpCode(val);
                          setOtpError('');
                        }}
                        placeholder="123456"
                        className="w-full mt-1 border border-slate-200 rounded-md px-4 py-3 text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-[#1548a0] focus:border-transparent"
                        style={{ letterSpacing: '0.3em' }}
                        disabled={isVerifyingOtp}
                        autoFocus
                      />
                      {otpError && (
                        <p className="text-xs text-red-500 mt-2">{otpError}</p>
                      )}
                    </div>

                    <Button
                      className="w-full font-semibold uppercase text-sm"
                      style={{
                        backgroundColor: '#1548a0',
                        color: '#ffffff',
                        padding: '14px',
                        borderRadius: '4px',
                      }}
                      onClick={verifyOtp}
                      disabled={isVerifyingOtp || otpCode.length !== 6}
                    >
                      {isVerifyingOtp ? (
                        <>
                          <Loader2 size={16} className="animate-spin mr-2" />
                          VERIFICANDO...
                        </>
                      ) : (
                        'VERIFICAR CÓDIGO'
                      )}
                    </Button>

                    <div className="text-center">
                      <button
                        type="button"
                        className="text-xs text-slate-500 hover:text-[#1548a0] underline transition-colors"
                        onClick={resendOtp}
                        disabled={isVerifyingOtp}
                      >
                        ¿No recibiste el código? Reenviar
                      </button>
                    </div>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                        onClick={() => setShowOtpModal(false)}
                        disabled={isVerifyingOtp}
                      >
                        Verificar más tarde
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
