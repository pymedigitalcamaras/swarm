# ⚙️ PANEL DE ADMINISTRACIÓN (CMS)

> **CRÍTICO:** Este panel debe permitir gestionar TODO el sitio sin tocar código.

---

## 🎯 Acceso

```
URL: /admin
Login requerido: Sí
Rol requerido: admin
Redirección no autorizado: /login o /
```

### Layout del Panel

```
┌─────────────────────────────────────────────────────┐
│ [Sidebar]        │ [Header: Admin Dashboard]        │
│                  │                                  │
│  LOGO            │  CONTENIDO                       │
│  ┌────────┐      │                                  │
│  │        │      │  ┌──────────────────────────┐   │
│  │ LOGO   │      │  │                          │   │
│  │        │      │  │  [Página actual]         │   │
│  └────────┘      │  │                          │   │
│                  │  └──────────────────────────┘   │
│  ─────────────── │                                  │
│  MENÚ PRINCIPAL  │                                  │
│                  │                                  │
│  📊 Dashboard    │                                  │
│  ─────────────── │                                  │
│  📦 Productos    │                                  │
│  🖼️ Imágenes     │                                  │
│  ─────────────── │                                  │
│  👥 Usuarios     │                                  │
│  ─────────────── │                                  │
│  📝 Contenido    │                                  │
│  ⚙️ Configuración│                                  │
│                  │                                  │
│  ─────────────── │                                  │
│  [🌐 Ver sitio]  │                                  │
│  [🚪 Salir]      │                                  │
│                  │                                  │
│  Admin User      │                                  │
│  admin@mail.com  │                                  │
│                  │                                  │
└──────────────────┴──────────────────────────────────┘
```

---

## 1. DASHBOARD (/admin)

### Métricas principales (Cards)

| Métrica | Valor | Cambio vs mes anterior |
|---------|-------|------------------------|
| 👁️ Visitas este mes | 12,450 | +15% |
| 👤 Usuarios registrados | 45 | +8 |
| 🏷️ Distribuidores activos | 12 | +3 |
| 📦 Productos activos | 28 | 0 |
| 📞 Leads nuevos (7 días) | 8 | +2 |
| 💰 Cotizaciones enviadas | 15 | +5 |

### Gráficos

**Gráfico 1: Visitas por día (últimos 30 días)**
- Tipo: Line chart
- Datos: user_activity WHERE action='page_view' GROUP BY DATE(created_at)

**Gráfico 2: Leads por estado**
- Tipo: Donut chart
- Datos: leads GROUP BY status

**Gráfico 3: Productos más vistos**
- Tipo: Bar chart horizontal
- Top 10 productos por page views

### Tabla: Últimos leads

| Nombre | Email | País | Producto | Estado | Fecha | Acciones |
|--------|-------|------|----------|--------|-------|----------|
| Carlos | car@... | CL | AEROTERM 12 | Nuevo | Hoy | [Ver] [Contactar] |
| María | mar@... | MX | GEOTERM 8 | Contactado | Ayer | [Ver] [Editar] |

### Acciones rápidas (Botones)

- [+ Nuevo producto] → /admin/productos/nuevo
- [+ Nuevo slide] → /admin/imagenes?tab=hero
- [📊 Ver analytics completo] → (futuro: /admin/analytics)

---

## 2. GESTIÓN DE PRODUCTOS (/admin/productos)

### Listado de Productos

```
┌─────────────────────────────────────────────────────┐
│ Productos                              [+ Nuevo]   │
├─────────────────────────────────────────────────────┤
│ [🔍 Buscar...] [Categoría ▼] [Estado ▼] [Exportar]│
├─────────────────────────────────────────────────────┤
│ Imagen │ Nombre │ Categoría │ Precio │ Estado │ Acc.│
├────────┼────────┼───────────┼────────┼────────┼─────┤
│ [img]  │AEROTER.│ Aerotermia│ $1,890 │ ✅ Act.│ ✏️ 🗑️│
│ [img]  │GEOTERM │ Geotermia │ $2,450 │ ✅ Act.│ ✏️ 🗑️│
│ [img]  │ACS 200 │ ACS       │ $890   │ 🚫 Ina.│ ✏️ 🗑️│
├─────────────────────────────────────────────────────┤
│ [Anterior] 1 2 3 ... 10 [Siguiente]                │
└─────────────────────────────────────────────────────┘
```

### Filtros

- **Buscar:** Por nombre, modelo, descripción
- **Categoría:** Todas, Aerotermia, Geotermia, ACS, Industrial, Piscinas
- **Estado:** Todos, Activos, Inactivos, Destacados

### Acciones por fila

- ✏️ **Editar:** Abre formulario de edición
- 🗑️ **Eliminar:** Confirmación modal, luego soft delete (is_active=false)
- 👁️ **Ver en sitio:** Abre /productos/[slug] en nueva pestaña
- ⭐ **Destacar:** Toggle is_featured

### Crear/Editar Producto (/admin/productos/[id])

```
┌─────────────────────────────────────────────────────┐
│ [← Volver]  Editar: AEROTERM 12                     │
│                                     [Guardar] [Descartar]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  📋 INFORMACIÓN BÁSICA                              │
│  Nombre: [Bomba de Calor AEROTERM 12            ]   │
│  Slug:  [bomba-calor-aeroterm-12                  ]   │
│  Categoría: [Aerotermia ▼]                          │
│  Descripción corta: [12 kW ideal para casas 120m²]  │
│  Descripción completa: [Textarea con markdown]      │
│                                                     │
│  🏷️ ESTADO                                          │
│  ☑️ Activo  ☑️ Destacado  Orden: [1]               │
│                                                     │
│  💰 PRECIO (Distribuidor)                           │
│  Precio: [$ 1.890      ] USD                        │
│  Precio venta sugerido: [$ 2.990      ] USD          │
│  Moneda: [USD ▼]                                    │
│                                                     │
│  ⚙️ ESPECIFICACIONES TÉCNICAS (JSON)                │
│  ┌─────────────────────────────────────────────┐    │
│  │ {                                           │    │
│  │   "power_kw": 12,                          │    │
│  │   "cop": 4.2,                              │    │
│  │   "voltage": "220V",                       │    │
│  │   "noise_db": 45,                          │    │
│  │   "dimensions": "1100x950x420",            │    │
│  │   "weight_kg": 85,                         │    │
│  │   "refrigerant": "R32"                     │    │
│  │ }                                           │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ✨ BENEFICIOS (JSON Array)                         │
│  ["Ahorro 70% vs gas", "Instalación 1 día", ...]   │
│                                                     │
│  🖼️ IMÁGENES (Mínimo 5)                             │
│  ┌─────────────────────────────────────────────┐    │
│  │ [Dropzone: Arrastra imágenes aquí]           │    │
│  │                                              │    │
│  │ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │    │
│  │ │ [img 1]│ │ [img 2]│ │ [img 3]│ │ [img 4]│  │    │
│  │ │ ☑️ Prim│ │   [x]  │ │   [x]  │ │   [x]  │  │    │
│  │ │ [Alt]  │ │ [Alt]  │ │ [Alt]  │ │ [Alt]  │  │    │
│  │ └────────┘ └────────┘ └────────┘ └────────┘  │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  🔍 SEO                                              │
│  Meta title: [Bomba de Calor AEROTERM 12 | ...]     │
│  Meta description: [Descripción para Google...]     │
│                                                     │
│  [Guardar cambios]           [Eliminar producto]    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 3. GESTIÓN DE IMÁGENES (/admin/imagenes)

### Tabs

```
┌─────────────────────────────────────────────────────┐
│ Imágenes                                            │
│ [Productos] [Hero Slider] [Contenido] [Documentos]  │
├─────────────────────────────────────────────────────┤
```

### Tab: Productos

- Grid de imágenes por producto
- Filtro: Seleccionar producto
- Acciones: Subir, Reemplazar, Eliminar, Reordenar
- Preview con thumbnail
- Alt text editable

### Tab: Hero Slider

```
┌─────────────────────────────────────────────────────┐
│ Hero Slider                              [+ Agregar]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  Slide 1 (arrastra para reordenar)                  │
│  ┌─────────────────────────────────────────────┐     │
│  │ [Imagen]                                    │     │
│  │ Título: "La calefacción que tu cliente..." │     │
│  │ Subtítulo: "Bombas de calor de alta..."    │     │
│  │ CTA: "Ver catálogo" → /productos            │     │
│  │ CTA 2: "Quiero ser distribuidor" → /distri..│     │
│  │ [Editar] [Reemplazar imagen] [Eliminar]     │     │
│  └─────────────────────────────────────────────┘     │
│                                                     │
│  Slide 2...                                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Tab: Contenido

- Imágenes sueltas para usar en CMS
- Carpetas: about, features, blog, testimonials
- Upload drag & drop
- URL copiable con un clic

---

## 4. GESTIÓN DE USUARIOS (/admin/usuarios)

### Listado

```
┌─────────────────────────────────────────────────────┐
│ Usuarios                                            │
├─────────────────────────────────────────────────────┤
│ [🔍 Buscar...] [Rol ▼] [País ▼] [Estado ▼]         │
├─────────────────────────────────────────────────────┤
│ Nombre │ Email │ País │ Rol │ Estado │ Registro │ Acc.│
├────────┼───────┼──────┼─────┼────────┼──────────┼─────┤
│ Carlos │ car@  │ CL   │ Dist│ ✅ Act.│ 2024-05  │ ✏️  │
│ María  │ mar@  │ MX   │ Vis.│ ✅ Act.│ 2024-06  │ ✏️  │
│ Admin  │ adm@  │ CL   │ Adm.│ ✅ Act.│ 2024-01  │ —   │
├─────────────────────────────────────────────────────┤
│ [Anterior] 1 2 [Siguiente]                          │
└─────────────────────────────────────────────────────┘
```

### Editar Usuario

```
┌─────────────────────────────────────────────────────┐
│ Editar: Carlos Martínez                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Información:                                       │
│  Nombre: [Carlos Martínez]                          │
│  Email: [carlos@email.com] (no editable)             │
│  Teléfono: [+56912345678]                           │
│  País: [Chile ▼]                                    │
│  Ciudad: [Santiago]                                 │
│  Empresa: [Instalaciones CM]                        │
│                                                     │
│  Rol: [Distribuidor ▼]  ← CRÍTICO                   │
│  Opciones: Visitante / Distribuidor / Admin          │
│                                                     │
│  Estado: ☑️ Activo                                   │
│                                                     │
│  [Guardar cambios]                                  │
│                                                     │
│  ────────────────────────────                       │
│  Actividad reciente:                                 │
│  • 2024-06-05: Login                                │
│  • 2024-06-04: Visto producto AEROTERM 12           │
│  • 2024-06-03: Descargó ficha técnica               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Flujo de activación de distribuidor:**
1. Usuario se registra → role='visitor' automático
2. Admin va a /admin/usuarios
3. Edita usuario → cambia role a 'distributor'
4. Sistema envía email/WhatsApp automático: "Tu cuenta fue activada"
5. Usuario ahora ve precios y contenido exclusivo

---

## 5. EDICIÓN DE CONTENIDO (/admin/contenido)

> **MUY IMPORTANTE:** El sitio debe poder modificarse SIN tocar código.

### Secciones editables

| Sección | Key | Campos editables |
|---------|-----|------------------|
| Hero textos | `hero_title`, `hero_subtitle` | Título, subtítulo general |
| Propuesta valor | `value_prop_1`, `value_prop_2`, `value_prop_3` | Título, descripción, icono |
| Stats | `stats_installations`, `stats_distributors`, `stats_countries` | Número, label |
| CTA principal | `cta_main_title`, `cta_main_subtitle` | Título, subtítulo, texto botón |
| Footer | `footer_company`, `footer_email`, `footer_phone` | Textos de contacto |
| WhatsApp | `whatsapp_number` | Número de teléfono |

### Interfaz de edición

```
┌─────────────────────────────────────────────────────┐
│ Contenido del Sitio                                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📄 Sección: Hero                                    │
│  ┌─────────────────────────────────────────────┐     │
│  │ Título principal:                            │     │
│  │ [La calefacción que tu cliente ya debería   │     │
│  │  tener                                       │     │
│  │                                              │     │
│  │ Subtítulo:                                   │     │
│  │ [Bombas de calor de alta eficiencia...      │     │
│  │                                              │     │
│  │ Texto botón CTA: [Ver catálogo]             │     │
│  │ Link CTA: [/productos]                       │     │
│  └─────────────────────────────────────────────┘     │
│                                                     │
│  📄 Sección: Propuesta de Valor (Card 1)            │
│  ┌─────────────────────────────────────────────┐     │
│  │ Título: [Tecnología que no te deja solo]   │     │
│  │                                              │     │
│  │ Descripción: [Bombas de calor con COP 4.0+..│     │
│  │                                              │     │
│  │ Icono: [🔧 ▼] (Selector de icono Lucide)    │     │
│  └─────────────────────────────────────────────┘     │
│                                                     │
│  [Guardar todos los cambios]                        │
│                                                     │
│  ⚠️ Los cambios se reflejan inmediatamente en el   │
│     sitio público.                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Cómo funciona técnicamente

```typescript
// Al guardar, actualiza tabla site_content:
await supabase
  .from('site_content')
  .upsert({
    key: 'hero_title',
    section: 'hero',
    content: {
      es: { value: 'La calefacción que tu cliente ya debería tener' }
    }
  });

// En el frontend, se lee:
const { data } = await supabase
  .from('site_content')
  .select('*')
  .eq('key', 'hero_title')
  .single();

const title = data?.content?.es?.value || 'Fallback';
```

---

## 6. CONFIGURACIÓN (/admin/configuracion)

### Settings del sitio

| Setting | Key | Tipo | Default |
|---------|-----|------|---------|
| Nombre empresa | `company_name` | string | "Bombas de Calor LATAM" |
| WhatsApp | `whatsapp_number` | string | "+56990117784" |
| Email contacto | `contact_email` | string | "distribuidores@..." |
| Moneda | `currency_default` | string | "USD" |
| Login requerido precios | `login_required_for_prices` | boolean | true |
| Webhook CRM | `crm_webhook_url` | string | "" |
| Países disponibles | `available_countries` | json | ["CL", "MX", "CO", "PE", "AR"] |
| Mantenimiento | `maintenance_mode` | boolean | false |

### Interfaz

```
┌─────────────────────────────────────────────────────┐
│ Configuración                                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📞 CONTACTO                                        │
│  WhatsApp: [+56 9 9011 7784      ]                  │
│  Email:    [distribuidores@...   ]                  │
│                                                     │
│  💰 NEGOCIO                                         │
│  Moneda default: [USD ▼]                            │
│  Login para precios: ☑️ Sí                          │
│                                                     │
│  🔌 INTEGRACIONES                                   │
│  Webhook CRM: [https://crm.com/webhook]             │
│  Secret CRM:  [••••••••••••••]                     │
│                                                     │
│  🌍 LOCALIZACIÓN                                    │
│  Países activos: [Chile] [México] [Colombia] [+]   │
│                                                     │
│  🔧 SITIO                                           │
│  Modo mantenimiento: ☐ No                           │
│                                                     │
│  [Guardar configuración]                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 7. COMPONENTES REUTILIZABLES DEL ADMIN

### DataTable
```tsx
// components/admin/DataTable.tsx
// Props: columns, data, filters, pagination, actions
// Features: Ordenar, filtrar, paginar, seleccionar filas
```

### FormField
```tsx
// components/admin/FormField.tsx
// Props: label, type, value, onChange, error, required
// Types: text, textarea, number, select, checkbox, json, image
```

### ImageUploader
```tsx
// components/admin/ImageUploader.tsx
// Props: bucket, path, onUpload, multiple, maxSize
// Features: Drag & drop, preview, progress, validation
```

### StatusBadge
```tsx
// components/admin/StatusBadge.tsx
// Props: status (active, inactive, pending, new, contacted, etc.)
// Colors: green (active), red (inactive), yellow (pending), blue (new)
```

### ConfirmDialog
```tsx
// components/admin/ConfirmDialog.tsx
// Props: title, description, onConfirm, onCancel
// Usage: Eliminar producto, cambiar rol, desactivar usuario
```

---

## 8. CHECKLIST DE IMPLEMENTACIÓN DEL PANEL

### Core
- [ ] Layout con sidebar responsive
- [ ] Protección por rol admin (middleware)
- [ ] Dashboard con métricas reales
- [ ] Tabla de productos con CRUD
- [ ] Formulario de producto completo
- [ ] Gestión de imágenes con drag & drop
- [ ] Gestión del hero slider
- [ ] Tabla de usuarios con edición de roles
- [ ] Edición de contenido sin código
- [ ] Página de configuración

### UX
- [ ] Toast notifications (éxito, error, info)
- [ ] Loading states en todas las acciones
- [ ] Confirmación antes de eliminar
- [ ] Auto-guardar en formularios (opcional)
- [ ] Breadcrumbs en todas las páginas
- [ ] Búsqueda en todas las tablas
- [ ] Filtros y ordenamiento
- [ ] Exportar a CSV (usuarios, leads, productos)

### Seguridad
- [ ] Solo admin accede a /admin
- [ ] Validación de forms en cliente y servidor
- [ ] Sanitización de inputs
- [ ] Audit trail (quién cambió qué y cuándo)
- [ ] Rate limiting en APIs de admin

---

*Panel Admin v1.0 — Proyecto Bombas de Calor*
