# NAE - New Age Energy Website

Sitio web corporativo + catálogo + presupuestador para New Age Energy.

## Tecnología

- Next.js 16 + App Router
- TypeScript
- Tailwind CSS
- next-intl (4 idiomas: es, en, pt, zh)
- Supabase (PostgreSQL)
- Vercel (deploy)

## Estructura

```
/web/                 ← Este proyecto (sitio web corporativo)
  /messages/           ← Traducciones (es, en, pt, zh)
  /src/
    /app/[locale]/     ← Rutas con internacionalización
      /(pages)/
        /page.tsx      ← Home / Hero
        /catalogo/     ← Catálogo de productos
        /calculadora/  ← Calculadora de proyecto
        /por-que-nae/  ← ¿Por qué NAE?
        /area-tecnica/ ← Área Técnica Unificada
        /contacto/     ← Contacto
    /components/         ← Header, Footer
    /lib/                ← Productos, Supabase client
```

## Configuración de Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a SQL Editor → New query
3. Pegar el contenido de `supabase-schema.sql`
4. Ejecutar
5. Ir a Project Settings → API → copiar:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Variables de entorno (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Deploy en Vercel

1. Subir repo a GitHub
2. Conectar repo en [vercel.com](https://vercel.com)
3. Agregar variables de entorno en Vercel Dashboard
4. Deploy automático en cada push

## Scripts

```bash
npm install
npm run dev      # Desarrollo local
npm run build    # Build de producción
```

## Notas

- Color corporativo: `#1E3A5F`
- Las imágenes de productos van en `/public/`
- El sistema interno (/app/) es un proyecto separado que viene después
