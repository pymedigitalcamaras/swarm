# 🖼️ SISTEMA DE IMÁGENES

## 1. BANCO DE IMÁGENES INICIAL (Sugerencias)

### Hero Slider (5 slides)

| Slide | Descripción | Tipo | Referencia / Prompt |
|-------|-------------|------|---------------------|
| 1 | Técnico instalando bomba de calor exterior en casa moderna, atardecer, tonos cálidos | Foto real / AI | Prompt: "Professional HVAC technician installing air source heat pump outside modern house, golden hour lighting, warm tones, residential neighborhood, 35mm photography, high detail" |
| 2 | Familia en sala cálida, factura de gas reducida, gráfico de ahorro | Ilustración / AI | Prompt: "Happy family sitting in warm living room, infographic showing 70% savings on heating bill, modern minimalist illustration, warm colors, clean design" |
| 3 | Capacitación técnica en sala, ingeniero explicando diagrama en pantalla | Foto real / AI | Prompt: "Technical training session, engineer presenting heat pump diagram on screen, group of technicians in work clothes, professional workshop, bright lighting, documentary style" |
| 4 | Mapa de Latinoamérica con puntos de instalación, fotos de instalaciones reales | Diseño / AI | Prompt: "Map of Latin America with location pins, collage of heat pump installations in Chile, Mexico, Colombia, modern graphic design, blue and green color scheme, professional" |
| 5 | Casa con nieve, termómetro, urgencia de invierno | Foto / AI | Prompt: "House covered in snow with warm light from windows, thermometer showing cold temperature, winter urgency, heat pump visible outside, cinematic lighting, dramatic" |

**Fuentes recomendadas:**
- Unsplash (gratis): https://unsplash.com/s/photos/heat-pump
- Pexels (gratis): https://www.pexels.com/search/heat%20pump/
- Midjourney/Stable Diffusion (AI): Generar con prompts arriba
- Shutterstock (pago): heat pump latinoamerica, HVAC technician

---

### Productos (Catálogo)

**Por categoría:**

| Categoría | Imagen 1 | Imagen 2 | Imagen 3 | Imagen 4 | Imagen 5 |
|-----------|----------|----------|----------|----------|----------|
| **Aerotermia** | Producto en estudio blanco | Instalación exterior real | Panel de control close-up | Interior compresor | Instalación completa en patio |
| **Geotermia** | Unidad principal | Colectores horizontales | Colectores verticales | Esquema de instalación | Casa con sistema enterrado |
| **ACS** | Tanque acumulador | Detalle conexiones | Instalación en caseta | Display temperatura | Familia usando agua caliente |
| **Industrial** | Unidad industrial grande | Instalación en fábrica | Tuberías y conexiones | Control PLC | Vista panorámica planta |
| **Piscinas** | Unidad piscina | Piscina climatizada | Detalle intercambiador | Instalación pool house | Familia nadando (verano) |

**Prompts de ejemplo para AI:**
```
"Air source heat pump unit, white background, product photography, 
studio lighting, 3/4 angle, high detail, professional catalog photo, 
12kW residential unit, clean modern design"

"Heat pump installation in residential backyard, technician connecting 
pipes, copper lines, real world photography, Chilean house, Andes mountains 
in background, natural daylight"
```

---

### Técnicos / Instaladores

| Uso | Descripción | Prompt |
|-----|-------------|--------|
| Testimonios | Técnico sonriendo con herramientas | "Latin american HVAC technician, 40s, confident smile, holding tools, work clothes, professional portrait, workshop background, warm lighting" |
| Proceso | Instalando en tejado | "Technician installing heat pump on residential roof, safety harness, tools, clear sky, documentary photography, Chile" |
| Capacitación | Grupo en sala | "Group of 5 technicians in training session, looking at heat pump unit, instructor pointing, modern training facility, bright lighting" |
| Soporte | Llamada de servicio | "Technician on phone at service van, heat pump in background, professional, helpful, Latin American city street" |

---

### Iconos e Ilustraciones

| Uso | Estilo | Fuente |
|-----|--------|--------|
| Beneficios (5 items) | Iconos lineales | Lucide React (gratis) |
| Categorías | Iconos sólidos | Lucide React |
| Proceso (4 pasos) | Iconos numerados | Custom SVG + Lucide |
| Herramientas | Iconos interactivos | Lucide + animaciones |
| Stats | Iconos grandes | Lucide (trending-up, users, globe, clock) |

---

## 2. GESTIÓN DE IMÁGENES DESDE ADMIN

### Flujo de Subida

```
ADMIN PANEL
├── /admin/imagenes
│   ├── Tabs: [Productos] [Hero] [Contenido] [Docs]
│   │
│   ├── Tab Productos:
│   │   ├── Select: Producto destino
│   │   ├── Dropzone: Arrastrar imágenes
│   │   ├── Preview: Thumbnails con orden
│   │   ├── Campos: Alt text, Orden, ¿Primaria?
│   │   └── Acciones: Subir, Reemplazar, Eliminar
│   │
│   ├── Tab Hero:
│   │   ├── Lista de slides actuales
│   │   ├── Cada slide: Imagen + Título + Subtítulo + CTA
│   │   ├── Reordenar (drag & drop)
│   │   └── Acciones: Editar, Reemplazar imagen, Eliminar
│   │
│   └── Tab Contenido:
│       ├── Imágenes sueltas para CMS
│       ├── Carpeta por sección
│       └── Acciones: Subir, Eliminar, Copiar URL
```

### Interfaz de Subida (Drag & Drop)

```
┌─────────────────────────────────────────┐
│  📁 Subir Imágenes                      │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │                                 │    │
│  │   [Icono nube]                  │    │
│  │                                 │    │
│  │   Arrastra imágenes aquí        │    │
│  │   o clickea para seleccionar    │    │
│  │                                 │    │
│  │   JPG, PNG, WebP. Máx 5MB.      │    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Previsualización:                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ [img 1] │ │ [img 2] │ │ [img 3] │   │
│  │ ☑️ Prim. │ │   [x]   │ │   [x]   │   │
│  │ [Alt...] │ │ [Alt...] │ │ [Alt...] │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                         │
│  [Cancelar]              [Subir X imgs] │
└─────────────────────────────────────────┘
```

---

## 3. ESTRUCTURA TÉCNICA DE ALMACENAMIENTO

### Supabase Storage: Buckets

```
Storage Buckets:
├── products/          # Imágenes de productos
│   ├── {product_id}/
│   │   ├── primary.jpg
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   └── ...
│
├── hero/              # Imágenes del slider principal
│   ├── slide-1.jpg
│   ├── slide-2.jpg
│   └── slide-3.jpg
│
├── content/           # Imágenes de contenido CMS
│   ├── about/
│   ├── features/
│   └── blog/
│
└── docs/              # Fichas técnicas PDF (distribuidores)
    ├── ficha-aeroterm-12.pdf
    ├── ficha-geoterm-8.pdf
    └── ...
```

### Políticas de Storage (RLS)

```sql
-- Bucket: products (lectura pública, escritura admin)
CREATE POLICY "Products images public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

CREATE POLICY "Products images admin write"
ON storage.objects FOR ALL
USING (
  bucket_id = 'products' 
  AND auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  )
);

-- Bucket: docs (lectura distribuidores, escritura admin)
CREATE POLICY "Docs distributor read"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'docs'
  AND auth.uid() IN (
    SELECT id FROM public.users WHERE role IN ('distributor', 'admin')
  )
);
```

---

## 4. OPTIMIZACIÓN AUTOMÁTICA

### Next.js Image (Componente)

```tsx
// components/shared/OptimizedImage.tsx
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({ src, alt, ...props }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={80}
      loading={props.priority ? 'eager' : 'lazy'}
    />
  );
}
```

### Supabase Image Transformations (URL)

```typescript
// lib/utils/image.ts

export function getImageUrl(
  bucket: string,
  path: string,
  options?: { width?: number; height?: number; quality?: number }
): string {
  const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1`;
  
  if (options?.width || options?.height) {
    // Transformación on-the-fly
    const params = new URLSearchParams();
    if (options.width) params.append('width', String(options.width));
    if (options.height) params.append('height', String(options.height));
    if (options.quality) params.append('quality', String(options.quality));
    
    return `${baseUrl}/render/image/public/${bucket}/${path}?${params}`;
  }
  
  // Original
  return `${baseUrl}/object/public/${bucket}/${path}`;
}

// Uso:
// getImageUrl('products', 'aeroterm-12/primary.jpg', { width: 800, quality: 80 })
```

### Formatos y Compresión

| Uso | Formato | Calidad | Tamaño máx |
|-----|---------|---------|------------|
| Hero | WebP (auto) | 85% | 1920x1080 |
| Producto thumbnail | WebP | 80% | 400x300 |
| Producto galería | WebP | 85% | 1200x900 |
| Producto zoom | WebP | 90% | 1600x1200 |
| Admin preview | JPEG | 70% | 200x200 |

---

## 5. COMPONENTE DE GALERÍA

### Producto: Galería con Thumbnails

```tsx
// components/shared/ImageGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Image {
  url: string;
  alt: string;
}

export function ImageGallery({ images }: { images: Image[] }) {
  const [current, setCurrent] = useState(0);
  
  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={images[current].url}
          alt={images[current].alt}
          fill
          className="object-cover"
          priority
        />
        
        {/* Navegación */}
        <button 
          onClick={() => setCurrent(c => c > 0 ? c - 1 : images.length - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setCurrent(c => c < images.length - 1 ? c + 1 : 0)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
              i === current ? 'ring-2 ring-primary' : ''
            }`}
          >
            <Image src={img.url} alt={img.alt} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## 6. CHECKLIST DE IMPLEMENTACIÓN

### Inicial (Setup)
- [ ] Crear buckets en Supabase Storage: products, hero, content, docs
- [ ] Configurar políticas RLS para cada bucket
- [ ] Subir imágenes iniciales de productos (5 por producto)
- [ ] Subir imágenes iniciales del hero (5 slides)
- [ ] Generar/optimizar imágenes con Next.js Image
- [ ] Implementar componente ImageGallery
- [ ] Implementar drag & drop en admin
- [ ] Configurar alt text obligatorio para SEO/a11y

### Admin (CMS de Imágenes)
- [ ] Tab de gestión de imágenes por producto
- [ ] Tab de gestión del hero slider
- [ ] Tab de imágenes de contenido
- [ ] Reordenamiento drag & drop
- [ ] Previsualización antes de subir
- [ ] Validación: formato, tamaño, dimensiones
- [ ] Generación automática de thumbnails
- [ ] Eliminación con confirmación
- [ ] Reemplazo manteniendo URL (evitar rotura)

---

*Sistema de Imágenes v1.0 — Proyecto Bombas de Calor*
