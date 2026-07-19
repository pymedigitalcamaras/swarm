# 📋 ESPECIFICACIÓN TÉCNICA COMPLETA

## 🚀 Setup Inicial (Comandos)

### 1. Crear proyecto Next.js

```bash
# Usar shadcn/ui template (recomendado)
npx shadcn@latest init --yes --template next --base-color slate

# O manualmente:
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --no-turbopack
cd my-app
```

### 2. Instalar dependencias

```bash
# UI y componentes
npx shadcn add button card input textarea select badge dialog toast table
npx shadcn add tabs accordion dropdown-menu sheet

# Supabase
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# Utilidades
npm install framer-motion lucide-react zod react-hook-form @hookform/resolvers
npm install date-fns react-dropzone

# Opcional: Charts para admin
npm install recharts

# Opcional: Email
npm install resend

# Opcional: Maps
npm install @react-google-maps/api
```

### 3. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

NEXTAUTH_SECRET=your-secret-key-here

CRM_WEBHOOK_URL=https://your-crm.com/webhook
CRM_WEBHOOK_SECRET=shared-secret

WHATSAPP_NUMBER=+56990117784
RESEND_API_KEY=re_...

NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. Configurar Supabase

```bash
# Crear proyecto en https://supabase.com
# Ir a SQL Editor → New query
# Copiar y ejecutar todo el contenido de docs/DATABASE.md (sección SQL)

# Configurar Auth:
# - Settings → Auth → Enable Email provider
# - Settings → Auth → Site URL: https://your-domain.com
# - Settings → Auth → Redirect URLs: https://your-domain.com/api/auth/callback

# Configurar Storage:
# - Storage → New bucket: products (public)
# - Storage → New bucket: hero (public)
# - Storage → New bucket: content (public)
# - Storage → New bucket: docs (restricted)
# - Set RLS policies for each bucket
```

---

## 📁 Estructura de Archivos Final

```
my-app/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── productos/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
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
│   ├── (admin)/
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── productos/
│   │       │   ├── page.tsx
│   │       │   └── [id]/
│   │       │       └── page.tsx
│   │       ├── imagenes/
│   │       │   └── page.tsx
│   │       ├── usuarios/
│   │       │   └── page.tsx
│   │       ├── contenido/
│   │       │   └── page.tsx
│   │       └── configuracion/
│   │           └── page.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   ├── productos/
│   │   │   └── route.ts
│   │   ├── upload/
│   │   │   └── route.ts
│   │   └── crm/
│   │       └── webhook/
│   │           └── route.ts
│   │
│   ├── layout.tsx
│   ├── globals.css
│   └── loading.tsx
│
├── components/
│   ├── ui/                    # shadcn/ui (auto-generated)
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── WhatsAppButton.tsx
│   ├── sections/
│   │   ├── HeroSlider.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ValueProposition.tsx
│   │   ├── StatsSection.tsx
│   │   └── CTASection.tsx
│   ├── admin/
│   │   ├── DashboardStats.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── UserTable.tsx
│   │   ├── ContentEditor.tsx
│   │   └── SiteConfig.tsx
│   ├── tools/
│   │   ├── CalculadoraAhorro.tsx
│   │   ├── ConfiguradorProyecto.tsx
│   │   └── SimuladorNegocio.tsx
│   └── shared/
│       ├── PriceDisplay.tsx
│       ├── ImageGallery.tsx
│       ├── ProductCard.tsx
│       └── LoginRequired.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   ├── useAdmin.ts
│   │   └── useUpload.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── format.ts
│       │   └── validation.ts
│   └── constants.ts
│
├── types/
│   ├── database.ts
│   ├── product.ts
│   ├── user.ts
│   └── api.ts
│
├── public/
│   ├── images/
│   │   ├── placeholder-product.png
│   │   └── hero-fallback.jpg
│   └── docs/
│
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

---

## 🔧 Archivos Clave (Código)

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

  // Proteger admin
  if (path.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();
    if (user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Redirigir login si autenticado
  if (path === '/login' && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
```

### `lib/supabase/client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

### `lib/supabase/server.ts`

```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};
```

### `types/database.ts` (Generado automáticamente)

```bash
# Generar tipos desde Supabase
npx supabase gen types typescript --project-id your-project-id --schema public > types/database.ts
```

---

## 📊 Supabase Setup Checklist

### Database
- [ ] Ejecutar schema SQL completo (DATABASE.md)
- [ ] Verificar RLS policies en todas las tablas
- [ ] Crear triggers para updated_at
- [ ] Insertar seed data (categorías, config inicial, hero slides)

### Auth
- [ ] Habilitar Email provider
- [ ] Configurar Site URL y Redirect URLs
- [ ] Habilitar Google OAuth (opcional)
- [ ] Customizar email templates (confirmación, reset password)

### Storage
- [ ] Crear bucket: products (public)
- [ ] Crear bucket: hero (public)
- [ ] Crear bucket: content (public)
- [ ] Crear bucket: docs (restricted)
- [ ] Configurar RLS policies para cada bucket
- [ ] Configurar CORS origins

### API
- [ ] Configurar rate limiting (si aplica)
- [ ] Revisar API keys (anon, service_role)

---

## 🚀 Deploy a Vercel

### 1. Preparar repositorio

```bash
# Inicializar git
git init
git add .
git commit -m "Initial commit: Bombas de Calor LATAM"

# Crear repo en GitHub y push
git remote add origin https://github.com/yourusername/bombas-calor.git
git push -u origin main
```

### 2. Configurar Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login y deploy
vercel login
vercel

# O conectar GitHub en https://vercel.com/new
```

### 3. Variables de entorno en Vercel

Ir a Project Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...
SUPABASE_SERVICE_ROLE_KEY = eyJ...
NEXTAUTH_SECRET = your-secret
CRM_WEBHOOK_URL = https://...
CRM_WEBHOOK_SECRET = secret
WHATSAPP_NUMBER = +56990117784
RESEND_API_KEY = re_...
```

### 4. Configurar dominio

```
# En Vercel: Settings → Domains
# Add: www.bombasdecalor.lat
# O usar .vercel.app para staging
```

---

## 📦 Dependencias Completas (package.json)

```json
{
  "name": "bombas-calor-latam",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:types": "supabase gen types typescript --project-id your-project-id --schema public > types/database.ts"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@supabase/auth-helpers-nextjs": "^0.9.0",
    "@supabase/ssr": "^0.1.0",
    "@supabase/supabase-js": "^2.39.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "date-fns": "^3.3.1",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.344.0",
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-dropzone": "^14.2.3",
    "react-hook-form": "^7.51.0",
    "recharts": "^2.12.0",
    "resend": "^3.2.0",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.0"
  }
}
```

---

## 🧪 Testing Checklist (QA)

### Visitante
- [ ] Puede ver home, productos, herramientas
- [ ] NO ve precios en productos
- [ ] Ve "🔒 Login requerido" en precios
- [ ] Puede usar calculadora básica
- [ ] WhatsApp flotante funciona
- [ ] Puede registrarse

### Distribuidor
- [ ] Puede loguearse
- [ ] VE precios en productos
- [ ] Ve margen sugerido
- [ ] Descarga fichas técnicas
- [ ] Accede a herramientas avanzadas
- [ ] Puede "Enviar a CRM"

### Admin
- [ ] Accede a /admin
- [ ] CRUD productos funciona
- [ ] Gestión de imágenes funciona
- [ ] Cambio de roles funciona
- [ ] Edición de contenido funciona
- [ ] Configuración guarda cambios

### Responsive
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)

### Performance
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] FID < 100ms

---

*Especificación Técnica v1.0 — Proyecto Bombas de Calor*
