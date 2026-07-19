# 🖼️ WIREFRAMES & DISEÑO UX

## 🎨 Sistema de Diseño

### Paleta de Colores (Industrial + Confianza)

```css
/* Primarios */
--color-primary: #1a5f7a;        /* Azul petróleo — Profesional, industrial */
--color-primary-dark: #0d3d4d;   /* Azul oscuro — Headers, footer */
--color-primary-light: #2a8db3;  /* Azul claro — Hover, acentos */

/* Secundarios */
--color-accent: #e63946;         /* Rojo energía — CTAs, urgency */
--color-accent-hover: #c1121f;   /* Rojo oscuro — Hover CTA */
--color-success: #2a9d8f;        /* Verde — Ahorro, éxito, confirmaciones */

/* Neutros */
--color-bg: #f8f9fa;             /* Gris muy claro — Fondos */
--color-card: #ffffff;           /* Blanco — Tarjetas */
--color-text: #1a1a2e;           /* Negro azulado — Texto principal */
--color-text-muted: #6c757d;     /* Gris — Texto secundario */
--color-border: #dee2e6;         /* Borde sutil */
```

### Tipografía

```css
/* Headings — Inter (o similar sans-serif técnica) */
font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
font-weight: 700; /* H1, H2 */
font-weight: 600; /* H3, H4 */

/* Body — Inter */
font-family: 'Inter', system-ui, sans-serif;
font-weight: 400;
font-size: 16px;
line-height: 1.6;

/* Tamaños */
--text-h1: 48px;      /* Hero */
--text-h2: 36px;      /* Secciones */
--text-h3: 24px;      /* Subsecciones */
--text-body: 16px;    /* Body */
--text-small: 14px;   /* Notas, metadata */
--text-xs: 12px;      /* Tags, badges */
```

### Espaciado

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
```

---

## 📐 Wireframes por Página

### 🏠 HOME PAGE

```
┌─────────────────────────────────────────────────────┐
│ NAVBAR (fixed, transparent → solid on scroll)       │
│  Logo    Productos  Cómo  Distribuidores  Herram   │
│                                             [Login] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  HERO SLIDER (100vh)                               │
│  ┌─────────────────────────────────────────────┐   │
│  │                                             │   │
│  │  [Imagen de fondo: Técnico instalando]      │   │
│  │                                             │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │ La calefacción que tu cliente       │    │   │
│  │  │ ya debería tener                    │    │   │
│  │  │                                     │    │   │
│  │  │ Bombas de calor de alta eficiencia  │    │   │
│  │  │ para Latinoamérica...               │    │   │
│  │  │                                     │    │   │
│  │  │ [Ver catálogo]  [Quiero ser dist.]  │    │   │
│  │  └─────────────────────────────────────┘    │   │
│  │                                             │   │
│  │  ○  ○  ○  ○  ○ (indicadores)                │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  PROPUSTA DE VALOR (3 cards)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  🔧      │  │  📚      │  │  💰      │           │
│  │ Tecnología│  │Capacitación│  │ Margen  │          │
│  │ que no te │  │ que da    │  │ que te  │           │
│  │ deja solo │  │ resultados│  │ motiva  │           │
│  │           │  │           │  │         │           │
│  │ [Saber +] │  │ [Saber +] │  │ [Saber +]│          │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STATS / SOCIAL PROOF                                 │
│  ┌─────────────────────────────────────────────┐     │
│  │  2.000+      200+         5 países         │     │
│  │  instalaciones distribuidores  activos      │     │
│  │  0%          40%           24h              │     │
│  │  devoluciones crecimiento/año resp. soporte│     │
│  └─────────────────────────────────────────────┘     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  CTA PRINCIPAL                                       │
│  ┌─────────────────────────────────────────────┐     │
│  │                                             │     │
│  │  ¿Instalas calefacción?                     │     │
│  │  Estás a un paso de facturar el doble.      │     │
│  │                                             │     │
│  │  [Quiero ser distribuidor]  [Ver productos]│     │
│  │                                             │     │
│  └─────────────────────────────────────────────┘     │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
│  [Productos] [Empresa] [Soporte] [Contacto]         │
│  WhatsApp: +56 9 9011 7784                          │
│  © 2024 Bombas de Calor Latinoamérica               │
├─────────────────────────────────────────────────────┤
│  [💬 WhatsApp Button (fixed, bottom-right)]          │
└─────────────────────────────────────────────────────┘
```

---

### 📦 PÁGINA DE PRODUCTOS (Listado)

```
┌─────────────────────────────────────────────────────┐
│ NAVBAR                                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  HEADER                                             │
│  Catálogo técnico completo                          │
│  Bombas de calor para toda Latinoamérica            │
│  Precios visibles para distribuidores registrados  │
│                                                     │
│  [¿No tienes cuenta? Regístrate para ver precios →]│
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  FILTROS / CATEGORÍAS (Tabs o Dropdown)             │
│  [Todas] [Aerotermia] [Geotermia] [ACS] [Indust]  │
│                                                     │
│  [🔍 Buscar por nombre o modelo...]                 │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  GRID DE PRODUCTOS (3-4 columnas desktop)             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│
│  │ [Imagen]     │  │ [Imagen]     │  │ [Imagen]     ││
│  │              │  │              │  │              ││
│  │ AEROTERM 12  │  │ AEROTERM 18  │  │ GEOTERM 8    ││
│  │ 12 kW | COP 4.2│ 18 kW | COP 4.0│ 8 kW | COP 5.1││
│  │              │  │              │  │              ││
│  │ 5 fotos      │  │ 5 fotos      │  │ 5 fotos      ││
│  │              │  │              │  │              ││
│  │ 🔒 Precio:   │  │ 🔒 Precio:   │  │ 🔒 Precio:   ││
│  │ Login req.   │  │ Login req.   │  │ Login req.   ││
│  │              │  │              │  │              ││
│  │ [Ver ficha]  │  │ [Ver ficha]  │  │ [Ver ficha]  ││
│  │ [Quiero dist]│  │ [Quiero dist]│  │ [Quiero dist]││
│  └──────────────┘  └──────────────┘  └──────────────┘│
│                                                     │
│  [Mostrar más productos...]                         │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

### 📋 FICHA DE PRODUCTO (Individual)

```
┌─────────────────────────────────────────────────────┐
│ NAVBAR                                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  BREADCRUMBS                                        │
│  Inicio > Productos > Aerotermia > AEROTERM 12      │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  HEADER DEL PRODUCTO                                │
│  Bomba de Calor AEROTERM 12                         │
│  ⭐ Más vendida en Chile                            │
│  12 kW | COP 4.2 | Monofásica 220V | 120m²         │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  GALERÍA + INFO (2 columnas desktop)                │
│  ┌────────────────────┐ ┌────────────────────────┐    │
│  │                    │ │ ESPECIFICACIONES        │    │
│  │ [Imagen principal] │ │                        │    │
│  │                    │ │ Potencia: 12 kW        │    │
│  │ [○○○○○] (5 thumbs)│ │ COP: 4.2               │    │
│  │                    │ │ Voltaje: 220V          │    │
│  │                    │ │ Ruido: 45 dB           │    │
│  │                    │ │ Dimensiones: 110x95x42 │    │
│  │                    │ │ Peso: 85 kg            │    │
│  │                    │ │ Refrigerante: R32      │    │
│  │                    │ │ Garantía: 5 años comp. │    │
│  │                    │ │                        │    │
│  │                    │ │ [Ver espec. completas] │    │
│  └────────────────────┘ └────────────────────────┘    │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  BENEFICIOS (5 items con iconos)                    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────┐│
│  │ Ahorro │ │Instala.│ │Funciona│ │Manten. │ │Vida││
│  │  70%   │ │ 1 día  │ │ -15°C  │ │ mínimo │ │15+ ││
│  └────────┘ └────────┘ └────────┘ └────────┘ └────┘│
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  PRECIO (Solo distribuidores logueados)             │
│  ┌─────────────────────────────────────────────┐     │
│  │                                             │     │
│  │  Precio distribuidor: $1.890 USD             │     │
│  │  Precio venta sugerido: $2.990 USD         │     │
│  │  Tu margen: 58%                            │     │
│  │                                             │     │
│  │  Precio FOB. Envío no incluido.            │     │
│  │                                             │     │
│  │  [Quiero ser distribuidor]                  │     │
│  │  [Descargar ficha PDF]                      │     │
│  │                                             │     │
│  │  💬 ¿Dudas? Habla con un ingeniero          │     │
│  │                                             │     │
│  └─────────────────────────────────────────────┘     │
│                                                     │
│  (Si no logueado: 🔒 Login requerido para ver precio)│
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

### 🤝 CÓMO TRABAJAMOS (Página)

```
┌─────────────────────────────────────────────────────┐
│ NAVBAR                                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  HEADER                                             │
│  De instalador a distribuidor.                      │
│  En 4 pasos.                                        │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  PASO 1 (Imagen izquierda, texto derecha)          │
│  ┌────────────┐ ┌────────────────────────────┐       │
│  │ [Imagen    │ │ 1. Pruebas la tecnología   │       │
│  │  técnico   │ │                            │       │
│  │  probando  │ │ Te prestamos una unidad    │       │
│  │  unidad]   │ │ para que la instales en    │       │
│  │            │ │ tu casa o un cliente de    │       │
│  │            │ │ confianza...               │       │
│  │            │ │                            │       │
│  │            │ │ Duración: 1-2 meses        │       │
│  │            │ │ Inversión: $0              │       │
│  └────────────┘ └────────────────────────────┘       │
│                                                     │
│  PASO 2 (Texto izquierda, imagen derecha)          │
│  ┌────────────────────────────┐ ┌────────────┐       │
│  │ 2. Te capacitamos en serio │ │ [Imagen    │       │
│  │                            │ │  capacitación│      │
│  │ 8 horas de capacitación    │ │  grupo]     │       │
│  │ en vivo. No es un video.  │ │            │       │
│  │ Es un ingeniero contigo...│ │            │       │
│  └────────────────────────────┘ └────────────┘       │
│                                                     │
│  [Pasos 3 y 4 con mismo patrón alternado]          │
│                                                     │
├─────────────────────────────────────────────────────┤
│  CTA FINAL                                          │
│  ¿Listo para empezar?                               │
│  [Aplicar al programa]                              │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

### 🔧 PÁGINA DE HERRAMIENTAS

```
┌─────────────────────────────────────────────────────┐
│ NAVBAR                                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  HEADER                                             │
│  Herramientas para vender más                       │
│  Calculadoras, configuradores y simuladores         │
│  que te ayudan a cerrar clientes.                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  GRID DE HERRAMIENTAS (3 cards)                     │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────┐│
│  │  💰             │ │  🔧             │ │  📊      ││
│  │ Calculadora     │ │ Configurador    │ │ Simulador││
│  │ de Ahorro       │ │ de Proyecto     │ │ de Negocio│
│  │                 │ │                 │ │         ││
│  │ Calcula cuánto  │ │ Responde 5      │ │ ¿Cuánto ││
│  │ ahorra tu      │ │ preguntas y te  │ │ ganarías││
│  │ cliente vs gas │ │ recomendamos la │ │ como    ││
│  │ o electricidad.│ │ bomba ideal.    │ │ distrib.?││
│  │                 │ │                 │ │         ││
│  │ [Usar ahora]    │ │ [Usar ahora]    │ │ [Usar]  ││
│  └─────────────────┘ └─────────────────┘ └─────────┘│
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

### 🔐 LOGIN / REGISTRO

```
┌─────────────────────────────────────────────────────┐
│ NAVBAR (simplificado)                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  LOGIN FORM (centrado, max-width 400px)               │
│  ┌─────────────────────────────────────┐             │
│  │                                     │             │
│  │  Acceso para distribuidores         │             │
│  │                                     │             │
│  │  Si ya eres distribuidor, ingresa   │             │
│  │  para ver precios y descargar       │             │
│  │  fichas técnicas.                   │             │
│  │                                     │             │
│  │  [Email input]                      │             │
│  │  [Password input]                   │             │
│  │                                     │             │
│  │  [Ingresar]                         │             │
│  │                                     │             │
│  │  ¿Olvidaste tu contraseña?          │             │
│  │                                     │             │
│  │  ─────────── o ───────────          │             │
│  │                                     │             │
│  │  [Continuar con Google]             │             │
│  │                                     │             │
│  │  ¿No tienes cuenta?                 │             │
│  │  [Crear cuenta de distribuidor]     │             │
│  │                                     │             │
│  └─────────────────────────────────────┘             │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER (mínimo)                                    │
└─────────────────────────────────────────────────────┘
```

---

### ⚙️ PANEL ADMIN — Dashboard

```
┌─────────────────────────────────────────────────────┐
│ [Sidebar]        │ HEADER: Admin Dashboard          │
│                  │                                  │
│  DASHBOARD       │  ┌──────────┐ ┌──────────┐      │
│  📊 Dashboard    │  │ 45       │  │ 12       │      │
│  ─────────────── │  │ Productos│  │ Usuarios │      │
│  CATÁLOGO        │  │ activos  │  │ nuevos   │      │
│  📦 Productos    │  │ este mes │  │ este mes │      │
│  🖼️ Imágenes     │  └──────────┘ └──────────┘      │
│  ─────────────── │                                  │
│  USUARIOS        │  ┌──────────────────────────┐    │
│  👥 Usuarios     │  │ GRÁFICO: Leads por mes   │    │
│  ─────────────── │  │                          │    │
│  CONTENIDO       │  │  [Bar chart o line chart]│    │
│  📝 Contenido    │  │                          │    │
│  ⚙️ Configuración│  └──────────────────────────┘    │
│                  │                                  │
│  [Salir]         │  ┌──────────────────────────┐    │
│                  │  │ TABLA: Últimos leads     │    │
│  Admin User      │  │ Nombre │ País │ Estado  │    │
│  admin@email.com │  │ Carlos │ CL   │ Nuevo   │    │
│                  │  │ María  │ MX   │ Contact.│    │
│                  │  │ ...    │ ...  │ ...     │    │
│                  │  └──────────────────────────┘    │
│                  │                                  │
└──────────────────┴──────────────────────────────────┘
```

---

### ⚙️ PANEL ADMIN — Productos (Listado)

```
┌─────────────────────────────────────────────────────┐
│ [Sidebar]        │ HEADER: Productos                │
│                  │ [+ Nuevo Producto]                 │
│                  │                                    │
│                  │ [🔍 Buscar...] [Categoría ▼] [Activo ▼]│
│                  │                                    │
│                  │ TABLA:                             │
│                  │ ┌─────────────────────────────────┐ │
│                  │ │ Imagen │ Nombre │ Categoría │ │
│                  │ │        │        │ Precio    │ │
│                  │ │        │ Estado │ Acciones  │ │
│                  │ ├─────────────────────────────────┤ │
│                  │ │ [img]  │AEROTERM│ Aerotermia│ │
│                  │ │        │ 12     │ $1.890    │ │
│                  │ │        │ ✅ Act.│ ✏️ 🗑️ 👁️ │ │
│                  │ ├─────────────────────────────────┤ │
│                  │ │ [img]  │GEOTERM │ Geotermia │ │
│                  │ │        │ 8      │ $2.450    │ │
│                  │ │        │ ✅ Act.│ ✏️ 🗑️ 👁️ │ │
│                  │ └─────────────────────────────────┘ │
│                  │                                    │
│                  │ [Anterior] 1 2 3 ... 10 [Siguiente]│
│                  │                                    │
└──────────────────┴────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Tablets pequeñas */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktop pequeño */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Desktop grande */
```

### Adaptaciones clave:

| Elemento | Mobile | Desktop |
|----------|--------|---------|
| Navbar | Hamburger menu | Horizontal links |
| Hero | 1 slide visible, swipe | 1 slide, arrows + dots |
| Product Grid | 1 columna | 3-4 columnas |
| Product Detail | Apilado vertical | 2 columnas |
| Admin Sidebar | Drawer overlay | Fixed sidebar |
| Tables | Cards scrolleables | Tabla completa |

---

## ♿ Accesibilidad (a11y)

- Contraste mínimo 4.5:1 para texto
- Focus visible en todos los elementos interactivos
- Alt text obligatorio en todas las imágenes
- Labels asociados a todos los inputs
- Skip-to-content link
- Keyboard navigation completo
- ARIA labels donde sea necesario

---

*Wireframes v1.0 — Proyecto Bombas de Calor*
