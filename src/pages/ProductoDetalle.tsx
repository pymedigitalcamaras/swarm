import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Lock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Phone,
  Mail,
  MessageCircle,
  Zap,
  Clock,
  Thermometer,
  Wrench,
  Calendar,
  Shield,
  Box,
  VolumeX,
  Droplets,
  Waves,
} from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { productDetails } from '@/lib/data';
import { useProductBySlug } from '@/hooks/useProducts';
import { useAuthContext } from '@/context/AuthContext';
import type { Product } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────
   Icon mapping for benefits
   ──────────────────────── */
const benefitIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  Clock,
  Thermometer,
  Wrench,
  Calendar,
  Shield,
  Box,
  VolumeX,
  Droplets,
  Waves,
};

/* ────────────────────────
   Breadcrumb Component
   ──────────────────────── */
function Breadcrumb({ product }: { product: Product }) {
  return (
    <nav className="flex items-center gap-2 flex-wrap" style={{ fontSize: '0.8rem' }}>
      <Link
        to="/"
        className="transition-colors duration-200 hover:underline"
        style={{ color: '#1548a0' }}
      >
        INICIO
      </Link>
      <ArrowRight size={12} style={{ color: '#4a5568' }} />
      <Link
        to="/productos"
        className="transition-colors duration-200 hover:underline"
        style={{ color: '#1548a0' }}
      >
        PRODUCTOS
      </Link>
      <ArrowRight size={12} style={{ color: '#4a5568' }} />
      <Link
        to={`/productos?categoria=${product.category}`}
        className="uppercase transition-colors duration-200 hover:underline"
        style={{ color: '#1548a0' }}
      >
        {product.categoryLabel}
      </Link>
      <ArrowRight size={12} style={{ color: '#4a5568' }} />
      <span className="font-semibold uppercase" style={{ color: '#1a1a2e' }}>
        {product.name}
      </span>
    </nav>
  );
}

/* ────────────────────────
   Gallery Component
   ──────────────────────── */
function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const goNext = () => setCurrentIdx((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div>
      {/* Main image */}
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-lg"
        style={{ aspectRatio: '4/3', backgroundColor: '#f8f9fa' }}
      >
        <img
          src={images[currentIdx]}
          alt={`${productName} - Imagen ${currentIdx + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-colors duration-200"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#fff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
              }}
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-colors duration-200"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#fff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
              }}
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3" style={{ marginTop: '1rem' }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className="relative overflow-hidden rounded flex-shrink-0 transition-all duration-200"
              style={{
                width: '80px',
                height: '80px',
                border: currentIdx === i ? '2px solid #1548a0' : '1px solid #e2e8f0',
                opacity: currentIdx === i ? 1 : 0.6,
              }}
              onMouseEnter={(e) => {
                if (currentIdx !== i) {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.borderColor = '#1548a0';
                }
              }}
              onMouseLeave={(e) => {
                if (currentIdx !== i) {
                  e.currentTarget.style.opacity = '0.6';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }
              }}
            >
              <img
                src={img}
                alt={`${productName} miniatura ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────
   Main Product Detail Page
   ──────────────────────── */
export default function ProductoDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const { product, isLoading } = useProductBySlug(slug);
  const { role } = useAuthContext();

  // Related products - we'll find from the static data since we have relatedSlugs there
  const detail = slug ? productDetails[slug] : undefined;

  // GSAP refs
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const headerInfoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);
  const leadCtaRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered animations
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Breadcrumb
      if (breadcrumbRef.current) {
        gsap.fromTo(
          breadcrumbRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      }

      // Header info
      if (headerInfoRef.current) {
        const children = headerInfoRef.current.children;
        gsap.fromTo(
          children[0],
          { opacity: 0 },
          { opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' }
        );
        gsap.fromTo(
          children[1],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, delay: 0.2, ease: 'power3.out' }
        );
        gsap.fromTo(
          Array.from(children).slice(2),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
        );
      }

      // Gallery
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: galleryRef.current, start: 'top 80%' },
          }
        );
      }

      // Specs
      if (specsRef.current) {
        gsap.fromTo(
          specsRef.current,
          { opacity: 0, x: 20 },
          {
            opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: specsRef.current, start: 'top 80%' },
          }
        );
      }

      // Benefits
      if (benefitsRef.current) {
        gsap.fromTo(
          benefitsRef.current.querySelectorAll('.benefit-item'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: benefitsRef.current, start: 'top 80%' },
          }
        );
      }

      // Documentation
      if (docsRef.current) {
        gsap.fromTo(
          docsRef.current.querySelectorAll('.doc-item'),
          { opacity: 0 },
          {
            opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: docsRef.current, start: 'top 80%' },
          }
        );
      }

      // Lead CTA
      if (leadCtaRef.current) {
        gsap.fromTo(
          leadCtaRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: leadCtaRef.current, start: 'top 80%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [slug, product]);

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <section style={{ backgroundColor: '#f8f9fa', padding: '7rem 0 2rem 0' }}>
          <div className="container-tp">
            <Skeleton className="h-4 w-64 mb-4" />
            <Skeleton className="h-10 w-96 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
        </section>
        <section style={{ backgroundColor: '#ffffff', padding: '3rem 0 5rem 0' }}>
          <div className="container-tp">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <Skeleton className="w-full" style={{ aspectRatio: '4/3' }} />
              </div>
              <div className="lg:col-span-2">
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Product not found
  if (!product) {
    return (
      <Layout>
        <div
          className="min-h-[60dvh] flex items-center justify-center"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold uppercase mb-4" style={{ color: '#1a1a2e' }}>
              Producto no encontrado
            </h1>
            <p style={{ color: '#4a5568' }}>El producto que buscas no existe en nuestro catalogo.</p>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 mt-6 font-semibold uppercase text-white transition-all duration-200 hover:brightness-110"
              style={{
                backgroundColor: '#1548a0',
                padding: '12px 24px',
                borderRadius: '4px',
                fontSize: '0.875rem',
              }}
            >
              <ArrowRight size={16} />
              VER CATALOGO
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const galleryImages = detail?.gallery || [product.image];
  const benefits = detail?.benefits || [];
  const docs = detail?.docs || [];

  return (
    <Layout>
      {/* ─── Section 1: Breadcrumb + Product Header ─── */}
      <section style={{ backgroundColor: '#f8f9fa', padding: '7rem 0 2rem 0' }}>
        <div className="container-tp">
          <div ref={breadcrumbRef}>
            <Breadcrumb product={product} />
          </div>

          <div ref={headerInfoRef} style={{ marginTop: '1.5rem' }}>
            {/* Category badge */}
            <span
              className="font-medium uppercase"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: '#2a9d8f',
                marginBottom: '0.5rem',
                display: 'block',
              }}
            >
              {product.categoryLabel}
            </span>

            {/* Title */}
            <h1
              className="font-black uppercase"
              style={{
                fontSize: 'clamp(2rem, 4vw, 4rem)',
                color: '#1a1a2e',
                lineHeight: 1.05,
              }}
            >
              {product.name}
            </h1>

            {/* Subtitle */}
            <p
              className="mt-3"
              style={{
                fontSize: '1.1rem',
                color: '#4a5568',
                maxWidth: '600px',
                lineHeight: 1.5,
              }}
            >
              {detail?.subtitle || product.specs}
            </p>

            {/* Price lock row */}
            <div className="flex flex-wrap items-center gap-4" style={{ marginTop: '1.5rem' }}>
              {role === 'visitor' ? (
                <>
                  <span
                    className="font-semibold flex items-center gap-2"
                    style={{ fontSize: '0.9rem', color: '#e63946' }}
                  >
                    <Lock size={16} />
                    PRECIOS EXCLUSIVOS PARA DISTRIBUIDORES
                  </span>
                  <Link
                    to="/registro"
                    className="inline-flex items-center gap-2 font-semibold uppercase text-white transition-all duration-200 hover:brightness-110"
                    style={{
                      fontSize: '0.8rem',
                      backgroundColor: '#e63946',
                      padding: '12px 24px',
                      borderRadius: '4px',
                    }}
                  >
                    REGISTRATE PARA VER PRECIOS &rarr;
                  </Link>
                </>
              ) : role === 'personal_natural' && product.salePrice ? (
                <div>
                  <span className="font-bold flex items-center gap-2" style={{ fontSize: '1.1rem', color: '#2a9d8f' }}>
                    ${product.salePrice.toLocaleString('es-ES')} USD
                  </span>
                  <span className="text-xs" style={{ color: '#94a3b8' }}>Precio de venta al público</span>
                </div>
              ) : product.price ? (
                <div>
                  <span className="font-bold flex items-center gap-2" style={{ fontSize: '1.1rem', color: '#1548a0' }}>
                    ${product.price.toLocaleString('es-ES')} USD
                  </span>
                  <span className="text-xs" style={{ color: '#94a3b8' }}>Precio distribuidor</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Product Gallery + Quick Specs ─── */}
      <section style={{ backgroundColor: '#ffffff', padding: '3rem 0 5rem 0' }}>
        <div className="container-tp">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Gallery - left (3/5) */}
            <div className="lg:col-span-3" ref={galleryRef}>
              <ProductGallery images={galleryImages} productName={product.name} />
            </div>

            {/* Quick Specs - right (2/5) */}
            <div className="lg:col-span-2" ref={specsRef}>
              <div
                className="rounded-lg"
                style={{ backgroundColor: '#f8f9fa', padding: '2rem' }}
              >
                <h2
                  className="font-bold uppercase"
                  style={{
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    color: '#1a1a2e',
                    marginBottom: '1.5rem',
                  }}
                >
                  ESPECIFICACIONES RAPIDAS
                </h2>

                {detail?.quickSpecs ? (
                  <div className="flex flex-col" style={{ gap: '1rem' }}>
                    {detail.quickSpecs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between"
                        style={{
                          paddingBottom: '0.75rem',
                          borderBottom: '1px solid #e2e8f0',
                        }}
                      >
                        <span style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                          {spec.label}
                        </span>
                        <span
                          className="font-semibold"
                          style={{ fontSize: '0.875rem', color: '#1a1a2e' }}
                        >
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#4a5568', fontSize: '0.875rem' }}>
                    Especificaciones detalladas disponibles para distribuidores registrados.
                  </p>
                )}

                {/* CTA Button */}
                <Link
                  to="/contacto"
                  className="block text-center font-semibold uppercase text-white transition-all duration-200 hover:brightness-110"
                  style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#e63946',
                    padding: '16px',
                    borderRadius: '4px',
                    marginTop: '2rem',
                  }}
                >
                  SOLICITAR COTIZACION
                </Link>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/56990117784?text=Hola%2C%20me%20interesa%20el%20${encodeURIComponent(product.name)}.%20Podrian%20enviarme%20mas%20informacion%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center font-semibold uppercase text-white transition-all duration-200 hover:brightness-110 mt-3"
                  style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#25D366',
                    padding: '16px',
                    borderRadius: '4px',
                  }}
                >
                  <span className="inline-flex items-center gap-2 justify-center">
                    <MessageCircle size={18} />
                    CONTACTAR POR WHATSAPP
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Key Benefits ─── */}
      {benefits.length > 0 && (
        <section style={{ backgroundColor: '#ffffff', padding: '5rem 0' }}>
          <div className="container-tp" ref={benefitsRef}>
            {/* Section header */}
            <div className="mb-12">
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
                    color: '#2a9d8f',
                  }}
                >
                  VENTAJAS
                </span>
              </div>
              <h2
                className="font-extrabold uppercase"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                  color: '#1a1a2e',
                }}
              >
                &iquest;POR QUE ELEGIR ESTE EQUIPO?
              </h2>
            </div>

            {/* Benefits grid - 2 columns desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, i) => {
                const IconComp = benefitIconMap[benefit.icon] || Shield;
                return (
                  <div
                    key={i}
                    className="benefit-item flex gap-5 items-start"
                  >
                    <div
                      className="flex items-center justify-center rounded-md flex-shrink-0"
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        backgroundColor: 'rgba(42,157,143,0.1)',
                        color: '#2a9d8f',
                      }}
                    >
                      <IconComp size={20} />
                    </div>
                    <div>
                      <h3
                        className="font-bold uppercase"
                        style={{ fontSize: '1rem', color: '#1a1a2e' }}
                      >
                        {benefit.title}
                      </h3>
                      <p
                        className="mt-1"
                        style={{
                          fontSize: '0.9rem',
                          color: '#4a5568',
                          lineHeight: 1.5,
                        }}
                      >
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── Section 4: Price Access CTA ─── */}
      {role === 'visitor' && (
        <section style={{ backgroundColor: '#f8f9fa', padding: '5rem 0' }}>
          <div className="container-tp">
            <div
              className="max-w-3xl mx-auto text-center rounded-xl border p-8 md:p-12"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
              }}
            >
              <Lock size={40} style={{ color: '#e63946', margin: '0 auto' }} />
              <h3
                className="font-extrabold uppercase mt-4"
                style={{ fontSize: '1.5rem', color: '#1a1a2e' }}
              >
                PRECIOS DE DISTRIBUIDOR
              </h3>
              <p
                className="mt-3"
                style={{
                  fontSize: '1rem',
                  color: '#4a5568',
                  lineHeight: 1.6,
                  maxWidth: '480px',
                  margin: '1rem auto 0',
                }}
              >
                Los precios de distribuidor estan disponibles para instaladores registrados.
                Cree una cuenta para acceder a listas de precios, descuentos por volumen y
                condiciones comerciales exclusivas.
              </p>
              <div className="flex flex-wrap justify-center gap-4" style={{ marginTop: '2rem' }}>
                <Link
                  to="/registro"
                  className="inline-flex items-center gap-2 font-semibold uppercase text-white transition-all duration-200 hover:brightness-110"
                  style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#e63946',
                    padding: '14px 28px',
                    borderRadius: '4px',
                  }}
                >
                  SOLICITAR ACCESO A PRECIOS
                </Link>
                <a
                  href={`https://wa.me/56990117784?text=Hola%2C%20quiero%20saber%20los%20precios%20del%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold uppercase text-white transition-all duration-200 hover:brightness-110"
                  style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#25D366',
                    padding: '14px 28px',
                    borderRadius: '4px',
                  }}
                >
                  <MessageCircle size={16} />
                  CONTACTAR POR WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Section 5: Documentation ─── */}
      {docs.length > 0 && (
        <section style={{ backgroundColor: '#ffffff', padding: '5rem 0' }}>
          <div className="container-tp" ref={docsRef}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Downloads */}
              <div>
                <h3
                  className="font-bold uppercase"
                  style={{ fontSize: '1rem', color: '#1a1a2e', marginBottom: '1.5rem' }}
                >
                  DOCUMENTACION TECNICA
                </h3>
                <div className="flex flex-col" style={{ gap: '1rem' }}>
                  {docs.map((doc, i) => (
                    <div
                      key={i}
                      className="doc-item flex items-center justify-between rounded-md"
                      style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={20} style={{ color: '#1548a0' }} />
                        <div>
                          <p
                            className="font-medium"
                            style={{ fontSize: '0.9rem', color: '#1a1a2e' }}
                          >
                            {doc.name}
                          </p>
                          <p style={{ fontSize: '0.75rem', color: '#4a5568' }}>
                            {doc.format}, {doc.size}
                          </p>
                        </div>
                      </div>
                      <button
                        className="font-medium uppercase transition-all duration-200 hover:underline"
                        style={{ fontSize: '0.8rem', color: '#2a9d8f' }}
                        onClick={() => toast.info('Descarga disponible para distribuidores registrados.')}
                      >
                        DESCARGAR &darr;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Prompt */}
              <div>
                <div
                  className="rounded-lg"
                  style={{ backgroundColor: '#f8f9fa', padding: '2rem' }}
                >
                  <h3
                    className="font-bold uppercase"
                    style={{ fontSize: '1.1rem', color: '#1a1a2e' }}
                  >
                    &iquest;DUDAS TECNICAS?
                  </h3>
                  <p
                    className="mt-3"
                    style={{ fontSize: '0.9rem', color: '#4a5568', lineHeight: 1.5 }}
                  >
                    Nuestro equipo de ingenieria esta disponible para ayudarte con seleccion de
                    equipos, dimensionamiento y soporte post-venta.
                  </p>
                  <div className="flex flex-col" style={{ marginTop: '1.5rem', gap: '1rem' }}>
                    <a
                      href="tel:+56990117784"
                      className="flex items-center gap-3 font-medium transition-colors duration-200 hover:underline"
                      style={{ fontSize: '0.875rem', color: '#1548a0' }}
                    >
                      <Phone size={16} />
                      +56 9 9011 7784
                    </a>
                    <a
                      href="mailto:ingenieria@thermapro.com"
                      className="flex items-center gap-3 font-medium transition-colors duration-200 hover:underline"
                      style={{ fontSize: '0.875rem', color: '#1548a0' }}
                    >
                      <Mail size={16} />
                      ingenieria@thermapro.com
                    </a>
                    <a
                      href="https://wa.me/56990117784"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 font-medium transition-colors duration-200 hover:underline"
                      style={{ fontSize: '0.875rem', color: '#1548a0' }}
                    >
                      <MessageCircle size={16} />
                      Escribenos por WhatsApp
                    </a>
                  </div>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center gap-2 font-semibold uppercase text-white transition-all duration-200 hover:brightness-110 mt-6"
                    style={{
                      fontSize: '0.8rem',
                      backgroundColor: '#1548a0',
                      padding: '12px 24px',
                      borderRadius: '4px',
                    }}
                  >
                    CONTACTAR INGENIERIA &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Section 6: Lead Capture CTA ─── */}
      <section className="gradient-teal-glow" style={{ padding: '5rem 0' }}>
        <div
          className="container-tp text-center"
          ref={leadCtaRef}
          style={{ maxWidth: '800px' }}
        >
          <h2
            className="font-extrabold uppercase"
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              color: '#ffffff',
            }}
          >
            &iquest;TE INTERESA ESTE EQUIPO?
          </h2>
          <p
            className="mt-4"
            style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '520px',
              margin: '1rem auto 0',
              lineHeight: 1.5,
            }}
          >
            Solicita una cotizacion personalizada o habla con nuestro equipo de ingenieria para
            dimensionar tu proyecto.
          </p>
          <div
            className="flex flex-wrap justify-center gap-4"
            style={{ marginTop: '2rem' }}
          >
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 font-semibold uppercase text-white transition-all duration-200 hover:brightness-110"
              style={{
                fontSize: '0.875rem',
                backgroundColor: '#e63946',
                padding: '16px 32px',
                borderRadius: '4px',
              }}
            >
              SOLICITAR COTIZACION &rarr;
            </Link>
            <a
              href={`https://wa.me/56990117784?text=Hola%2C%20me%20interesa%20cotizar%20el%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold uppercase text-white transition-all duration-200 hover:brightness-110"
              style={{
                fontSize: '0.875rem',
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.4)',
                padding: '16px 32px',
                borderRadius: '4px',
              }}
            >
              <MessageCircle size={16} />
              HABLAR POR WHATSAPP
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
