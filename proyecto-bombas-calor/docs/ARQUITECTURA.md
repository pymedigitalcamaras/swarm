# 🏗️ ARQUITECTURA TÉCNICA

## Stack Tecnológico Completo

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|-----------|
| **Framework** | Next.js | 14+ (App Router) | SSR/SSG, routing, API routes |
| **Lenguaje** | TypeScript | 5.x | Tipado estático |
| **Estilos** | Tailwind CSS | 3.x | Utility-first CSS |
| **UI Components** | shadcn/ui | Latest | Componentes base accesibles |
| **Animaciones** | Framer Motion | 10.x | Transiciones y microinteracciones |
| **Íconos** | Lucide React | Latest | Iconografía consistente |
| **Backend** | Supabase | Latest | DB, Auth, Storage, Realtime |
| **ORM/Query** | Supabase Client | v2 | Queries tipadas |
| **Auth** | Supabase Auth | — | JWT, OAuth, Magic Link |
| **Storage** | Supabase Storage | — | Imágenes y documentos |
| **Hosting** | Vercel | — | Edge, CI/CD, Preview |
| **Repositorio** | GitHub | — | Git + Actions |
| **CRM** | Webhook/API | — | Integración externa |
| **Analytics** | Vercel + Custom | — | Tracking básico |

---

## 📁 Estructura del Proyecto (Next.js App Router)

```
my-app/
├── app/                          # App Router (Next.js 14+)
│   ├── (public)/                 # Grupo: Rutas públicas
│   │   ├── page.tsx              # Home
│   │   ├── layout.tsx            # Layout público
│   │   ├── productos/
│   │   │   ├── page.tsx          # Listado de productos
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Ficha de producto
│   │   ├── como-trabajamos/
│   │   │   └── page.tsx
│   │   ├── distribuidores/
│   │   │   └── page.tsx
│   │   ├── herramientas/
│   │   │   ├── page.tsx
│   │   │   ├── calculadora-ahorro/
│   │   │   │   └── page.tsx
│   │   │   ├── configurador-proyecto/
│   │   │   │   └── page.tsx
│   │   │   └── simulador-negocio/
│   │   │       └── page.tsx
│   │   └── login/
│   │       └── page.tsx
│   │
│   ├── (admin)/                  # Grupo: Panel admin
│   │   ├── admin/
│   │   │   ├── layout.tsx        # Layout admin (sidebar)
│   │   │   ├── page.tsx          # Dashboard
│   │   │   ├── productos/
│   │   │   │   ├── page.tsx      # Listado
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Edición
│   │   │   ├── imagenes/
│   │   │   │   └── page.tsx
│   │   │   ├── usuarios/
│   │   │   │   └── page.tsx
│   │   │   ├── contenido/
│   │   │   │   └── page.tsx
│   │   │   └── configuracion/
│   │   │       └── page.tsx
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   ├── productos/
│   │   │   └── route.ts
│   │   ├── crm/
│   │   │   └── webhook/
│   │   │       └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   │
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Estilos globales
│   └── loading.tsx               # Loading global
│
├── components/                   # Componentes React
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layouts reutilizables
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── WhatsAppButton.tsx
│   ├── sections/                 # Secciones de página
│   │   ├── HeroSlider.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ValueProposition.tsx
│   │   └── CTASection.tsx
│   ├── admin/                    # Componentes del panel
│   │   ├── ProductForm.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── UserTable.tsx
│   │   └── ContentEditor.tsx
│   ├── tools/                    # Herramientas interactivas
│   │   ├── CalculadoraAhorro.tsx
│   │   ├── ConfiguradorProyecto.tsx
│   │   └── SimuladorNegocio.tsx
│   └── shared/                   # Componentes genéricos
│       ├── PriceDisplay.tsx      # Muestra/oculta precios
│       ├── ImageGallery.tsx
│       └── ProductCard.tsx
│
├── lib/                          # Utilidades y configuración
│   ├── supabase/                 # Clientes Supabase
│   │   ├── client.ts             # Cliente browser
│   │   ├── server.ts             # Cliente server (SSR)
│   │   └── admin.ts              # Cliente service role (admin)
│   ├── hooks/                    # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   ├── useAdmin.ts
│   │   └── useUpload.ts
│   ├── utils/
│   │   ├── cn.ts                 # merge tailwind classes
│   │   ├── format.ts             # formatters
│   │   └── validation.ts         # validaciones
│   └── constants.ts              # Constantes globales
│
├── types/                        # Tipos TypeScript
│   ├── database.ts               # Tipos de Supabase (auto-generated)
│   ├── product.ts
│   ├── user.ts
│   └── api.ts
│
├── public/                       # Archivos estáticos
│   ├── images/
│   │   ├── placeholder-product.png
│   │   └── hero-fallback.jpg
│   └── docs/
│       └── ficha-tecnica-ejemplo.pdf
│
├── middleware.ts                 # Auth middleware (Next.js)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local.example
```

---

## 🔐 Middleware & Autenticación

### `middleware.ts`

```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;

  // Proteger rutas /admin
  if (path.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    
    // Verificar rol admin
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Redirigir login si ya está autenticado
  if (path === '/login' && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
```

---

## 📡 API Routes

### Estructura de Endpoints

```
/api
├── /auth/callback        # Callback de OAuth (Google, etc.)
├── /productos
│   ├── GET    → Listar productos (público)
│   └── POST   → Crear producto (admin only)
├── /productos/[id]
│   ├── GET    → Producto individual
│   ├── PATCH  → Actualizar producto (admin)
│   └── DELETE → Eliminar producto (admin)
├── /upload
│   └── POST   → Subir imagen a Supabase Storage
├── /crm/webhook
│   └── POST   → Recibir eventos del CRM
└── /leads
    └── POST   → Crear lead (formulario contacto)
```

---

## 🎯 Decisiones Arquitectónicas Clave

### 1. App Router vs Pages Router
- **Decisión:** App Router (Next.js 14+)
- **Razón:** Server Components por defecto, mejor performance, streaming, layouts anidados

### 2. Supabase como Backend Único
- **Decisión:** Usar Supabase para DB + Auth + Storage
- **Razón:** Reduce complejidad, un solo proveedor, RLS integrado, realtime opcional

### 3. Server Components por Defecto
- **Decisión:** Todo lo que pueda ser Server Component, lo es
- **Razón:** Menos JS al cliente, mejor SEO, menos costos de edge

### 4. Client Components Solo Cuando Necesario
- **Casos de uso:**
  - Interactividad (formularios, botones, modales)
  - Hooks de React (useState, useEffect)
  - Browser APIs (localStorage, geolocation)
  - Third-party JS (analytics)

### 5. shadcn/ui como Base de UI
- **Decisión:** Usar shadcn/ui en lugar de Material UI o Ant Design
- **Razón:** Componentes desacoplados, personalizables, accesibles, Tailwind-native

### 6. Precios Bloqueados con Server Components
- **Estrategia:** El precio se renderiza condicionalmente en server
- **Beneficio:** No hay forma de inspeccionar precios en el cliente sin estar autenticado

---

## 🌍 Internacionalización (i18n)

### Estrategia: Multi-site por idioma

```
├── app/
│   ├── [lang]/              # /es, /pt, /en
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── (no lang redirect)   # Redirect a /es por defecto
```

### Idiomas Soportados (Fase 1)
| Idioma | Código | Mercado Principal |
|--------|--------|-------------------|
| Español | es | Chile, Colombia, Perú, Argentina, México |
| Portugués | pt | Brasil |

### Fase 2 (Futuro)
| Idioma | Mercado |
|--------|---------|
| Inglés | Exportación general |

---

## 🚀 Flujo de Deploy

```
1. Developer push a GitHub
2. Vercel Git Integration → Build automático
3. Preview Deploy para cada PR
4. Production Deploy en merge a main
5. Supabase Migrations aplicadas manualmente o via CI
```

### Variables de Entorno (Vercel)

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Auth
NEXTAUTH_SECRET=super-secret-key

# CRM
CRM_WEBHOOK_URL=https://crm-externo.com/api/webhook
CRM_API_KEY=...

# WhatsApp
WHATSAPP_NUMBER=+56990117784

# Storage
SUPABASE_STORAGE_URL=https://xxxx.supabase.co/storage/v1
```

---

*Arquitectura v1.0 — Proyecto Bombas de Calor*
