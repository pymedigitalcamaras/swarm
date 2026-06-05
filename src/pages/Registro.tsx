import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  ArrowRight, Eye, EyeOff, Check, Shield, Lock,
  Loader2, Mail, User, Phone, MapPin, Building2, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import { supabase } from '@/lib/supabase';
import { sendVerificationCode, verifyCode, completeRegistration } from '@/lib/emailVerification';

// ─── Types ───
interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  company: string;
  userType: 'personal_natural' | 'instalador' | 'distribuidor_acs';
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// ─── Constants ───
const USER_TYPE_LABELS: Record<string, string> = {
  personal_natural: 'Personal Natural',
  instalador: 'Instalador de Productos',
  distribuidor_acs: 'Distribuidor Local de Equipos ACS',
};

const USER_TYPE_PRICES: Record<string, string> = {
  personal_natural: 'Verás precios de venta al público',
  instalador: 'Verás precios de distribuidor',
  distribuidor_acs: 'Verás precios de distribuidor',
};

// ─── Steps ───
type Step = 'form' | 'sending_code' | 'verify_code' | 'creating' | 'success';

export default function Registro() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Form
  const [form, setForm] = useState<RegisterForm>({
    fullName: '', email: '', phone: '', country: '', city: '',
    company: '', userType: 'personal_natural',
    password: '', confirmPassword: '', acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Flow
  const [step, setStep] = useState<Step>('form');
  const [globalError, setGlobalError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState('');

  // GSAP
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.registro-hero', { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' });
      gsap.from('.registro-form', { y: 30, opacity: 0, duration: 0.6, delay: 0.15, ease: 'power2.out' });
    }, containerRef);
    return () => ctx.revert();
  }, [step]);

  const update = (field: keyof RegisterForm, value: string | boolean) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n; });
    if (globalError) setGlobalError('');
  };

  // ─── Validate form ───
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Ingresa tu nombre';
    if (!form.email.trim()) e.email = 'Ingresa tu email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
    if (!form.phone.trim()) e.phone = 'Ingresa tu teléfono';
    if (!form.country.trim()) e.country = 'Ingresa tu país';
    if (!form.city.trim()) e.city = 'Ingresa tu ciudad';
    if (!form.password) e.password = 'Crea una contraseña';
    else if (form.password.length < 6) e.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    if (!form.acceptTerms) e.acceptTerms = 'Debes aceptar los términos';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ─── STEP 1: Send verification code ───
  const handleSendCode = async () => {
    if (!validate()) return;
    setStep('sending_code');
    setGlobalError('');

    const result = await sendVerificationCode(form.email.trim());
    
    if (!result.success) {
      setGlobalError(result.error || 'Error al enviar código');
      setStep('form');
      return;
    }

    // Show code input
    setStep('verify_code');
    setVerificationCode('');
    setCodeError('');
  };

  // ─── STEP 2: Verify code and complete registration ───
  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length < 6) {
      setCodeError('Ingresa el código de 6 dígitos');
      return;
    }
    
    setStep('creating');
    setCodeError('');

    // 1. Verify OTP
    const verifyResult = await verifyCode(form.email.trim(), verificationCode);
    
    if (!verifyResult.success || !verifyResult.user) {
      setCodeError(verifyResult.error || 'Código incorrecto');
      setStep('verify_code');
      return;
    }

    // 2. Set password
    const { error: pwError } = await supabase.auth.updateUser({
      password: form.password,
    });

    if (pwError) {
      console.error('Password update error:', pwError);
    }

    // 3. Complete registration - create profile
    const regResult = await completeRegistration(
      verifyResult.user.id,
      form.email.trim(),
      {
        fullName: form.fullName,
        phone: form.phone,
        country: form.country,
        city: form.city,
        company: form.company,
        userType: form.userType,
      }
    );

    if (!regResult.success) {
      console.error('Registration completion error:', regResult.error);
    }

    // 4. Success! Redirect to products
    setStep('success');
    setTimeout(() => {
      window.location.href = '/#/productos';
    }, 2500);
  };

  // ─── Resend code ───
  const handleResendCode = async () => {
    setCodeError('');
    setVerificationCode('');
    const result = await sendVerificationCode(form.email.trim());
    if (!result.success) {
      setCodeError(result.error || 'Error al reenviar');
    }
  };

  // ─── Render ───
  return (
    <Layout>
      <div ref={containerRef}>

        {/* ═══════════════════════════════════════════
            STEP: FORM
            ═══════════════════════════════════════════ */}
        {step === 'form' && (
          <>
            <section className="registro-hero" style={{ backgroundColor: '#0f0f12', padding: '120px 20px 50px' }}>
              <div className="max-w-4xl mx-auto">
                <span style={{ backgroundColor: '#022067', color: '#fff', padding: '5px 12px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  NUEVO DISTRIBUIDOR
                </span>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginTop: '16px' }}>
                  ACCEDE A PRECIOS Y<br />HERRAMIENTAS EXCLUSIVAS
                </h1>
                <p style={{ color: '#94a3b8', marginTop: '12px', fontSize: '1rem' }}>Regístrate gratis. Te enviaremos un código de verificación.</p>
              </div>
            </section>

            <section className="registro-form" style={{ backgroundColor: '#f8f9fa', padding: '50px 20px' }}>
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                  <div className="lg:col-span-3">

                    {globalError && (
                      <div className="mb-4 p-3 rounded flex items-center gap-2" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#e63946' }}>
                        <AlertCircle size={16} />
                        <span className="text-sm">{globalError}</span>
                      </div>
                    )}

                    <form onSubmit={e => { e.preventDefault(); handleSendCode(); }} className="space-y-5">

                      <div>
                        <Label className="text-sm font-medium flex items-center gap-1.5"><User size={13} /> Nombre completo *</Label>
                        <Input value={form.fullName} onChange={e => update('fullName', e.target.value)}
                          placeholder="Ej: Juan Pérez García" className="mt-1"
                          style={{ borderColor: errors.fullName ? '#e63946' : '#e2e8f0' }} />
                        {errors.fullName && <p className="text-xs mt-1" style={{ color: '#e63946' }}>{errors.fullName}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium flex items-center gap-1.5"><Mail size={13} /> Email *</Label>
                          <Input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                            placeholder="juan@ejemplo.com" className="mt-1"
                            style={{ borderColor: errors.email ? '#e63946' : '#e2e8f0' }} />
                          {errors.email && <p className="text-xs mt-1" style={{ color: '#e63946' }}>{errors.email}</p>}
                        </div>
                        <div>
                          <Label className="text-sm font-medium flex items-center gap-1.5"><Phone size={13} /> Teléfono / WhatsApp *</Label>
                          <Input value={form.phone} onChange={e => update('phone', e.target.value)}
                            placeholder="+56 9 1234 5678" className="mt-1"
                            style={{ borderColor: errors.phone ? '#e63946' : '#e2e8f0' }} />
                          {errors.phone && <p className="text-xs mt-1" style={{ color: '#e63946' }}>{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium flex items-center gap-1.5"><MapPin size={13} /> País *</Label>
                          <Input value={form.country} onChange={e => update('country', e.target.value)}
                            placeholder="Chile" className="mt-1"
                            style={{ borderColor: errors.country ? '#e63946' : '#e2e8f0' }} />
                          {errors.country && <p className="text-xs mt-1" style={{ color: '#e63946' }}>{errors.country}</p>}
                        </div>
                        <div>
                          <Label className="text-sm font-medium flex items-center gap-1.5"><MapPin size={13} /> Ciudad *</Label>
                          <Input value={form.city} onChange={e => update('city', e.target.value)}
                            placeholder="Santiago" className="mt-1"
                            style={{ borderColor: errors.city ? '#e63946' : '#e2e8f0' }} />
                          {errors.city && <p className="text-xs mt-1" style={{ color: '#e63946' }}>{errors.city}</p>}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium flex items-center gap-1.5"><Building2 size={13} /> Empresa <span style={{ color: '#a0aec0' }}>(opcional)</span></Label>
                        <Input value={form.company} onChange={e => update('company', e.target.value)}
                          placeholder="Ej: ClimaSoluciones S.A." className="mt-1" style={{ borderColor: '#e2e8f0' }} />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">¿Cómo te describes? *</Label>
                        <div className="mt-2 space-y-2">
                          {(['personal_natural', 'instalador', 'distribuidor_acs'] as const).map(opt => (
                            <label key={opt}
                              className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all"
                              style={{ borderColor: form.userType === opt ? '#022067' : '#e2e8f0', backgroundColor: form.userType === opt ? '#eef2ff' : '#fff' }}
                              onClick={() => update('userType', opt)}>
                              <div className="w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center"
                                style={{ borderColor: form.userType === opt ? '#022067' : '#cbd5e1' }}>
                                {form.userType === opt && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#022067' }} />}
                              </div>
                              <div>
                                <p className="text-sm font-medium" style={{ color: '#1a1a2e' }}>{USER_TYPE_LABELS[opt]}</p>
                                <p className="text-xs" style={{ color: '#64748b' }}>{USER_TYPE_PRICES[opt]}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium flex items-center gap-1.5"><Lock size={13} /> Contraseña *</Label>
                          <div className="relative mt-1">
                            <Input type={showPassword ? 'text' : 'password'} value={form.password}
                              onChange={e => update('password', e.target.value)} placeholder="Mínimo 6 caracteres"
                              style={{ borderColor: errors.password ? '#e63946' : '#e2e8f0', paddingRight: '40px' }} />
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)} style={{ color: '#94a3b8' }}>
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {errors.password && <p className="text-xs mt-1" style={{ color: '#e63946' }}>{errors.password}</p>}
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Confirmar *</Label>
                          <div className="relative mt-1">
                            <Input type={showConfirm ? 'text' : 'password'} value={form.confirmPassword}
                              onChange={e => update('confirmPassword', e.target.value)} placeholder="Repite"
                              style={{ borderColor: errors.confirmPassword ? '#e63946' : '#e2e8f0', paddingRight: '40px' }} />
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowConfirm(!showConfirm)} style={{ color: '#94a3b8' }}>
                              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: '#e63946' }}>{errors.confirmPassword}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <div className="w-5 h-5 rounded border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-all"
                            style={{ borderColor: form.acceptTerms ? '#022067' : errors.acceptTerms ? '#e63946' : '#cbd5e1', backgroundColor: form.acceptTerms ? '#022067' : 'transparent' }}
                            onClick={() => update('acceptTerms', !form.acceptTerms)}>
                            {form.acceptTerms && <Check size={12} style={{ color: '#fff' }} />}
                          </div>
                          <span className="text-sm" style={{ color: '#4a5568' }}>Acepto que NAE me contacte por WhatsApp y correo.</span>
                        </label>
                        {errors.acceptTerms && <p className="text-xs mt-1" style={{ color: '#e63946' }}>{errors.acceptTerms}</p>}
                      </div>

                      <Button type="submit" className="w-full font-bold uppercase text-sm"
                        style={{ backgroundColor: '#e63946', color: '#fff', padding: '16px', letterSpacing: '0.05em' }}>
                        CREAR CUENTA <ArrowRight size={16} className="ml-2" />
                      </Button>

                      <p className="text-center text-sm" style={{ color: '#4a5568' }}>
                        ¿Ya tienes cuenta? <Link to="/login" className="font-semibold hover:underline" style={{ color: '#e63946' }}>Ingresa aquí</Link>
                      </p>
                    </form>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="sticky top-28 space-y-5">
                      <div className="p-5 rounded-lg bg-white border border-slate-200">
                        <h3 className="font-bold uppercase text-sm mb-3" style={{ color: '#1a1a2e' }}>Al registrarte obtienes:</h3>
                        {['Acceso a precios de distribuidor', 'Calculadora de ahorro energético', 'Fichas técnicas descargables', 'Soporte por WhatsApp', 'Leads de clientes en tu zona', 'Capacitación técnica gratuita'].map((b, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm mb-2" style={{ color: '#4a5568' }}>
                            <Check size={14} style={{ color: '#2a9d8f', marginTop: '3px', flexShrink: 0 }} /> {b}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200">
                        <Shield size={18} style={{ color: '#022067', flexShrink: 0 }} />
                        <p className="text-xs" style={{ color: '#64748b' }}><span className="font-semibold">Sin compromiso.</span> Si en 30 días no vendes, te devolvemos el 100%.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ═══════════════════════════════════════════
            STEP: SENDING CODE
            ═══════════════════════════════════════════ */}
        {step === 'sending_code' && (
          <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f0f12' }}>
            <div className="text-center">
              <Loader2 size={48} className="animate-spin mx-auto mb-4" style={{ color: '#022067' }} />
              <h2 className="text-xl font-bold text-white uppercase">Enviando código...</h2>
              <p className="mt-2" style={{ color: '#94a3b8' }}>Preparando tu verificación</p>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            STEP: VERIFY CODE
            ═══════════════════════════════════════════ */}
        {step === 'verify_code' && (
          <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f0f12', padding: '20px' }}>
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: '#eef2ff' }}>
                  <Mail size={32} style={{ color: '#022067' }} />
                </div>
                <h2 className="text-2xl font-bold text-white uppercase">Verifica tu correo</h2>
                <p className="mt-2" style={{ color: '#94a3b8' }}>Hemos enviado un código a</p>
                <p className="mt-1 font-semibold" style={{ color: '#022067' }}>{form.email}</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-xl">
                {codeError && (
                  <div className="mb-4 p-3 rounded flex items-center gap-2" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#e63946' }}>
                    <AlertCircle size={14} /> <span className="text-sm">{codeError}</span>
                  </div>
                )}

                <div>
                  <Label className="text-xs font-semibold uppercase text-slate-500">Código de verificación</Label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={verificationCode}
                    onChange={e => { setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setCodeError(''); }}
                    onKeyDown={e => { if (e.key === 'Enter') handleVerifyCode(); }}
                    placeholder="------"
                    className="w-full mt-2 border border-slate-200 rounded-md px-4 py-4 text-center text-3xl font-bold tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-[#022067]"
                    style={{ fontFamily: 'monospace' }}
                    autoFocus
                  />
                  <p className="text-xs text-slate-400 mt-2 text-center">Ingresa los 6 dígitos que recibiste</p>
                </div>

                <Button className="w-full mt-5 font-bold uppercase" style={{ backgroundColor: verificationCode.length === 6 ? '#022067' : '#94a3b8', color: '#fff', padding: '14px' }}
                  onClick={handleVerifyCode} disabled={verificationCode.length !== 6}>
                  VERIFICAR CÓDIGO
                </Button>

                <div className="text-center mt-4 space-y-2">
                  <button type="button" className="text-sm text-slate-500 hover:text-[#022067] underline" onClick={handleResendCode}>¿No recibiste el código? Reenviar</button>
                  <p className="text-xs text-slate-400">Revisa también tu carpeta de spam</p>
                </div>
              </div>

              <p className="text-center mt-4">
                <button className="text-xs text-slate-500 hover:text-white underline" onClick={() => setStep('form')}>Volver al formulario</button>
              </p>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            STEP: CREATING ACCOUNT
            ═══════════════════════════════════════════ */}
        {step === 'creating' && (
          <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f0f12' }}>
            <div className="text-center">
              <Loader2 size={48} className="animate-spin mx-auto mb-4" style={{ color: '#022067' }} />
              <h2 className="text-xl font-bold text-white uppercase">Creando tu cuenta...</h2>
              <p className="mt-2" style={{ color: '#94a3b8' }}>Esto tomará solo unos segundos</p>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            STEP: SUCCESS
            ═══════════════════════════════════════════ */}
        {step === 'success' && (
          <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f0f12' }}>
            <div className="text-center max-w-md px-4">
              <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: '#ecfdf5' }}>
                <Check size={40} style={{ color: '#2a9d8f' }} />
              </div>
              <h2 className="text-2xl font-bold uppercase" style={{ color: '#2a9d8f' }}>¡Cuenta verificada!</h2>
              <p className="mt-4" style={{ color: '#94a3b8' }}>Tu email ha sido confirmado exitosamente.</p>
              <p className="mt-2" style={{ color: '#64748b' }}>Redirigiendo al catálogo de productos...</p>
              <Loader2 size={24} className="animate-spin mx-auto mt-6" style={{ color: '#022067' }} />
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
