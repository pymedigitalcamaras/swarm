import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Lock,
  ArrowRight,
  Zap,
  TrendingUp,
  Thermometer,
  Calculator,
  Users,
} from 'lucide-react';
import Layout from '@/components/Layout';
import { categoryFilters } from '@/lib/data';
import { useProducts } from '@/hooks/useProducts';
import { useAuthContext } from '@/context/AuthContext';
import type { Product } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────
   Category Filter Bar
   ──────────────────────── */
function CategoryFilterBar({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}) {
  const filterBarRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeIdx = categoryFilters.findIndex((c) => c.key === activeCategory);
    const activeBtn = buttonsRef.current[activeIdx];
    const indicator = indicatorRef.current;
    if (!activeBtn || !indicator) return;

    const rect = activeBtn.getBoundingClientRect();
    const parentRect = activeBtn.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    gsap.to(indicator, {
      x: activeBtn.offsetLeft,
      width: rect.width,
      duration: 0.25,
      ease: 'power2.out',
    });
  }, [activeCategory]);

  return (
    <div
      ref={filterBarRef}
      className="sticky z-30 border-b"
      style={{
        top: '72px',
        backgroundColor: 'rgba(248,249,250,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: '#e2e8f0',
      }}
    >
      <div className="container-tp">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide"
          style={{ padding: '1rem 0', scrollbarWidth: 'none' }}
        >
          {/* Sliding indicator */}
          <div
            ref={indicatorRef}
            className="absolute top-0 h-full rounded"
            style={{
              backgroundColor: '#1548a0',
              height: 'calc(100% - 2rem)',
              marginTop: '1rem',
              zIndex: 0,
            }}
          />
          {categoryFilters.map((cat, i) => (
            <button
              key={cat.key}
              ref={(el) => { buttonsRef.current[i] = el; }}
              onClick={() => onCategoryChange(cat.key)}
              className="relative z-10 whitespace-nowrap font-medium uppercase transition-colors duration-200"
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.05em',
                padding: '0.5rem 1.25rem',
                borderRadius: '4px',
                border: '1px solid transparent',
                backgroundColor: activeCategory === cat.key ? 'transparent' : 'transparent',
                color: activeCategory === cat.key ? '#ffffff' : '#4a5568',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.key) {
                  e.currentTarget.style.backgroundColor = 'rgba(21,72,160,0.08)';
                  e.currentTarget.style.color = '#1548a0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.key) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#4a5568';
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────
   Product Card
   ──────────────────────── */
const badgeColorMap = {
  teal: { bg: 'rgba(42,157,143,0.12)', text: '#2a9d8f' },
  amber: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b' },
  red: { bg: 'rgba(230,57,70,0.12)', text: '#e63946' },
};

function ProductCard({ product, cardRef, userRole }: { product: Product; cardRef?: (el: HTMLDivElement | null) => void; userRole: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    power: <Zap size={12} />,
    cop: <TrendingUp size={12} />,
    temp: <Thermometer size={12} />,
  };

  // Determine badge icon type from label content
  const getBadgeIcon = (label: string) => {
    if (label.toLowerCase().includes('cop')) return iconMap.cop;
    if (label.toLowerCase().includes('°') || label.toLowerCase().includes('c') || label.toLowerCase().includes('db')) return iconMap.temp;
    return iconMap.power;
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg border overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
      style={{ borderColor: '#e2e8f0' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = 'rgba(21,72,160,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}
    >
      {/* Image area */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ aspectRatio: '4/3', backgroundColor: '#f8f9fa' }}
      >
        <img
          src={product.image || '/product-aeroterm.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = '/product-aeroterm.jpg'; }}
        />
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 font-medium uppercase text-white"
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.05em',
            backgroundColor: 'rgba(21,72,160,0.9)',
            padding: '0.35rem 0.75rem',
            borderRadius: '0 0 4px 0',
          }}
        >
          {product.categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <h3
          className="font-bold uppercase"
          style={{ fontSize: '1.1rem', color: '#1a1a2e' }}
        >
          {product.name}
        </h3>
        <p
          className="mt-2"
          style={{
            fontSize: '0.875rem',
            color: '#4a5568',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.specs}
        </p>

        {/* Spec badges */}
        <div className="flex flex-wrap gap-2" style={{ marginTop: '0.75rem' }}>
          {product.badges.map((badge) => (
            <span
              key={badge.label}
              className="font-medium uppercase rounded flex items-center gap-1"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.05em',
                backgroundColor: badgeColorMap[badge.color].bg,
                color: badgeColorMap[badge.color].text,
                padding: '0.25rem 0.75rem',
              }}
            >
              {getBadgeIcon(badge.label)}
              {badge.label}
            </span>
          ))}
        </div>

        {/* Price row */}
        <div
          className="flex items-center justify-between"
          style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          {userRole === 'visitor' ? (
            <Link
              to="/registro"
              className="flex items-center gap-1.5 font-semibold uppercase transition-all duration-200 hover:scale-[1.02]"
              style={{ fontSize: '0.8rem', color: '#e63946' }}
            >
              <Lock size={14} />
              <span className="hover:underline">REGISTRESE PARA VER PRECIO</span>
            </Link>
          ) : userRole === 'personal_natural' && product.salePrice ? (
            <div>
              <span
                className="font-bold"
                style={{ fontSize: '0.9rem', color: '#2a9d8f' }}
              >
                ${product.salePrice.toLocaleString('es-ES')} USD
              </span>
              <span className="block text-xs" style={{ color: '#94a3b8' }}>Precio venta</span>
            </div>
          ) : product.price ? (
            <div>
              <span
                className="font-bold"
                style={{ fontSize: '0.9rem', color: '#1548a0' }}
              >
                ${product.price.toLocaleString('es-ES')} USD
              </span>
              <span className="block text-xs" style={{ color: '#94a3b8' }}>Precio distribuidor</span>
            </div>
          ) : (
            <span className="text-sm text-slate-400">Consultar</span>
          )}
          <Link
            to={`/productos/${product.slug}`}
            className="font-semibold uppercase flex items-center gap-1 transition-colors duration-200 shrink-0"
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
   Skeleton Card for loading
   ──────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: '#e2e8f0' }}>
      <Skeleton className="w-full" style={{ aspectRatio: '4/3' }} />
      <div style={{ padding: '1.5rem' }}>
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

/* ────────────────────────
   Main Products Page
   ──────────────────────── */
export default function Productos() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const { products, isLoading } = useProducts();
  const { role } = useAuthContext();

  // Filter products
  const filteredProducts = activeCategory === 'todos'
    ? products
    : products.filter((p) => p.category === activeCategory);

  // GSAP refs
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const distributorCtaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Header entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headerRef.current) return;
      const children = headerRef.current.children;

      gsap.fromTo(
        children[0],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(
        children[1],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo(
        children[2],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
      );
      gsap.fromTo(
        children[3],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 }
      );
    });

    return () => ctx.revert();
  }, []);

  // Scroll-triggered card animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length === 0) return;

      gsap.fromTo(
        validCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [filteredProducts]);

  // CTA section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ctaRef.current) return;
      gsap.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Distributor CTA animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!distributorCtaRef.current) return;
      gsap.fromTo(
        distributorCtaRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: distributorCtaRef.current, start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Handle filter change with animation
  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    // Reset card refs
    cardsRef.current = [];
    // Scroll to grid top smoothly
    if (gridRef.current) {
      const y = gridRef.current.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <Layout>
      {/* ─── Section 1: Page Header ─── */}
      <section
        className="gradient-teal-glow"
        style={{
          padding: '10rem 0 5rem 0',
        }}
      >
        <div className="container-tp" ref={headerRef}>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span
              style={{
                width: '2rem',
                height: '2px',
                backgroundColor: '#e63946',
              }}
            />
            <span
              className="font-medium uppercase"
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              CATALOGO TECNICO 2025
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-black uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 6rem)',
              color: '#ffffff',
              lineHeight: 1.0,
            }}
          >
            BOMBAS DE CALOR
          </h1>

          {/* Subtitle */}
          <p
            className="mt-4"
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              lineHeight: 1.5,
            }}
          >
            Seleccion completa de equipos para aerotermia, geotermia, agua caliente sanitaria,
            climatizacion de piscinas e industria.
          </p>

          {/* Pricing lock indicator */}
          {role === 'visitor' && (
            <div className="flex flex-wrap items-center gap-4" style={{ marginTop: '2rem' }}>
              <span
                className="font-medium uppercase flex items-center gap-2"
                style={{
                  fontSize: '0.8rem',
                  color: '#e63946',
                  backgroundColor: 'rgba(230,57,70,0.12)',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                }}
              >
                <Lock size={14} />
                PRECIOS VISIBLES SOLO PARA DISTRIBUIDORES REGISTRADOS
              </span>
              <Link
                to="/registro"
                className="font-semibold uppercase transition-all duration-200 hover:underline"
                style={{
                  fontSize: '0.8rem',
                  color: '#ffffff',
                }}
              >
                REGISTRATE GRATIS &rarr;
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── Section 2: Category Filter Bar ─── */}
      <CategoryFilterBar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      {/* ─── Section 3: Product Grid ─── */}
      <section style={{ backgroundColor: '#f8f9fa', padding: '3rem 0 8rem 0' }}>
        <div className="container-tp">
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: '2rem' }}
          >
            {isLoading ? (
              // Skeleton loading
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : (
              filteredProducts.map((product, i) => (
                <div
                  key={product.slug}
                  ref={(el) => { cardsRef.current[i] = el; }}
                >
                  <ProductCard product={product} userRole={role} />
                </div>
              ))
            )}
          </div>

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>
                No se encontraron productos en esta categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Section 4: Technical Comparison CTA ─── */}
      <section
        style={{
          backgroundColor: '#ffffff',
          padding: '5rem 0',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <div
          className="container-tp text-center"
          ref={ctaRef}
          style={{ maxWidth: '800px' }}
        >
          <h2
            className="font-extrabold uppercase"
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              color: '#1a1a2e',
            }}
          >
            &iquest;NO SABES QUE EQUIPO ELEGIR?
          </h2>
          <p
            className="mt-4"
            style={{
              fontSize: '1rem',
              color: '#4a5568',
              maxWidth: '560px',
              margin: '1rem auto 0',
              lineHeight: 1.6,
            }}
          >
            Usa nuestra calculadora de seleccion o contacta a nuestro equipo de ingenieria para un
            dimensionamiento gratuito.
          </p>
          <div
            className="flex flex-wrap justify-center gap-4"
            style={{ marginTop: '2rem' }}
          >
            <Link
              to="/herramientas"
              className="inline-flex items-center gap-2 font-semibold uppercase text-white transition-all duration-200 hover:brightness-110"
              style={{
                fontSize: '0.875rem',
                backgroundColor: '#1548a0',
                padding: '14px 28px',
                borderRadius: '4px',
              }}
            >
              <Calculator size={18} />
              CALCULADORA DE SELECCION &rarr;
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 font-semibold uppercase transition-all duration-200 hover:bg-[rgba(21,72,160,0.05)]"
              style={{
                fontSize: '0.875rem',
                color: '#1548a0',
                border: '1px solid #1548a0',
                padding: '14px 28px',
                borderRadius: '4px',
              }}
            >
              CONTACTAR INGENIERIA
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Distributor CTA Banner ─── */}
      <section className="gradient-teal-glow" style={{ padding: '5rem 0' }}>
        <div
          className="container-tp text-center"
          ref={distributorCtaRef}
          style={{ maxWidth: '800px' }}
        >
          <h2
            className="font-extrabold uppercase"
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              color: '#ffffff',
            }}
          >
            &iquest;QUIERES SER DISTRIBUIDOR?
          </h2>
          <p
            className="mt-4"
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '520px',
              margin: '1rem auto 0',
              lineHeight: 1.5,
            }}
          >
            Accede a precios exclusivos, formacion certificada y soporte tecnico dedicado.
            Unete a la red de distribuidores ThermaPro en Latinoamerica.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link
              to="/registro"
              className="inline-flex items-center gap-2 font-semibold uppercase text-white transition-all duration-200 hover:brightness-110"
              style={{
                fontSize: '0.875rem',
                backgroundColor: '#e63946',
                padding: '16px 32px',
                borderRadius: '4px',
              }}
            >
              <Users size={18} />
              REGISTRARSE COMO DISTRIBUIDOR &rarr;
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
