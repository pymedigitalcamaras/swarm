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
  personal_natural: 'Veras precios de venta al publico',
  instalador: 'Veras precios de distribuidor',
  distribuidor_acs: 'Veras precios de distribuidor',
};

// ─── Steps ───
type Step = 'form' | 'creating' | 'success';

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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalido';
    if (!form.phone.trim()) e.phone = 'Ingresa tu telefono';
    if (!form.country.trim()) e.country = 'Ingresa tu pais';
    if (!form.city.trim()) e.city = 'Ingresa tu ciudad';
    if (!form.password) e.password = 'Crea una contrasena';
    else if (form.password.length < 6) e.password = 'Minimo 6 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'No coinciden';
    if (!form.acceptTerms) e.acceptTerms = 'Debes aceptar';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ─── STEP 1: Create account (no OTP needed since email confirmation is OFF) ───
  const handleCreateAccount = async () => {
    if (!validate()) return;
    setStep('creating');
    setGlobalError('');

    try {
      // 1. Create auth user with signUp (auto-confirmed since we disabled email confirmation)
      const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            full_name: form.fullName.trim(),
            user_type: form.userType,
          },
        },
      });

      if (signUpErr) {
        setGlobalError(signUpErr.message);
        setStep('form');
        return;
      }

      if (!signUpData.user?.id) {
        setGlobalError('Error al crear usuario. Intenta de nuevo.');
        setStep('form');
        return;
      }

      // 2. Save profile in users table
      const { error: profileErr } = await supabase.from('users').insert({
        id: signUpData.user.id,
        email: form.email.trim(),
        full_name: form.fullName.trim(),
        company_name: form.company.trim() || null,
        phone: form.phone.trim(),
        country: form.country.trim(),
        city: form.city.trim(),
        role: form.userType,
        is_active: true,
      });

      if (profileErr) {
        console.error('Profile insert error:', profileErr);
        // Don't block - user has auth account
      }

      // 3. Login automatically (create session)
      const { error: loginErr } = await supabase.auth.signInWithPassword({
        email: form.email.trim(),
        password: form.password,
      });

      if (loginErr) {
        console.error('Auto-login error:', loginErr);
        // Don't block - account was created, user can login manually
      }

      // 4. Show success and redirect
      setStep('success');
      setTimeout(() => {
        window.location.href = '/#/productos';
      }, 2500);

    } catch (err: any) {
      setGlobalError(err?.message || 'Error inesperado');
      setStep('form');
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
                <span style={{ backgroundColor: '#1548a0', color: '#fff', padding: '5px 12px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  NUEVO DISTRIBUIDOR
                </span>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginTop: '16px' }}>
                  ACCEDE A PRECIOS Y<br />HERRAMIENTAS EXCLUSIVAS
                </h1>
                <p style={{ color: '#94a3b8', marginTop: '12px', fontSize: '1rem' }}>Registrate gratis y accede inmediatamente.</p>
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

                    <form onSubmit={e => { e.preventDefault(); handleCreateAccount(); }} className="space-y-5">

                      <div>
                        <Label className="text-sm font-medium flex items-center gap-1.5"><User size={13} /> Nombre completo *</Label>
                        <Input value={form.fullName} onChange={e => update('fullName', e.target.value)}
                          placeholder="Ej: Juan Perez Garcia" className="mt-1"
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
                          <Label className="text-sm font-medium flex items-center gap-1.5"><Phone size={13} /> Telefono / WhatsApp *</Label>
                          <Input value={form.phone} onChange={e => update('phone', e.target.value)}
                            placeholder="+56 9 1234 5678" className="mt-1"
                            style={{ borderColor: errors.phone ? '#e63946' : '#e2e8f0' }} />
                          {errors.phone && <p className="text-xs mt-1" style={{ color: '#e63946' }}>{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium flex items-center gap-1.5"><MapPin size={13} /> Pais *</Label>
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
                        <Label className="text-sm font-medium">Como te describes? *</Label>
                        <div className="mt-2 space-y-2">
                          {(['personal_natural', 'instalador', 'distribuidor_acs'] as const).map(opt => (
                            <label key={opt}
                              className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all"
                              style={{ borderColor: form.userType === opt ? '#1548a0' : '#e2e8f0', backgroundColor: form.userType === opt ? '#eef2ff' : '#fff' }}
                              onClick={() => update('userType', opt)}>
                              <div className="w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center"
                                style={{ borderColor: form.userType === opt ? '#1548a0' : '#cbd5e1' }}>
                                {form.userType === opt && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#1548a0' }} />}
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
                          <Label className="text-sm font-medium flex items-center gap-1.5"><Lock size={13} /> Contrasena *</Label>
                          <div className="relative mt-1">
                            <Input type={showPassword ? 'text' : 'password'} value={form.password}
                              onChange={e => update('password', e.target.value)} placeholder="Minimo 6 caracteres"
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
                            style={{ borderColor: form.acceptTerms ? '#1548a0' : errors.acceptTerms ? '#e63946' : '#cbd5e1', backgroundColor: form.acceptTerms ? '#1548a0' : 'transparent' }}
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
                        Ya tienes cuenta? <Link to="/login" className="font-semibold hover:underline" style={{ color: '#e63946' }}>Ingresa aqui</Link>
                      </p>
                    </form>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="sticky top-28 space-y-5">
                      <div className="p-5 rounded-lg bg-white border border-slate-200">
                        <h3 className="font-bold uppercase text-sm mb-3" style={{ color: '#1a1a2e' }}>Al registrarte obtienes:</h3>
                        {['Acceso a precios de distribuidor', 'Calculadora de ahorro energetico', 'Fichas tecnicas descargables', 'Soporte por WhatsApp', 'Leads de clientes en tu zona', 'Capacitacion tecnica gratuita'].map((b, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm mb-2" style={{ color: '#4a5568' }}>
                            <Check size={14} style={{ color: '#2a9d8f', marginTop: '3px', flexShrink: 0 }} /> {b}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200">
                        <Shield size={18} style={{ color: '#1548a0', flexShrink: 0 }} />
                        <p className="text-xs" style={{ color: '#64748b' }}><span className="font-semibold">Sin compromiso.</span> Si en 30 dias no vendes, te devolvemos el 100%.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ═══════════════════════════════════════════
            STEP: CREATING ACCOUNT
            ═══════════════════════════════════════════ */}
        {step === 'creating' && (
          <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f0f12' }}>
            <div className="text-center">
              <Loader2 size={48} className="animate-spin mx-auto mb-4" style={{ color: '#1548a0' }} />
              <h2 className="text-xl font-bold text-white uppercase">Creando tu cuenta...</h2>
              <p className="mt-2" style={{ color: '#94a3b8' }}>Esto tomara solo unos segundos</p>
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
              <h2 className="text-2xl font-bold uppercase" style={{ color: '#2a9d8f' }}>Cuenta creada!</h2>
              <p className="mt-4" style={{ color: '#94a3b8' }}>Tu cuenta ha sido creada exitosamente.</p>
              <p className="mt-2" style={{ color: '#64748b' }}>Redirigiendo al catalogo de productos...</p>
              <Loader2 size={24} className="animate-spin mx-auto mt-6" style={{ color: '#1548a0' }} />
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
