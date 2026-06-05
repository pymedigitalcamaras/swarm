# NAE - Bombas de Calor LATAM
## Guia Completa para Modificaciones

---

## 1. DESCARGAR E INSTALAR

### Requisitos:
- **Node.js 20+** (descargar de https://nodejs.org)
- **Git** (opcional, descargar de https://git-scm.com)
- Editor de codigo: **VS Code** (recomendado, https://code.visualstudio.com)

### Paso 1: Descomprimir el ZIP
```
nae-proyecto-completo.zip  -->  carpeta "app/"
```

### Paso 2: Instalar dependencias
```bash
cd app
npm install
```

Esto crea la carpeta `node_modules/` (tarda 1-2 minutos).

### Paso 3: Ejecutar en desarrollo
```bash
npm run dev
```
Abre tu navegador en: **http://localhost:5173**

Cada cambio que hagas en el codigo se vera automaticamente.

### Paso 4: Build para produccion
```bash
npm run build
```
Crea la carpeta `dist/` lista para subir a Vercel.

---

## 2. ESTRUCTURA DE ARCHIVOS

```
app/
|
|-- public/                    <-- Imagenes estaticas
|   |-- hero-bg.jpg
|   |-- product-aeroterm.jpg
|   |-- product-geoterm.jpg
|   |-- product-acs.jpg
|   |-- product-industrial.jpg
|   |-- product-piscina.jpg
|   |-- about-team.jpg
|   |-- contact-office.jpg
|
|-- src/
|   |
|   |-- pages/                 <-- PAGINAS (una por archivo)
|   |   |-- Home.tsx           <-- Pagina principal
|   |   |-- Productos.tsx      <-- Catalogo de productos
|   |   |-- ProductoDetalle.tsx <-- Ficha de un producto
|   |   |-- Distribuidor.tsx   <-- Pagina de distribuidores
|   |   |-- Herramientas.tsx   <-- Calculadoras
|   |   |-- Casos.tsx          <-- Casos de exito
|   |   |-- Nosotros.tsx       <-- Quienes somos
|   |   |-- Contacto.tsx       <-- Pagina de contacto
|   |   |-- Login.tsx          <-- Login
|   |   |-- Registro.tsx       <-- Registro
|   |   |-- AdminDashboard.tsx <-- Panel de admin (CRUD)
|   |
|   |-- components/            <-- COMPONENTES reutilizables
|   |   |-- ui/                <-- shadcn/ui (botones, tablas, etc.)
|   |   |-- Navbar.tsx         <-- Menu superior
|   |   |-- Footer.tsx         <-- Pie de pagina
|   |   |-- Layout.tsx         <-- Estructura base
|   |   |-- WhatsAppButton.tsx <-- Boton flotante WhatsApp
|   |
|   |-- hooks/                 <-- LOGICA de datos
|   |   |-- useAuth.ts         <-- Login/registro/logout
|   |   |-- useProducts.ts     <-- Obtener productos de Supabase
|   |   |-- useLeads.ts        <-- Leads y datos admin
|   |
|   |-- context/
|   |   |-- AuthContext.tsx    <-- Estado global de autenticacion
|   |
|   |-- lib/
|   |   |-- supabase.ts        <-- Configuracion de Supabase
|   |   |-- utils.ts           <-- Funciones utilitarias
|   |
|   |-- main.tsx               <-- Punto de entrada (NO MODIFICAR)
|   |-- App.tsx                <-- Rutas del sitio
|   |-- index.css              <-- Estilos globales
|
|-- index.html                 <-- HTML principal
|-- package.json               <-- Dependencias
|-- tailwind.config.js         <-- Configuracion de colores
|-- vite.config.ts             <-- Configuracion de Vite
|-- tsconfig.json              <-- Configuracion TypeScript
```

---

## 3. QUE ARCHIVO MODIFICAR PARA CADA CAMBIO

### Cambiar textos del sitio:
| Pagina | Archivo |
|--------|---------|
| Home (hero, titulos, CTAs) | `src/pages/Home.tsx` |
| Productos (titulos, filtros) | `src/pages/Productos.tsx` |
| Distribuidor (beneficios, formulario) | `src/pages/Distribuidor.tsx` |
| Contacto (datos, formulario) | `src/pages/Contacto.tsx` |
| Nosotros (historia, equipo) | `src/pages/Nosotros.tsx` |
| Login | `src/pages/Login.tsx` |
| Registro | `src/pages/Registro.tsx` |

### Cambiar colores:
Archivo: `tailwind.config.js`
```javascript
colors: {
  primary: '#1548a0',    // Azul corporativo (cambiar aqui)
  accent: '#e63946',     // Rojo CTA (cambiar aqui)
  secondary: '#2a9d8f',  // Verde (cambiar aqui)
}
```

### Cambiar WhatsApp:
Archivo: `src/components/WhatsAppButton.tsx`
Busca: `+56 9 9011 7784` y cambialo por tu numero.

### Cambiar menu de navegacion:
Archivo: `src/components/Navbar.tsx`

### Cambiar pie de pagina:
Archivo: `src/components/Footer.tsx`

### Modificar productos (admin):
Archivo: `src/pages/AdminDashboard.tsx`

### Cambiar conexion a Supabase:
Archivo: `src/lib/supabase.ts`
```typescript
const supabaseUrl = 'https://tqkycxorhlajgbgbfhry.supabase.co'
const supabaseKey = 'TU-NUEVA-KEY-AQUI'
```

---

## 4. CAMBIAR IMAGENES

1. Pon tus nuevas imagenes en la carpeta `public/`
2. Nombres recomendados (sin espacios, sin tildes):
   - `hero-bg.jpg` - Imagen principal del hero
   - `product-aeroterm.jpg` - Productos aerotermia
   - `product-geoterm.jpg` - Productos geotermia
   - `product-acs.jpg` - Productos ACS
   - `product-industrial.jpg` - Productos industrial
   - `product-piscina.jpg` - Productos piscinas
3. En el codigo se referencian asi: `src="/hero-bg.jpg"`

---

## 5. DESPLEGAR EN VERCEL

### Opcion A: Desde GitHub (recomendado)
1. Subir codigo a GitHub:
```bash
git add .
git commit -m "mis cambios"
git push origin main
```
2. Vercel se actualiza automaticamente

### Opcion B: Subir manualmente
1. Build: `npm run build`
2. Ve a https://vercel.com
3. New Project -> Import Git Repository
4. Selecciona tu repo

---

## 6. COMANDOS UTILES

```bash
npm run dev        # Desarrollo local (http://localhost:5173)
npm run build      # Build para produccion (carpeta dist/)
npm run preview    # Previsualizar build local
npm install        # Instalar dependencias
```

---

## 7. TUS CREDENCIALES

| Servicio | URL | Email |
|----------|-----|-------|
| **Supabase (BD)** | https://supabase.com | pymedigitalcamaras@gmail.com |
| **GitHub (codigo)** | https://github.com/pymedigitalcamaras/swarm | pymedigitalcamaras@gmail.com |
| **Vercel (hosting)** | https://vercel.com | pymedigitalcamaras@gmail.com |

---

## PREGUNTAS?

WhatsApp: +56 9 9011 7784
