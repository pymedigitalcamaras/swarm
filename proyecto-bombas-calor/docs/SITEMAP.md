# 📍 SITEMAP

## Estructura del Sitio Web

```
/
├── / (Home)
│   ├── Hero Slider (3-5 slides)
│   ├── Propuesta de Valor
│   ├── CTA Principal
│   ├── WhatsApp Flotante
│   └── Footer
│
├── /productos
│   ├── /productos (Listado por categorías)
│   └── /productos/[slug] (Ficha técnica individual)
│       ├── Galería (5 imágenes mínimo)
│       ├── Especificaciones técnicas
│       ├── Beneficios
│       ├── Precio (bloqueado hasta login)
│       └── CTA "Quiero ser distribuidor"
│
├── /como-trabajamos
│   ├── Proceso paso a paso
│   ├── Formación de distribuidores
│   ├── Acompañamiento técnico
│   └── Casos de éxito
│
├── /distribuidores
│   ├── Beneficios del programa
│   ├── Requisitos
│   ├── Testimonios
│   ├── Formulario de aplicación
│   └── CTA "Aplicar ahora"
│
├── /herramientas
│   ├── /herramientas/calculadora-ahorro
│   │   └── Calculadora interactiva de ahorro energético
│   ├── /herramientas/configurador-proyecto
│   │   └── Configurador de proyectos por zona/region
│   └── /herramientas/simulador-negocio
│       └── Simulador de rentabilidad como distribuidor
│
├── /login
│   ├── Formulario de login
│   ├── Registro (2 pasos)
│   └── Recuperar contraseña
│
├── /admin (Panel de Administración)
│   ├── /admin/dashboard
│   ├── /admin/productos
│   ├── /admin/imagenes
│   ├── /admin/usuarios
│   ├── /admin/contenido
│   └── /admin/configuracion
│
└── /api (Rutas API internas)
    ├── /api/auth/* (NextAuth/Supabase Auth)
    ├── /api/productos/*
    ├── /api/imagenes/*
    ├── /api/usuarios/*
    └── /api/crm/*
```

---

## 🧭 Navegación Principal (Navbar)

| Posición | Label | Ruta | Visible para |
|----------|-------|------|--------------|
| 1 | Productos | /productos | Todos |
| 2 | Cómo Trabajamos | /como-trabajamos | Todos |
| 3 | Distribuidores | /distribuidores | Todos |
| 4 | Herramientas | /herramientas | Todos |
| 5 | Login | /login | No autenticados |
| 6 | Admin | /admin | Solo admin |
| 7 | Mi Cuenta | /dashboard | Distribuidores |
| 8 | Cerrar Sesión | — | Autenticados |

---

## 🎯 Páginas por Rol de Usuario

### Visitante (sin login)
- Accede a todas las páginas públicas
- Ve productos SIN precios
- Puede usar herramientas básicas
- Puede registrarse

### Distribuidor (logueado)
- Ve productos CON precios
- Accede a herramientas avanzadas
- Puede descargar fichas técnicas
- Ve contenido exclusivo
- Conecta con CRM

### Admin
- Acceso total al panel admin
- Gestiona productos, imágenes, usuarios
- Edita contenido del sitio
- Ve analytics

---

## 📱 URLs Amigables (SEO)

| Página | URL |
|--------|-----|
| Home | `/` |
| Productos | `/productos` |
| Producto individual | `/productos/bomba-calor-aerotermia-12kw` |
| Cómo Trabajamos | `/como-trabajamos` |
| Distribuidores | `/distribuidores` |
| Calculadora | `/herramientas/calculadora-ahorro` |
| Configurador | `/herramientas/configurador-proyecto` |
| Simulador | `/herramientas/simulador-negocio` |
| Login | `/login` |
| Admin Dashboard | `/admin` |
| Admin Productos | `/admin/productos` |
| Admin Imágenes | `/admin/imagenes` |
| Admin Usuarios | `/admin/usuarios` |
| Admin Contenido | `/admin/contenido` |

---

## 🔗 Redirecciones Importantes

| De | A | Condición |
|----|---|-----------|
| `/admin` | `/admin/dashboard` | Siempre |
| `/productos` | `/login` | Si intenta ver precio sin login |
| `/herramientas` | `/herramientas/calculadora-ahorro` | Página por defecto |
| `/login` | `/` | Si ya está autenticado |

---

## 📝 Meta Tags por Página (SEO Latinoamérica)

### Home
```
title: "Bombas de Calor para Latinoamérica | Formamos Distribuidores Exitosos"
description: "Fabricante de bombas de calor con acompañamiento completo. No solo vendemos productos, formamos distribuidores exitosos en Chile, México, Colombia."
keywords: "bombas de calor, aerotermia, calefacción eficiente, distribuidores Latinoamérica, energía renovable"
```

### Productos
```
title: "Catálogo de Bombas de Calor | Precios para Distribuidores"
description: "Catálogo técnico completo de bombas de calor. Regístrate para ver precios de distribuidor. Envío a toda Latinoamérica."
```

### Distribuidores
```
title: "Programa de Distribuidores | Bombas de Calor Latinoamérica"
description: "Únete a nuestra red de distribuidores. Capacitación, acompañamiento técnico y precios preferenciales."
```

---

*Sitemap v1.0 — Proyecto Bombas de Calor*
