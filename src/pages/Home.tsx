import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Tag, GraduationCap, Headphones, Lock, ArrowRight,
} from 'lucide-react';
import Layout from '@/components/Layout';
import {
  stats, featureCards,
  certifications, regions, distributorBenefits,
} from '@/lib/data';
import { useProducts } from '@/hooks/useProducts';
import { useAuthContext } from '@/context/AuthContext';
import type { Product } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────
   Hero Section
   ──────────────────────── */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Animated particles on canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w: number = 0, h: number = 0;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const PARTICLE_COUNT = 60;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.2,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(42,157,143,${p.alpha})`;
        ctx.fill();
      });

      // Draw faint connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(42,157,143,${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* GSAP entrance animations */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '100dvh', backgroundColor: '#0f0f12' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          filter: 'brightness(0.35)',
        }}
      />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(21,72,160,0.25) 0%, rgba(15,15,18,0.7) 70%, #0f0f12 100%)',
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
      />

      {/* Bottom fade gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 gradient-hero-fade"
        style={{ height: '35%', zIndex: 5 }}
      />

      {/* Content overlay */}
      <div
        ref={contentRef}
        className="relative flex flex-col items-center justify-end text-center px-6"
        style={{ zIndex: 10, height: '100%', paddingBottom: '15vh', pointerEvents: 'none' }}
      >
        {/* Eyebrow */}
        <span
          className="uppercase font-medium mb-6"
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          TECNOLOGIA TERMICA PARA LATINOAMERICA
        </span>

        {/* Main headline */}
        <h1
          ref={titleRef}
          className="font-extrabold uppercase text-white"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 9rem)',
            lineHeight: 1.05,
            textShadow: '0 4px 40px rgba(0,0,0,0.5)',
            opacity: 0,
          }}
        >
          DEJA TU MARCA
        </h1>

        {/* Subheadline */}
        <p
          ref={subtitleRef}
          className="hidden sm:block mt-6 max-w-xl"
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.5,
            opacity: 0,
          }}
        >
          Conviertete en distribuidor oficial y accede a precios exclusivos,
          formacion tecnica y soporte integral.
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8"
          style={{ pointerEvents: 'auto', opacity: 0 }}
        >
          <Link
            to="/registro"
            className="text-white font-semibold uppercase px-8 py-3.5 rounded transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            style={{
              backgroundColor: '#e63946',
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
            }}
          >
            REGISTRATE COMO DISTRIBUIDOR &rarr;
          </Link>
          <Link
            to="/productos"
            className="text-white font-medium uppercase px-8 py-3.5 rounded transition-all duration-200 hover:bg-white/10"
            style={{
              fontSize: '0.875rem',
              border: '1px solid rgba(255,255,255,0.4)',
              letterSpacing: '0.05em',
            }}
          >
            VER PRODUCTOS
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────
   Value Proposition Section
   ──────────────────────── */
const iconMap: Record<string, React.ElementType> = {
  Tag, GraduationCap, Headphones,
};

function ValuePropositionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current[0], start: 'top 85%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <div className="container-tp">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span style={{ width: '2rem', height: '2px', backgroundColor: '#e63946' }} />
            <span
              className="font-medium uppercase"
              style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: '#2a9d8f' }}
            >
              POR QUE THERMAPRO
            </span>
          </div>
          <h2
            className="font-extrabold uppercase"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 4rem)', color: '#1a1a2e', lineHeight: 1.1 }}
          >
            TECNOLOGIA QUE MULTIPLICA TU NEGOCIO
          </h2>
          <p
            className="mt-4 mx-auto max-w-xl"
            style={{ fontSize: '1.1rem', color: '#4a5568', lineHeight: 1.6 }}
          >
            Mas que bombas de calor: formamos distribuidores exitosos con soporte tecnico,
            herramientas de venta y precios que dejan margen.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((card, i) => {
            const IconComp = iconMap[card.icon];
            return (
              <div
                key={card.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="bg-white rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                style={{ borderColor: '#e2e8f0' }}
              >
                <div
                  className="flex items-center justify-center rounded-lg mb-6"
                  style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: card.iconBg,
                  }}
                >
                  {IconComp && <IconComp size={20} style={{ color: card.iconColor }} />}
                </div>
                <h3
                  className="font-bold uppercase mb-3"
                  style={{ fontSize: '1.1rem', color: '#1a1a2e' }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#4a5568', lineHeight: 1.6 }}>
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────
   Product Card Component
   ──────────────────────── */
const badgeColorMap = {
  teal: { bg: 'rgba(42,157,143,0.12)', text: '#2a9d8f' },
  amber: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b' },
  red: { bg: 'rgba(230,57,70,0.12)', text: '#e63946' },
};

function ProductCard({ product, cardRef, userRole }: { product: Product; cardRef?: (el: HTMLDivElement | null) => void; userRole: string }) {
  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card group"
      style={{ borderColor: '#e2e8f0' }}
    >
      {/* Image */}
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{ aspectRatio: '4/3', backgroundColor: '#f8f9fa' }}
      >
        <img
          src={product.image || '/product-aeroterm.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = '/product-aeroterm.jpg'; }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <span
          className="font-medium uppercase"
          style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: '#2a9d8f' }}
        >
          {product.categoryLabel}
        </span>
        <h3
          className="font-bold uppercase mt-2 mb-2"
          style={{ fontSize: '1.1rem', color: '#1a1a2e' }}
        >
          {product.name}
        </h3>
        <p
          className="mb-4"
          style={{ fontSize: '0.875rem', color: '#4a5568', lineHeight: 1.5 }}
        >
          {product.specs}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.badges.map((badge) => (
            <span
              key={badge.label}
              className="font-medium uppercase rounded px-2.5 py-0.5"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.05em',
                backgroundColor: badgeColorMap[badge.color].bg,
                color: badgeColorMap[badge.color].text,
              }}
            >
              {badge.label}
            </span>
          ))}
        </div>

        {/* Price + Link */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #e2e8f0' }}>
          {userRole === 'visitor' ? (
            <div className="flex items-center gap-1.5">
              <Lock size={12} style={{ color: '#e63946' }} />
              <Link
                to="/registro"
                className="font-semibold uppercase transition-colors duration-200 hover:underline"
                style={{ fontSize: '0.75rem', color: '#e63946' }}
              >
                PRECIOS AL REGISTRARSE
              </Link>
            </div>
          ) : userRole === 'personal_natural' && product.salePrice ? (
            <span className="font-bold" style={{ fontSize: '0.8rem', color: '#2a9d8f' }}>
              ${product.salePrice.toLocaleString('es-ES')} USD
              <span className="block text-xs font-normal" style={{ color: '#94a3b8' }}>Precio venta</span>
            </span>
          ) : product.price ? (
            <span className="font-bold" style={{ fontSize: '0.8rem', color: '#1548a0' }}>
              ${product.price.toLocaleString('es-ES')} USD
              <span className="block text-xs font-normal" style={{ color: '#94a3b8' }}>Precio distribuidor</span>
            </span>
          ) : (
            <span className="text-xs text-slate-400">Consultar</span>
          )}
          <Link
            to={`/productos/${product.slug}`}
            className="font-semibold uppercase flex items-center gap-1 transition-colors duration-200"
            style={{ fontSize: '0.8rem', color: '#e63946' }}
          >
            VER DETALLE <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────
   Featured Products Section
   ──────────────────────── */
function FeaturedProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { products: supabaseProducts, isLoading } = useProducts();
  const { role } = useAuthContext();

  // Show first 6 products from Supabase, or loading skeletons
  const displayProducts = supabaseProducts.slice(0, 6);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current[0], start: 'top 85%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [displayProducts]);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="container-tp">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span style={{ width: '2rem', height: '2px', backgroundColor: '#e63946' }} />
            <span
              className="font-medium uppercase"
              style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: '#2a9d8f' }}
            >
              CATALOGO TECNICO
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2
                className="font-extrabold uppercase"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 4rem)', color: '#1a1a2e', lineHeight: 1.1 }}
              >
                EQUIPOS PARA CADA APLICACION
              </h2>
              <p
                className="mt-4 max-w-xl"
                style={{ fontSize: '1.1rem', color: '#4a5568', lineHeight: 1.6 }}
              >
                Desde aerotermia residencial hasta sistemas geotermicos industriales.
                Seleccionamos el equipo ideal para tu proyecto.
              </p>
            </div>
            <Link
              to="/productos"
              className="font-semibold uppercase flex items-center gap-1 transition-colors duration-200 shrink-0"
              style={{ fontSize: '0.875rem', color: '#e63946' }}
            >
              VER TODOS LOS PRODUCTOS <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: '#e2e8f0' }}>
                <Skeleton className="w-full" style={{ aspectRatio: '4/3' }} />
                <div className="p-6">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3 mb-3" />
                  <div className="flex gap-2 mb-3">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                cardRef={(el) => { cardsRef.current[i] = el; }}
                userRole={role}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ────────────────────────
   Animated Counter Hook
   ──────────────────────── */
function useAnimatedCounter(target: number, duration = 2000, startOnView = true) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out-expo
            const eased = 1 - Math.pow(2, -10 * progress);
            setValue(eased * target);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setValue(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, startOnView]);

  return { value, ref };
}

/* ────────────────────────
   Stats Section
   ──────────────────────── */
function StatItem({ stat }: { stat: typeof stats[0] }) {
  const isDecimal = stat.numericValue < 10 && stat.numericValue % 1 !== 0;
  const { value, ref } = useAnimatedCounter(stat.numericValue, 2000);

  const formattedValue = isDecimal
    ? value.toFixed(1)
    : stat.suffix === '%'
      ? Math.round(value).toString()
      : value >= 1000
        ? Math.round(value).toLocaleString()
        : Math.round(value).toString();

  return (
    <div ref={ref} className="text-center">
      <span
        className="block mb-2 mx-auto"
        style={{ width: '2rem', height: '2px', backgroundColor: '#e63946' }}
      />
      <div
        className="font-black uppercase text-white"
        style={{ fontSize: 'clamp(2.5rem, 4vw, 5rem)', lineHeight: 1 }}
      >
        {stat.prefix}{formattedValue}{stat.suffix}
      </div>
      <div
        className="font-medium uppercase mt-3"
        style={{
          fontSize: '0.875rem',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="gradient-teal-glow" style={{ padding: '5rem 0' }}>
      <div className="container-tp">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────
   Distributor CTA Section
   ──────────────────────── */
function DistributorCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (!children) return;

      gsap.fromTo(
        children[0], // eyebrow
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' } }
      );

      gsap.fromTo(
        children[1], // title
        { y: '105%', opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' } }
      );

      gsap.fromTo(
        children[2], // subtitle
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' } }
      );

      gsap.fromTo(
        children[3], // pills
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' } }
      );

      gsap.fromTo(
        children[4], // ctas
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' } }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#0f0f12' }}
    >
      <div
        ref={contentRef}
        className="container-tp text-center max-w-3xl mx-auto flex flex-col items-center"
      >
        <span
          className="font-medium uppercase mb-4"
          style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: '#2a9d8f' }}
        >
          PROGRAMA DE DISTRIBUIDORES
        </span>

        <h2
          className="font-extrabold uppercase text-white"
          style={{ fontSize: 'clamp(2.2rem, 4vw, 5rem)', lineHeight: 1.1 }}
        >
          CONVIERTE EN DISTRIBUIDOR OFICIAL
        </h2>

        <p
          className="mt-6 max-w-xl"
          style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}
        >
          Accede a precios exclusivos, formacion tecnica certificada, herramientas de venta
          y el respaldo de un equipo de ingenieria dedicado a tu exito.
        </p>

        {/* Benefit pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {distributorBenefits.map((benefit) => (
            <span
              key={benefit}
              className="glass-card font-medium text-white rounded-full"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
            >
              {benefit}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Link
            to="/distribuidor"
            className="text-white font-semibold uppercase px-10 py-4 rounded transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            style={{ backgroundColor: '#e63946', fontSize: '0.875rem', letterSpacing: '0.05em' }}
          >
            POSTULARME COMO DISTRIBUIDOR &rarr;
          </Link>
          <Link
            to="/distribuidor"
            className="text-white font-medium uppercase px-10 py-4 rounded transition-all duration-200 hover:bg-white/10"
            style={{ fontSize: '0.875rem', border: '1px solid rgba(255,255,255,0.4)' }}
          >
            CONOCER EL PROGRAMA
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────
   Trust / Certifications Section
   ──────────────────────── */
function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<(HTMLDivElement | null)[]>([]);
  const regionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        certsRef.current.filter(Boolean),
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: certsRef.current[0], start: 'top 85%' },
        }
      );

      gsap.fromTo(
        regionsRef.current.filter(Boolean),
        { scale: 0.95, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: regionsRef.current[0], start: 'top 85%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#f8f9fa', padding: '6rem 0' }}
    >
      <div className="container-tp">
        {/* Certifications */}
        <div className="text-center mb-12">
          <span
            className="font-medium uppercase mb-8 block"
            style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: '#4a5568' }}
          >
            CERTIFICACIONES Y NORMAS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {certifications.map((cert, i) => (
              <div
                key={cert}
                ref={(el) => { certsRef.current[i] = el; }}
                className="flex items-center justify-center transition-all duration-300 hover:grayscale-0"
                style={{
                  height: '48px',
                  filter: 'grayscale(100%)',
                  opacity: 0.5,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.5'; }}
              >
                <span
                  className="font-bold uppercase"
                  style={{
                    fontSize: '0.9rem',
                    letterSpacing: '0.1em',
                    color: '#1a1a2e',
                  }}
                >
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div className="text-center" style={{ marginTop: '4rem' }}>
          <span
            className="font-medium uppercase mb-8 block"
            style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: '#4a5568' }}
          >
            PRESENCIA EN LATINOAMERICA
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {regions.map((region, i) => (
              <div
                key={region}
                ref={(el) => { regionsRef.current[i] = el; }}
                className="bg-white border rounded-full font-semibold transition-all duration-200 cursor-default"
                style={{
                  borderColor: '#e2e8f0',
                  color: '#1a1a2e',
                  fontSize: '0.875rem',
                  padding: '0.75rem 1.5rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1548a0';
                  e.currentTarget.style.backgroundColor = 'rgba(21,72,160,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                {region}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────
   Home Page
   ──────────────────────── */
export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ValuePropositionSection />
      <FeaturedProductsSection />
      <StatsSection />
      <DistributorCTASection />
      <TrustSection />
    </Layout>
  );
}
