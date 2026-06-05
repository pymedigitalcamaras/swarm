import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuthContext } from '@/context/AuthContext';

/* ═══════════════════════════════════════════════════════════
   Login Page Component
   ═══════════════════════════════════════════════════════════ */

interface LoginForm {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

type AuthView = 'login' | 'recovery';

export default function Login() {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { login } = useAuthContext();

  const [view, setView] = useState<AuthView>('login');
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);

  /* ── GSAP entrance animation ── */
  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.from('.login-field', {
      opacity: 0,
      y: 15,
      duration: 0.5,
      stagger: 0.08,
      delay: 0.2,
      ease: 'power2.out',
    });
  }, { scope: pageRef });

  /* ── View transition animation ── */
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: view === 'recovery' ? 30 : -30 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [view]);

  /* ── Form validation ── */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (!form.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (form.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
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
    const result = await login(form.email, form.password);
    setIsSubmitting(false);

    if (result.error) {
      toast.error('Error al iniciar sesion', {
        description: result.error,
      });
      return;
    }

    toast.success('Inicio de sesion exitoso', {
      description: 'Bienvenido al portal de distribuidores ThermaPro.',
    });
    // Force page reload to ensure auth state is fully initialized
    window.location.href = '/#/';
  };

  /* ── Recovery handler ── */
  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!recoveryEmail.trim() || !emailRegex.test(recoveryEmail)) {
      toast.error('Ingresa un email válido');
      return;
    }
    setRecoverySent(true);
    toast.success('Enlace enviado', {
      description: `Revisa tu correo ${recoveryEmail} para restablecer tu contraseña.`,
    });
  };

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ═══════════════════════════════════════════
            SECTION 1: Login Card (full height dark bg)
            ═══════════════════════════════════════════ */}
        <section
          className="flex items-center justify-center"
          style={{
            backgroundColor: '#0f0f12',
            minHeight: '100dvh',
            padding: '2rem',
          }}
        >
          <div
            ref={cardRef}
            className="w-full"
            style={{
              maxWidth: '420px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
            }}
          >
            {/* Brand */}
            <div className="text-center">
              <h1
                className="font-black uppercase"
                style={{ fontSize: '1.5rem', color: '#1a1a2e', letterSpacing: '-0.02em' }}
              >
                THERMAPRO
              </h1>
              <p className="mt-1" style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                Portal de Distribuidores
              </p>
            </div>

            {/* Divider */}
            <div style={{ margin: '2rem 0', borderTop: '1px solid #e2e8f0' }} />

            {view === 'login' ? (
              /* ═══════ LOGIN FORM ═══════ */
              <>
                <div className="text-center">
                  <h2
                    className="font-bold uppercase"
                    style={{ fontSize: '1.1rem', color: '#1a1a2e', letterSpacing: '0.05em' }}
                  >
                    ACCESO PARA DISTRIBUIDORES
                  </h2>
                  <p className="mt-2" style={{ fontSize: '0.85rem', color: '#4a5568' }}>
                    Si ya eres distribuidor, ingresa para ver precios y descargar fichas técnicas.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {/* Email */}
                  <div className="login-field">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium"
                      style={{ color: '#1a1a2e' }}
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={e => {
                        setForm(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      className="mt-1.5"
                      style={{
                        backgroundColor: '#f8f9fa',
                        borderColor: errors.email ? '#e63946' : '#e2e8f0',
                        fontSize: '0.95rem',
                        padding: '12px 16px',
                      }}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs" style={{ color: '#e63946' }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="login-field">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium"
                      style={{ color: '#1a1a2e' }}
                    >
                      Contraseña
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={e => {
                          setForm(prev => ({ ...prev, password: e.target.value }));
                          if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                        }}
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
                        onMouseEnter={e => { e.currentTarget.style.color = '#022067'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#4a5568'; }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs" style={{ color: '#e63946' }}>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Forgot password link */}
                  <div className="login-field flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setView('recovery');
                        setRecoverySent(false);
                      }}
                      className="text-sm transition-all duration-200"
                      style={{ color: '#022067' }}
                      onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                      onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  {/* Submit button */}
                  <div className="login-field">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full font-semibold uppercase text-sm transition-all hover:brightness-110 disabled:opacity-70"
                      style={{
                        backgroundColor: '#e63946',
                        color: '#ffffff',
                        padding: '14px',
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
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          INGRESANDO...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1">
                          INGRESAR <ArrowRight size={16} />
                        </span>
                      )}
                    </Button>
                  </div>

                  {/* Divider "O" */}
                  <div className="login-field relative flex items-center" style={{ margin: '1.5rem 0' }}>
                    <div className="flex-1" style={{ borderTop: '1px solid #e2e8f0' }} />
                    <span
                      className="mx-4 text-sm"
                      style={{ color: '#4a5568', backgroundColor: '#ffffff', padding: '0 0.75rem' }}
                    >
                      O
                    </span>
                    <div className="flex-1" style={{ borderTop: '1px solid #e2e8f0' }} />
                  </div>

                  {/* Register link */}
                  <div className="login-field text-center">
                    <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                      ¿No tienes cuenta?{' '}
                      <Link
                        to="/registro"
                        className="font-semibold transition-all duration-200"
                        style={{ color: '#e63946' }}
                        onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                        onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
                      >
                        Regístrate gratis &rarr;
                      </Link>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              /* ═══════ RECOVERY FORM ═══════ */
              <>
                <div className="text-center">
                  <h2
                    className="font-bold uppercase"
                    style={{ fontSize: '1.1rem', color: '#1a1a2e', letterSpacing: '0.05em' }}
                  >
                    RECUPERAR CONTRASEÑA
                  </h2>
                  <p className="mt-2" style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                    Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                  </p>
                </div>

                {!recoverySent ? (
                  <form onSubmit={handleRecovery} className="mt-6 space-y-5">
                    <div className="login-field">
                      <Label
                        htmlFor="recovery-email"
                        className="text-sm font-medium"
                        style={{ color: '#1a1a2e' }}
                      >
                        Email
                      </Label>
                      <Input
                        id="recovery-email"
                        type="email"
                        placeholder="tu@email.com"
                        value={recoveryEmail}
                        onChange={e => setRecoveryEmail(e.target.value)}
                        className="mt-1.5"
                        style={{
                          backgroundColor: '#f8f9fa',
                          borderColor: '#e2e8f0',
                          fontSize: '0.95rem',
                          padding: '12px 16px',
                        }}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full font-semibold uppercase text-sm transition-all hover:brightness-110"
                      style={{
                        backgroundColor: '#022067',
                        color: '#ffffff',
                        padding: '14px',
                        borderRadius: '4px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      ENVIAR ENLACE <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </form>
                ) : (
                  <div
                    className="mt-6 rounded-lg p-5 text-center"
                    style={{
                      backgroundColor: 'rgba(42,157,143,0.1)',
                      border: '1px solid rgba(42,157,143,0.3)',
                    }}
                  >
                    <p className="text-sm font-medium" style={{ color: '#2a9d8f' }}>
                      ¡Revisa tu correo!
                    </p>
                    <p className="text-sm mt-1" style={{ color: '#4a5568' }}>
                      Hemos enviado un enlace a <strong>{recoveryEmail}</strong> para restablecer tu contraseña.
                    </p>
                  </div>
                )}

                {/* Back link */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="text-sm font-medium transition-all duration-200 inline-flex items-center gap-1"
                    style={{ color: '#022067' }}
                    onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                    onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
                  >
                    <ChevronLeft size={16} /> Volver al inicio de sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 2: Alternative Actions
            ═══════════════════════════════════════════ */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '4rem 0' }}>
          <div className="container-tp text-center" style={{ maxWidth: '800px' }}>
            <h3
              className="font-bold uppercase"
              style={{ fontSize: '1.2rem', color: '#1a1a2e', letterSpacing: '0.02em' }}
            >
              ¿NO ESTÁS SEGURO DE REGISTRARTE?
            </h3>
            <p
              className="mt-4"
              style={{ fontSize: '1rem', color: '#4a5568', maxWidth: '500px', margin: '1rem auto 0', lineHeight: 1.5 }}
            >
              Explora nuestro catálogo de productos o contáctanos directamente por WhatsApp para resolver tus dudas.
            </p>
            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <Link
                to="/productos"
                className="inline-flex items-center gap-1 font-semibold text-sm uppercase px-7 py-3.5 rounded transition-all hover:brightness-110"
                style={{ backgroundColor: '#022067', color: '#ffffff' }}
              >
                VER PRODUCTOS <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/5491112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-sm uppercase px-7 py-3.5 rounded transition-all hover:brightness-110"
                style={{ backgroundColor: '#25D366', color: '#ffffff' }}
              >
                ESCRIBIR POR WHATSAPP
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
