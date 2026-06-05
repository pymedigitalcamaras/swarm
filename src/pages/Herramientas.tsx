import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Calculator,
  Cpu,
  BarChart3,
  ArrowRight,
  Check,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Zap,
  Leaf,
  Home,
  Settings,
  Thermometer,
  Layers,
  Flame,
  Droplets,
  Wind,
} from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */

interface SavingsForm {
  heatingType: string;
  monthlyCost: string;
  squareMeters: string;
  climateZone: string;
}

interface SavingsResult {
  annualSavings: number;
  roiYears: number;
  savings10Years: number;
  co2Prevented: number;
  currentAnnualCost: number;
  heatPumpAnnualCost: number;
  resistanceCost: number;
  gasCost: number;
  dieselCost: number;
}

interface WizardState {
  step: number;
  projectType: string;
  squareMeters: string;
  zone: string;
  usage: string;
  emitter: string;
}

interface SimulatorState {
  unitsPerMonth: number;
  marginPercent: number;
  avgPrice: number;
}

/* ═══════════════════════════════════════════════════════════
   Data constants
   ═══════════════════════════════════════════════════════════ */

const heatingTypes = [
  { value: 'gas', label: 'Gas natural', icon: Flame, factor: 1.0 },
  { value: 'electric', label: 'Eléctrica (resistencia)', icon: Zap, factor: 2.5 },
  { value: 'diesel', label: 'Diésel / Gasoil', icon: Droplets, factor: 1.4 },
  { value: 'wood', label: 'Leña', icon: Leaf, factor: 0.6 },
];

const climateZones = [
  { value: 'templada', label: 'Templada (0–10°C invierno)' },
  { value: 'fria', label: 'Fría (< 0°C invierno)' },
  { value: 'muy_fria', label: 'Muy fría (zona de montaña)' },
];

const wizardQuestions = [
  {
    step: 1,
    question: '¿Qué tipo de proyecto es?',
    field: 'projectType' as const,
    options: [
      { value: 'nueva', label: 'Casa nueva', icon: Home },
      { value: 'remodelacion', label: 'Remodelación', icon: Settings },
      { value: 'reemplazo', label: 'Reemplazo de sistema', icon: TrendingUp },
    ],
  },
  {
    step: 2,
    question: '¿Cuántos metros cuadrados?',
    field: 'squareMeters' as const,
    options: [
      { value: '50', label: '< 80 m²' },
      { value: '100', label: '80–150 m²' },
      { value: '200', label: '150–300 m²' },
      { value: '400', label: '300–500 m²' },
      { value: '600', label: '> 500 m²' },
    ],
  },
  {
    step: 3,
    question: '¿En qué zona climática?',
    field: 'zone' as const,
    options: [
      { value: 'templada', label: 'Templada', desc: '(0–10°C)' },
      { value: 'fria', label: 'Fría', desc: '(< 0°C)' },
      { value: 'muy_fria', label: 'Muy fría', desc: '(montaña)' },
    ],
  },
  {
    step: 4,
    question: '¿Qué uso necesitas?',
    field: 'usage' as const,
    options: [
      { value: 'calefaccion', label: 'Solo calefacción', icon: Thermometer },
      { value: 'acs', label: 'Calefacción + ACS', icon: Droplets },
      { value: 'todo', label: 'Calefacción + ACS + Refrigeración', icon: Wind },
    ],
  },
  {
    step: 5,
    question: '¿Qué tipo de emisor prefieres?',
    field: 'emitter' as const,
    options: [
      { value: 'radiadores', label: 'Radiadores', icon: Layers },
      { value: 'suelo', label: 'Suelo radiante', icon: GridIcon },
      { value: 'fancoil', label: 'Fan-coils', icon: Wind },
    ],
  },
];

function GridIcon(props: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 20}
      height={props.size || 20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
    </svg>
  );
}

const productRecommendations: Record<string, string> = {
  'nueva-50-templada-calefaccion-radiadores': 'AQUAPRO R32 8KW — Ideal para casas nuevas pequeñas con radiadores. COP 4.2, silenciosa.',
  'nueva-50-templada-calefaccion-suelo': 'AQUAPRO R32 8KW — Perfecta con suelo radiante. Máximo confort, COP 4.5 en estas condiciones.',
  'nueva-100-templada-acs-radiadores': 'AQUAPRO R32 12KW — Cubre calefacción y ACS para 4 personas. Rendimiento óptimo.',
  'nueva-100-fria-calefaccion-suelo': 'AQUAPRO R32 12KW — Potencia extra para zona fría con suelo radiante.',
  'nueva-200-templada-todo-suelo': 'GEOMAX 15KW — Geotermia para máxima eficiencia en proyectos grandes. COP 5.1',
  'remodelacion-100-templada-calefaccion-radiadores': 'AQUAPRO R32 12KW — Fácil integración en remodelación. Compatible con radiadores existentes.',
  'reemplazo-100-templada-acs-fancoil': 'AQUAPRO R32 12KW — Reemplazo directo. Fan-coils para climatización dual.',
};

/* ═══════════════════════════════════════════════════════════
   Helper: Animated counter
   ═══════════════════════════════════════════════════════════ */

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1500 }: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);

  useEffect(() => {
    startRef.current = null;
    fromRef.current = display;

    let raf: number;
    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = fromRef.current + (value - fromRef.current) * eased;
      setDisplay(current);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  const formatted = value >= 1000
    ? Math.round(display).toLocaleString('es-ES')
    : value >= 100
      ? Math.round(display).toLocaleString('es-ES')
      : display.toFixed(1);

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════════════════════ */

export default function Herramientas() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  /* ── Scroll animations ── */
  useGSAP(() => {
    if (!pageRef.current) return;

    gsap.from('.hero-eyebrow', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.hero-eyebrow', start: 'top 85%' },
    });

    gsap.from('.hero-title', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.hero-title', start: 'top 85%' },
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.hero-subtitle', start: 'top 85%' },
    });

    gsap.from('.tool-card', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.tool-cards-grid', start: 'top 80%' },
    });

    gsap.from('.calc-section', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.calc-section', start: 'top 80%' },
    });

    gsap.from('.wizard-section', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.wizard-section', start: 'top 80%' },
    });

    gsap.from('.sim-section', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.sim-section', start: 'top 80%' },
    });
  }, { scope: pageRef });

  /* ═══════════════════════════════════════════
     TOOL A: Calculadora de Ahorro
     ═══════════════════════════════════════════ */

  const [savingsForm, setSavingsForm] = useState<SavingsForm>({
    heatingType: '',
    monthlyCost: '',
    squareMeters: '',
    climateZone: '',
  });
  const [savingsResult, setSavingsResult] = useState<SavingsResult | null>(null);
  const [animatedBars, setAnimatedBars] = useState(false);

  const calculateSavings = useCallback(() => {
    const monthly = parseFloat(savingsForm.monthlyCost);
    const sqm = parseFloat(savingsForm.squareMeters);
    if (!monthly || !sqm || !savingsForm.heatingType || !savingsForm.climateZone) {
      toast.error('Completa todos los campos obligatorios');
      return;
    }

    const typeData = heatingTypes.find(h => h.value === savingsForm.heatingType);
    if (!typeData) return;

    const zoneMultiplier = savingsForm.climateZone === 'fria' ? 1.3 : savingsForm.climateZone === 'muy_fria' ? 1.6 : 1.0;
    const currentAnnual = monthly * 12;
    const heatPumpEfficiency = 0.3; // Heat pump uses ~30% of the energy
    const heatPumpAnnual = currentAnnual * heatPumpEfficiency * (typeData.factor / 1.0) * zoneMultiplier;
    const annualSavings = currentAnnual - heatPumpAnnual;
    const installationCost = sqm * 45; // ~$45/m² installed
    const roiYears = annualSavings > 0 ? installationCost / annualSavings : 0;

    setSavingsResult({
      annualSavings: Math.round(annualSavings),
      roiYears: Math.round(roiYears * 10) / 10,
      savings10Years: Math.round(annualSavings * 10),
      co2Prevented: Math.round(sqm * 8.5 * zoneMultiplier),
      currentAnnualCost: Math.round(currentAnnual),
      heatPumpAnnualCost: Math.round(heatPumpAnnual),
      resistanceCost: Math.round(currentAnnual * 2.5),
      gasCost: Math.round(currentAnnual * 0.85),
      dieselCost: Math.round(currentAnnual * 1.25),
    });
    setAnimatedBars(false);
    setTimeout(() => setAnimatedBars(true), 100);

    toast.success('Cálculo completado');
  }, [savingsForm]);

  /* ═══════════════════════════════════════════
     TOOL B: Configurador de Proyecto (Wizard)
     ═══════════════════════════════════════════ */

  const [wizard, setWizard] = useState<WizardState>({
    step: 1,
    projectType: '',
    squareMeters: '',
    zone: '',
    usage: '',
    emitter: '',
  });
  const [wizardComplete, setWizardComplete] = useState(false);

  const currentQuestion = wizardQuestions.find(q => q.step === wizard.step);

  const selectOption = (field: keyof WizardState, value: string) => {
    setWizard(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (wizard.step < 5) {
      setWizard(prev => ({ ...prev, step: prev.step + 1 }));
    } else {
      setWizardComplete(true);
    }
  };

  const prevStep = () => {
    if (wizard.step > 1) {
      setWizard(prev => ({ ...prev, step: prev.step - 1 }));
      setWizardComplete(false);
    }
  };

  const getRecommendation = () => {
    const key = `${wizard.projectType}-${wizard.squareMeters}-${wizard.zone}-${wizard.usage}-${wizard.emitter}`;
    return productRecommendations[key] || 'AQUAPRO R32 12KW — Nuestra solución más versátil. Contacta a un asesor para una recomendación personalizada.';
  };

  /* ═══════════════════════════════════════════
     TOOL C: Simulador de Negocio
     ═══════════════════════════════════════════ */

  const [sim, setSim] = useState<SimulatorState>({
    unitsPerMonth: 5,
    marginPercent: 25,
    avgPrice: 3500,
  });

  const monthlyIncome = sim.unitsPerMonth * sim.avgPrice * (sim.marginPercent / 100);
  const annualIncome = monthlyIncome * 12;
  const year1 = annualIncome;
  const year2 = annualIncome * 1.25;
  const year3 = annualIncome * 1.55;

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ═══════════════════════════════════════════
            SECTION 1: Page Header
            ═══════════════════════════════════════════ */}
        <section
          className="relative"
          style={{
            background: 'linear-gradient(135deg, #022067 0%, #2a9d8f 100%)',
            padding: 'clamp(7rem, 12vw, 10rem) 0 clamp(3rem, 6vw, 5rem)',
          }}
        >
          <div className="container-tp">
            <div className="hero-eyebrow flex items-center gap-3 mb-6">
              <span
                className="inline-block"
                style={{ width: '2rem', height: '2px', backgroundColor: '#e63946' }}
              />
              <span
                className="text-xs font-medium uppercase"
                style={{ letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }}
              >
                HERRAMIENTAS TÉCNICAS
              </span>
            </div>
            <h1
              className="hero-title font-extrabold uppercase"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 5rem)',
                color: '#ffffff',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              CALCULA, SELECCIONA,
              <br />
              COMPARA
            </h1>
            <p
              className="hero-subtitle mt-4"
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '640px',
                lineHeight: 1.5,
              }}
            >
              Herramientas gratuitas para instaladores y distribuidores: calcula el ahorro energético de tu proyecto, selecciona el equipo ideal y compara opciones.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 2: Tool Cards
            ═══════════════════════════════════════════ */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '5rem 0' }}>
          <div className="container-tp">
            <div className="tool-cards-grid grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Calculadora de Ahorro */}
              <div
                className="tool-card bg-white rounded-lg p-8 border transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{
                  borderColor: '#e2e8f0',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
                onClick={() => document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#022067';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(42,157,143,0.1)' }}
                >
                  <Calculator size={24} style={{ color: '#2a9d8f' }} />
                </div>
                <h3 className="font-bold uppercase mt-5" style={{ fontSize: '1.1rem', color: '#1a1a2e', letterSpacing: '0.02em' }}>
                  CALCULADORA DE AHORRO ENERGÉTICO
                </h3>
                <p className="mt-3" style={{ fontSize: '0.9rem', color: '#4a5568', lineHeight: 1.5 }}>
                  Compara el costo de operación entre una bomba de calor, resistencia eléctrica, gas y gasoil. Incluye ROI y payback.
                </p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  <span className="text-xs font-medium uppercase px-3 py-1 rounded" style={{ backgroundColor: 'rgba(42,157,143,0.12)', color: '#2a9d8f' }}>
                    Gratuito
                  </span>
                  <span className="text-xs font-medium uppercase px-3 py-1 rounded" style={{ backgroundColor: 'rgba(26,31,46,0.08)', color: '#1a1a2e' }}>
                    PDF exportable
                  </span>
                </div>
                <div className="mt-5 font-semibold text-xs uppercase flex items-center gap-1" style={{ color: '#e63946' }}>
                  USAR CALCULADORA <ArrowRight size={14} />
                </div>
              </div>

              {/* Card 2: Selector de Equipo */}
              <div
                className="tool-card bg-white rounded-lg p-8 border transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{
                  borderColor: '#e2e8f0',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
                onClick={() => document.getElementById('configurador')?.scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#022067';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(21,72,160,0.1)' }}
                >
                  <Cpu size={24} style={{ color: '#022067' }} />
                </div>
                <h3 className="font-bold uppercase mt-5" style={{ fontSize: '1.1rem', color: '#1a1a2e', letterSpacing: '0.02em' }}>
                  SELECTOR DE EQUIPO
                </h3>
                <p className="mt-3" style={{ fontSize: '0.9rem', color: '#4a5568', lineHeight: 1.5 }}>
                  Responde 5 preguntas sobre tu proyecto y te recomendamos el equipo ThermaPro ideal con justificación técnica.
                </p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  <span className="text-xs font-medium uppercase px-3 py-1 rounded" style={{ backgroundColor: 'rgba(42,157,143,0.12)', color: '#2a9d8f' }}>
                    Gratuito
                  </span>
                  <span className="text-xs font-medium uppercase px-3 py-1 rounded" style={{ backgroundColor: 'rgba(26,31,46,0.08)', color: '#1a1a2e' }}>
                    Recomendación en 30 seg
                  </span>
                </div>
                <div className="mt-5 font-semibold text-xs uppercase flex items-center gap-1" style={{ color: '#e63946' }}>
                  SELECCIONAR EQUIPO <ArrowRight size={14} />
                </div>
              </div>

              {/* Card 3: Comparador / Simulador de Negocio */}
              <div
                className="tool-card bg-white rounded-lg p-8 border transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{
                  borderColor: '#e2e8f0',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
                onClick={() => document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#022067';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(230,57,70,0.1)' }}
                >
                  <BarChart3 size={24} style={{ color: '#e63946' }} />
                </div>
                <h3 className="font-bold uppercase mt-5" style={{ fontSize: '1.1rem', color: '#1a1a2e', letterSpacing: '0.02em' }}>
                  SIMULADOR DE NEGOCIO
                </h3>
                <p className="mt-3" style={{ fontSize: '0.9rem', color: '#4a5568', lineHeight: 1.5 }}>
                  Calcula tus ingresos potenciales como distribuidor ThermaPro. Ajusta unidades, margen y precio para ver proyecciones.
                </p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  <span className="text-xs font-medium uppercase px-3 py-1 rounded" style={{ backgroundColor: 'rgba(230,57,70,0.12)', color: '#e63946' }}>
                    Distribuidores
                  </span>
                  <span className="text-xs font-medium uppercase px-3 py-1 rounded" style={{ backgroundColor: 'rgba(26,31,46,0.08)', color: '#1a1a2e' }}>
                    Proyección 3 años
                  </span>
                </div>
                <div className="mt-5 font-semibold text-xs uppercase flex items-center gap-1" style={{ color: '#e63946' }}>
                  SIMULAR INGRESOS <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3A: Calculadora de Ahorro
            ═══════════════════════════════════════════ */}
        <section
          id="calculadora"
          className="calc-section"
          style={{ backgroundColor: '#ffffff', padding: 'clamp(5rem, 8vw, 8rem) 0' }}
        >
          <div className="container-tp" style={{ maxWidth: '1000px' }}>
            {/* Section header */}
            <div className="text-center mb-12">
              <span
                className="text-xs font-medium uppercase"
                style={{ letterSpacing: '0.12em', color: '#2a9d8f' }}
              >
                CALCULADORA
              </span>
              <h2
                className="font-extrabold uppercase mt-3"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', color: '#1a1a2e', lineHeight: 1.1 }}
              >
                AHORRO ENERGÉTICO
              </h2>
              <p className="mt-3" style={{ fontSize: '1rem', color: '#4a5568' }}>
                Compara el costo anual de diferentes tecnologías de calefacción para tu proyecto.
              </p>
            </div>

            {/* 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Input Panel */}
              <div
                className="rounded-lg p-8"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <h3
                  className="font-bold uppercase"
                  style={{ fontSize: '0.9rem', color: '#1a1a2e', letterSpacing: '0.05em' }}
                >
                  DATOS DEL PROYECTO
                </h3>

                <div className="mt-6 space-y-5">
                  {/* Heating type */}
                  <div>
                    <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                      Tipo de calefacción actual *
                    </Label>
                    <select
                      className="mt-1.5 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e2e8f0',
                        color: '#1a1a2e',
                        fontSize: '0.95rem',
                      }}
                      value={savingsForm.heatingType}
                      onChange={e => setSavingsForm(prev => ({ ...prev, heatingType: e.target.value }))}
                    >
                      <option value="">Selecciona...</option>
                      {heatingTypes.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Monthly cost */}
                  <div>
                    <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                      Gasto mensual actual (USD) *
                    </Label>
                    <Input
                      type="number"
                      placeholder="Ej: 150"
                      className="mt-1.5"
                      value={savingsForm.monthlyCost}
                      onChange={e => setSavingsForm(prev => ({ ...prev, monthlyCost: e.target.value }))}
                      style={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e2e8f0',
                        fontSize: '0.95rem',
                        padding: '12px 16px',
                      }}
                    />
                  </div>

                  {/* Square meters */}
                  <div>
                    <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                      Metros cuadrados *
                    </Label>
                    <Input
                      type="number"
                      placeholder="Ej: 120"
                      className="mt-1.5"
                      value={savingsForm.squareMeters}
                      onChange={e => setSavingsForm(prev => ({ ...prev, squareMeters: e.target.value }))}
                      style={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e2e8f0',
                        fontSize: '0.95rem',
                        padding: '12px 16px',
                      }}
                    />
                  </div>

                  {/* Climate zone */}
                  <div>
                    <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                      Ciudad / Zona climática *
                    </Label>
                    <select
                      className="mt-1.5 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e2e8f0',
                        color: '#1a1a2e',
                        fontSize: '0.95rem',
                      }}
                      value={savingsForm.climateZone}
                      onChange={e => setSavingsForm(prev => ({ ...prev, climateZone: e.target.value }))}
                    >
                      <option value="">Selecciona...</option>
                      {climateZones.map(z => (
                        <option key={z.value} value={z.value}>{z.label}</option>
                      ))}
                    </select>
                  </div>

                  <Button
                    className="w-full mt-4 font-semibold uppercase text-sm transition-all hover:brightness-110"
                    style={{
                      backgroundColor: '#022067',
                      color: '#ffffff',
                      padding: '14px',
                      borderRadius: '4px',
                      letterSpacing: '0.05em',
                    }}
                    onClick={calculateSavings}
                  >
                    CALCULAR AHORRO <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>

              {/* Results Panel */}
              <div
                className="rounded-lg p-8"
                style={{ backgroundColor: '#0f0f12' }}
              >
                {!savingsResult ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                    <Calculator size={48} style={{ color: 'rgba(255,255,255,0.15)' }} />
                    <p className="mt-4" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)' }}>
                      Ingresa los datos de tu proyecto para ver los resultados
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3
                      className="font-bold uppercase"
                      style={{ fontSize: '0.9rem', color: '#2a9d8f', letterSpacing: '0.05em' }}
                    >
                      RESULTADOS ANUALES
                    </h3>

                    {/* Comparison bars */}
                    <div className="mt-6 space-y-4">
                      {/* Heat pump */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            Bomba de calor ThermaPro
                          </span>
                          <span className="text-sm font-bold" style={{ color: '#2a9d8f' }}>
                            ${savingsResult.heatPumpAnnualCost.toLocaleString('es-ES')} USD/año
                          </span>
                        </div>
                        <div className="w-full rounded-full h-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                          <div
                            className="h-2.5 rounded-full transition-all duration-1000"
                            style={{
                              width: animatedBars ? `${(savingsResult.heatPumpAnnualCost / Math.max(savingsResult.resistanceCost, 1)) * 100}%` : '0%',
                              backgroundColor: '#2a9d8f',
                              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            }}
                          />
                        </div>
                      </div>

                      {/* Resistance */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            Resistencia eléctrica
                          </span>
                          <span className="text-sm font-bold" style={{ color: '#e63946' }}>
                            ${savingsResult.resistanceCost.toLocaleString('es-ES')} USD/año
                          </span>
                        </div>
                        <div className="w-full rounded-full h-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                          <div
                            className="h-2.5 rounded-full transition-all duration-1000 delay-150"
                            style={{
                              width: animatedBars ? '100%' : '0%',
                              backgroundColor: '#e63946',
                              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            }}
                          />
                        </div>
                      </div>

                      {/* Gas */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            Gas natural
                          </span>
                          <span className="text-sm font-bold" style={{ color: '#f4a261' }}>
                            ${savingsResult.gasCost.toLocaleString('es-ES')} USD/año
                          </span>
                        </div>
                        <div className="w-full rounded-full h-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                          <div
                            className="h-2.5 rounded-full transition-all duration-1000 delay-300"
                            style={{
                              width: animatedBars ? `${(savingsResult.gasCost / Math.max(savingsResult.resistanceCost, 1)) * 100}%` : '0%',
                              backgroundColor: '#f4a261',
                              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            }}
                          />
                        </div>
                      </div>

                      {/* Diesel */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            Diésel / Gasoil
                          </span>
                          <span className="text-sm font-bold" style={{ color: '#f4a261' }}>
                            ${savingsResult.dieselCost.toLocaleString('es-ES')} USD/año
                          </span>
                        </div>
                        <div className="w-full rounded-full h-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                          <div
                            className="h-2.5 rounded-full transition-all duration-1000 delay-450"
                            style={{
                              width: animatedBars ? `${(savingsResult.dieselCost / Math.max(savingsResult.resistanceCost, 1)) * 100}%` : '0%',
                              backgroundColor: '#f4a261',
                              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Savings highlight */}
                    <div
                      className="mt-6 rounded-md p-5"
                      style={{
                        backgroundColor: 'rgba(42,157,143,0.15)',
                        border: '1px solid rgba(42,157,143,0.3)',
                      }}
                    >
                      <p
                        className="text-xs font-medium uppercase"
                        style={{ letterSpacing: '0.1em', color: '#2a9d8f' }}
                      >
                        AHORRO ANUAL CON THERMAPRO
                      </p>
                      <p
                        className="font-black mt-2"
                        style={{ fontSize: '2.5rem', color: '#2a9d8f', lineHeight: 1 }}
                      >
                        <AnimatedNumber value={savingsResult.annualSavings} prefix="$" suffix=" USD" />
                      </p>
                      <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Retorno de inversión: <span className="font-semibold text-white">{savingsResult.roiYears} años</span>
                      </p>
                    </div>

                    {/* Extra stats */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div
                        className="rounded-md p-4 text-center"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                      >
                        <p className="text-xs uppercase" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
                          Ahorro 10 años
                        </p>
                        <p className="font-bold mt-1 text-lg" style={{ color: '#ffffff' }}>
                          <AnimatedNumber value={savingsResult.savings10Years} prefix="$" />
                        </p>
                      </div>
                      <div
                        className="rounded-md p-4 text-center"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                      >
                        <p className="text-xs uppercase" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
                          CO₂ evitado
                        </p>
                        <p className="font-bold mt-1 text-lg" style={{ color: '#2a9d8f' }}>
                          <AnimatedNumber value={savingsResult.co2Prevented} suffix=" kg/año" />
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3 mt-6 flex-wrap">
                      <Button
                        className="font-semibold uppercase text-xs transition-all hover:brightness-110 hover:scale-[1.02]"
                        style={{
                          backgroundColor: '#e63946',
                          color: '#ffffff',
                          padding: '12px 24px',
                          borderRadius: '4px',
                        }}
                        onClick={() => navigate('/productos')}
                      >
                        COTIZAR EQUIPO <ArrowRight size={14} className="ml-1" />
                      </Button>
                      <Button
                        className="font-semibold uppercase text-xs transition-all hover:brightness-110"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.2)',
                          padding: '12px 24px',
                          borderRadius: '4px',
                        }}
                        onClick={() => {
                          toast.info('Función disponible para distribuidores registrados');
                        }}
                      >
                        DESCARGAR PDF
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3B: Configurador de Proyecto
            ═══════════════════════════════════════════ */}
        <section
          id="configurador"
          className="wizard-section"
          style={{ backgroundColor: '#f8f9fa', padding: 'clamp(5rem, 8vw, 8rem) 0' }}
        >
          <div className="container-tp" style={{ maxWidth: '800px' }}>
            {/* Section header */}
            <div className="text-center mb-10">
              <span
                className="text-xs font-medium uppercase"
                style={{ letterSpacing: '0.12em', color: '#2a9d8f' }}
              >
                SELECTOR RÁPIDO
              </span>
              <h2
                className="font-extrabold uppercase mt-3"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#1a1a2e', lineHeight: 1.1 }}
              >
                ENCUENTRA TU EQUIPO EN 30 SEGUNDOS
              </h2>
            </div>

            {/* Wizard container */}
            <div
              className="bg-white rounded-lg p-8 md:p-10 border"
              style={{ borderColor: '#e2e8f0' }}
            >
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-0 mb-8">
                {[1, 2, 3, 4, 5].map(s => (
                  <div key={s} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: wizard.step > s || (wizardComplete && wizard.step === 5)
                          ? '#2a9d8f'
                          : wizard.step === s
                            ? '#022067'
                            : '#e2e8f0',
                        transform: wizard.step === s ? 'scale(1.2)' : 'scale(1)',
                      }}
                    >
                      {(wizard.step > s || wizardComplete) && (
                        <Check size={8} style={{ color: '#ffffff' }} />
                      )}
                    </div>
                    {s < 5 && (
                      <div
                        className="w-8 md:w-12 h-0.5 transition-all duration-500"
                        style={{
                          backgroundColor: wizard.step > s ? '#2a9d8f' : '#e2e8f0',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step content */}
              {!wizardComplete ? (
                <div>
                  {currentQuestion && (
                    <>
                      <h3
                        className="text-center font-bold"
                        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#1a1a2e', minHeight: '3rem' }}
                      >
                        {currentQuestion.question}
                      </h3>

                      <div className="flex flex-wrap justify-center gap-3 mt-8">
                        {currentQuestion.options.map(opt => {
                          const Icon = 'icon' in opt ? opt.icon : null;
                          const isSelected = wizard[currentQuestion.field] === opt.value;
                          return (
                            <button
                              key={opt.value}
                              onClick={() => selectOption(currentQuestion.field, opt.value)}
                              className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 transition-all duration-200 min-w-[140px] px-5 py-4"
                              style={{
                                borderColor: isSelected ? '#022067' : '#e2e8f0',
                                backgroundColor: isSelected ? '#022067' : '#ffffff',
                                color: isSelected ? '#ffffff' : '#1a1a2e',
                              }}
                              onMouseEnter={e => {
                                if (!isSelected) {
                                  e.currentTarget.style.borderColor = '#022067';
                                  e.currentTarget.style.backgroundColor = 'rgba(21,72,160,0.05)';
                                }
                              }}
                              onMouseLeave={e => {
                                if (!isSelected) {
                                  e.currentTarget.style.borderColor = '#e2e8f0';
                                  e.currentTarget.style.backgroundColor = '#ffffff';
                                }
                              }}
                            >
                              {Icon && <Icon size={20} />}
                              <span className="text-sm font-medium">{opt.label}</span>
                              {'desc' in opt && opt.desc && (
                                <span className="text-xs" style={{ opacity: 0.7 }}>{opt.desc}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between mt-10">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          disabled={wizard.step === 1}
                          className="font-medium text-sm transition-all"
                          style={{
                            borderColor: '#e2e8f0',
                            color: wizard.step === 1 ? '#a0aec0' : '#4a5568',
                            padding: '10px 20px',
                          }}
                        >
                          <ChevronLeft size={16} className="mr-1" /> Anterior
                        </Button>
                        <Button
                          onClick={nextStep}
                          disabled={!wizard[currentQuestion.field]}
                          className="font-semibold text-sm uppercase transition-all hover:brightness-110 disabled:opacity-50"
                          style={{
                            backgroundColor: '#022067',
                            color: '#ffffff',
                            padding: '10px 24px',
                          }}
                        >
                          {wizard.step === 5 ? 'VER RESULTADO' : 'Siguiente'} <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Result state */
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ backgroundColor: 'rgba(42,157,143,0.15)' }}
                  >
                    <Check size={32} style={{ color: '#2a9d8f' }} />
                  </div>
                  <h3
                    className="font-extrabold uppercase mt-5"
                    style={{ fontSize: '1.5rem', color: '#1a1a2e' }}
                  >
                    EQUIPO RECOMENDADO
                  </h3>
                  <div
                    className="mt-6 rounded-lg p-6 text-left border"
                    style={{ backgroundColor: '#f8f9fa', borderColor: '#e2e8f0' }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(21,72,160,0.1)' }}
                      >
                        <Cpu size={28} style={{ color: '#022067' }} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>
                          {getRecommendation().split('—')[0]?.trim()}
                        </p>
                        <p className="text-sm mt-1" style={{ color: '#4a5568' }}>
                          — {getRecommendation().split('—')[1]?.trim()}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <span
                            className="text-xs font-medium uppercase px-2 py-0.5 rounded"
                            style={{ backgroundColor: 'rgba(42,157,143,0.12)', color: '#2a9d8f' }}
                          >
                            COP 4.5
                          </span>
                          <span
                            className="text-xs font-medium uppercase px-2 py-0.5 rounded"
                            style={{ backgroundColor: 'rgba(230,57,70,0.12)', color: '#e63946' }}
                          >
                            R32
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6 justify-center flex-wrap">
                    <Button
                      className="font-semibold uppercase text-xs transition-all hover:brightness-110"
                      style={{
                        backgroundColor: '#022067',
                        color: '#ffffff',
                        padding: '12px 24px',
                        borderRadius: '4px',
                      }}
                      onClick={() => navigate('/productos')}
                    >
                      VER TODOS LOS PRODUCTOS <ArrowRight size={14} className="ml-1" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setWizard({ step: 1, projectType: '', squareMeters: '', zone: '', usage: '', emitter: '' });
                        setWizardComplete(false);
                      }}
                      className="font-medium text-sm"
                      style={{ padding: '12px 24px', borderColor: '#e2e8f0', color: '#4a5568' }}
                    >
                      REPETIR
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3C: Simulador de Negocio
            ═══════════════════════════════════════════ */}
        <section
          id="simulador"
          className="sim-section"
          style={{ backgroundColor: '#ffffff', padding: 'clamp(5rem, 8vw, 8rem) 0' }}
        >
          <div className="container-tp" style={{ maxWidth: '1000px' }}>
            {/* Section header */}
            <div className="text-center mb-12">
              <span
                className="text-xs font-medium uppercase"
                style={{ letterSpacing: '0.12em', color: '#2a9d8f' }}
              >
                SIMULADOR DE NEGOCIO
              </span>
              <h2
                className="font-extrabold uppercase mt-3"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', color: '#1a1a2e', lineHeight: 1.1 }}
              >
                PROYECTA TUS INGRESOS COMO DISTRIBUIDOR
              </h2>
              <p className="mt-3" style={{ fontSize: '1rem', color: '#4a5568' }}>
                Ajusta los parámetros y descubre tu potencial de ingresos con ThermaPro.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Sliders Panel */}
              <div
                className="rounded-lg p-8 border"
                style={{ backgroundColor: '#f8f9fa', borderColor: '#e2e8f0' }}
              >
                <h3
                  className="font-bold uppercase"
                  style={{ fontSize: '0.9rem', color: '#1a1a2e', letterSpacing: '0.05em' }}
                >
                  TUS PARÁMETROS
                </h3>

                <div className="mt-6 space-y-8">
                  {/* Units per month */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                        Unidades al mes
                      </Label>
                      <span
                        className="text-sm font-bold px-3 py-1 rounded"
                        style={{ backgroundColor: 'rgba(21,72,160,0.1)', color: '#022067' }}
                      >
                        {sim.unitsPerMonth}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={sim.unitsPerMonth}
                      onChange={e => setSim(prev => ({ ...prev, unitsPerMonth: parseInt(e.target.value) }))}
                      className="w-full accent-[#022067]"
                      style={{ accentColor: '#022067' }}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs" style={{ color: '#4a5568' }}>1</span>
                      <span className="text-xs" style={{ color: '#4a5568' }}>20</span>
                    </div>
                  </div>

                  {/* Margin percent */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                        Margen que aplicarás (%)
                      </Label>
                      <span
                        className="text-sm font-bold px-3 py-1 rounded"
                        style={{ backgroundColor: 'rgba(42,157,143,0.1)', color: '#2a9d8f' }}
                      >
                        {sim.marginPercent}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      value={sim.marginPercent}
                      onChange={e => setSim(prev => ({ ...prev, marginPercent: parseInt(e.target.value) }))}
                      className="w-full"
                      style={{ accentColor: '#2a9d8f' }}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs" style={{ color: '#4a5568' }}>10%</span>
                      <span className="text-xs" style={{ color: '#4a5568' }}>50%</span>
                    </div>
                  </div>

                  {/* Average price */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                        Precio promedio instalación (USD)
                      </Label>
                      <span
                        className="text-sm font-bold px-3 py-1 rounded"
                        style={{ backgroundColor: 'rgba(230,57,70,0.1)', color: '#e63946' }}
                      >
                        ${sim.avgPrice.toLocaleString('es-ES')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1500}
                      max={8000}
                      step={100}
                      value={sim.avgPrice}
                      onChange={e => setSim(prev => ({ ...prev, avgPrice: parseInt(e.target.value) }))}
                      className="w-full"
                      style={{ accentColor: '#e63946' }}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs" style={{ color: '#4a5568' }}>$1,500</span>
                      <span className="text-xs" style={{ color: '#4a5568' }}>$8,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Panel */}
              <div
                className="rounded-lg p-8"
                style={{ backgroundColor: '#0f0f12' }}
              >
                <h3
                  className="font-bold uppercase"
                  style={{ fontSize: '0.9rem', color: '#2a9d8f', letterSpacing: '0.05em' }}
                >
                  PROYECCIÓN DE INGRESOS
                </h3>

                <div className="mt-6 space-y-6">
                  {/* Monthly income */}
                  <div
                    className="rounded-md p-5"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <p className="text-xs uppercase" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
                      Ingreso mensual estimado
                    </p>
                    <p className="font-black mt-2" style={{ fontSize: '2.2rem', color: '#ffffff', lineHeight: 1 }}>
                      <AnimatedNumber value={monthlyIncome} prefix="$" suffix=" USD" />
                    </p>
                  </div>

                  {/* Annual income */}
                  <div
                    className="rounded-md p-5"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <p className="text-xs uppercase" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
                      Ingreso anual estimado
                    </p>
                    <p className="font-black mt-2" style={{ fontSize: '2.2rem', color: '#2a9d8f', lineHeight: 1 }}>
                      <AnimatedNumber value={annualIncome} prefix="$" suffix=" USD" />
                    </p>
                  </div>

                  {/* Year-by-year projection */}
                  <div className="mt-4">
                    <p
                      className="text-xs font-medium uppercase mb-4"
                      style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}
                    >
                      PROYECCIÓN A 3 AÑOS
                    </p>
                    <div className="space-y-3">
                      {/* Year 1 */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium w-12" style={{ color: 'rgba(255,255,255,0.6)' }}>Año 1</span>
                        <div className="flex-1 rounded-full h-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                          <div
                            className="h-4 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                            style={{
                              width: '100%',
                              backgroundColor: '#022067',
                            }}
                          >
                            <span className="text-xs font-bold" style={{ color: '#fff' }}>
                              $<AnimatedNumber value={year1} />
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Year 2 */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium w-12" style={{ color: 'rgba(255,255,255,0.6)' }}>Año 2</span>
                        <div className="flex-1 rounded-full h-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                          <div
                            className="h-4 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                            style={{
                              width: `${Math.min((year2 / year3) * 100, 100)}%`,
                              backgroundColor: '#2a9d8f',
                            }}
                          >
                            <span className="text-xs font-bold" style={{ color: '#fff' }}>
                              $<AnimatedNumber value={year2} />
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Year 3 */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium w-12" style={{ color: 'rgba(255,255,255,0.6)' }}>Año 3</span>
                        <div className="flex-1 rounded-full h-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                          <div
                            className="h-4 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                            style={{
                              width: '100%',
                              background: 'linear-gradient(135deg, #e63946 0%, #f4a261 100%)',
                            }}
                          >
                            <span className="text-xs font-bold" style={{ color: '#fff' }}>
                              $<AnimatedNumber value={year3} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    className="w-full font-semibold uppercase text-sm transition-all hover:brightness-110 hover:scale-[1.02]"
                    style={{
                      backgroundColor: '#e63946',
                      color: '#ffffff',
                      padding: '14px',
                      borderRadius: '4px',
                    }}
                    onClick={() => navigate('/registro')}
                  >
                    QUIERO EMPEZAR CON ESTAS CIFRAS <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '4rem 0' }}>
          <div className="container-tp text-center">
            <h3
              className="font-bold uppercase"
              style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', color: '#1a1a2e' }}
            >
              ¿QUIERES OFRECER ESTAS HERRAMIENTAS A TUS CLIENTES?
            </h3>
            <p className="mt-3" style={{ fontSize: '1rem', color: '#4a5568', maxWidth: '500px', margin: '1rem auto 0' }}>
              Como distribuidor ThermaPro, recibes acceso a calculadoras con tu branding y precios personalizados.
            </p>
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              <Link
                to="/distribuidor"
                className="inline-flex items-center gap-1 font-semibold text-sm uppercase px-6 py-3 rounded transition-all hover:brightness-110 hover:scale-[1.02]"
                style={{ backgroundColor: '#e63946', color: '#ffffff' }}
              >
                SER DISTRIBUIDOR <ArrowRight size={16} />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-1 font-semibold text-sm uppercase px-6 py-3 rounded transition-all hover:brightness-110 border"
                style={{ borderColor: '#022067', color: '#022067', backgroundColor: 'transparent' }}
              >
                CONTACTAR ASESOR
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
