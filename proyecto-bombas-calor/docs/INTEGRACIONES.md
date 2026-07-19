# 🔌 INTEGRACIONES EXTERNAS

## CRM Externo

### Conexión: Webhook + API Bidireccional

```
┌─────────────────┐     Webhook      ┌─────────────────┐
│   Nuestro Sitio │  ─────────────▶  │  CRM Externo    │
│   (Next.js)     │                  │  (HubSpot/      │
│                 │                  │   Salesforce/   │
│                 │                  │   Zoho/Pipedrive)│
│                 │  ◀────────────── │                  │
│                 │   API Response   │                  │
└─────────────────┘                  └─────────────────┘
```

### Eventos que enviamos al CRM

| Evento | Trigger | Datos enviados |
|--------|---------|----------------|
| `lead_created` | Formulario de contacto | Nombre, email, teléfono, país, empresa, mensaje, producto de interés |
| `user_registered` | Registro completado | Nombre, email, teléfono, país, ciudad, empresa, source: 'website' |
| `distributor_approved` | Admin cambia role a 'distributor' | User ID, email, nombre, fecha aprobación |
| `product_interest` | Clic en "Quiero distribuir" en producto | User ID, product ID, nombre producto, fecha |
| `calculator_used` | Calculadora completada | User ID, inputs del cálculo, resultado, fecha |
| `quote_requested` | "Cotizar proyecto" en configurator | User ID, proyecto config, producto recomendado |

### Formato del Webhook

```json
{
  "event": "lead_created",
  "timestamp": "2024-06-05T14:30:00Z",
  "source": "website",
  "data": {
    "name": "Carlos Martínez",
    "email": "carlos@email.com",
    "phone": "+56912345678",
    "country": "Chile",
    "city": "Santiago",
    "company": "Instalaciones CM",
    "message": "Quiero ser distribuidor en zona oriente",
    "product_interest": "AEROTERM 12",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "distribuidores_cl"
  }
}
```

### Endpoint de recepción (nuestro lado)

```typescript
// /api/crm/webhook/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const payload = await req.json();
  
  // Validar secret
  const secret = req.headers.get('x-crm-secret');
  if (secret !== process.env.CRM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Procesar evento del CRM
  switch (payload.event) {
    case 'lead_updated':
      // Actualizar estado en nuestra DB
      await updateLeadStatus(payload.data);
      break;
    case 'deal_closed':
      // Marcar distribuidor como activo
      await markDistributorActive(payload.data);
      break;
  }
  
  return NextResponse.json({ success: true });
}
```

---

## 📧 Email (Transaccional)

### Proveedor recomendado: Resend (o SendGrid)

### Emails automáticos

| Email | Trigger | Contenido |
|-------|---------|-----------|
| **Confirmación de registro** | User crea cuenta | Link de confirmación, bienvenida, próximos pasos |
| **Cuenta activada** | Admin cambia a 'distributor' | "Ya eres distribuidor", instrucciones de acceso, precios disponibles |
| **Nuevo lead asignado** | Lead de su zona | Datos del cliente, producto de interés, sugerencia de contacto |
| **Recuperar contraseña** | User solicita reset | Link seguro para cambiar password |
| **Nuevo producto disponible** | Admin crea producto | Notificación a distribuidores con descuento de lanzamiento |
| **Newsletter mensual** | Cron mensual | Novedades, tips de instalación, casos de éxito |

### Template de "Cuenta Activada"

```
Asunto: ✅ Tu cuenta de distribuidor está activa — Bienvenido

Hola [nombre],

Revisamos tu solicitud y ya estás dentro.

Tu cuenta de distribuidor está activa. Esto significa que ahora puedes:

✓ Ver precios de distribuidor en todo el catálogo
✓ Descargar fichas técnicas en PDF
✓ Acceder a la calculadora de ahorro y otras herramientas
✓ Recibir leads de clientes en tu zona

👉 Acceder a mi cuenta: [link]

Próximos pasos:
1. Mira el catálogo con precios
2. Descarga la ficha de tu producto de interés
3. Si tienes dudas, escríbenos por WhatsApp: +56 9 9011 7784

Bienvenido al equipo.

—
Bombas de Calor Latinoamérica
```

---

## 📱 WhatsApp Business API

### Opción 1: WhatsApp Business API (Meta)
- Requiere cuenta de Business Manager
- Templates pre-aprobados por Meta
- Costo por mensaje (~$0.005-0.05 USD)

### Opción 2: WhatsApp Web (simple)
- Botón flotante con `wa.me` link
- Sin costo
- Sin automatización

### Recomendación: Combinar ambas

```
Botón flotante: wa.me/56990117784 (gratis, inmediato)
Notificaciones: WhatsApp Business API (templates aprobados)
```

### Templates de WhatsApp (Meta Business API)

**Template 1: Nueva cuenta activada**
```
Hola {{1}}, ¡bienvenido!

Tu cuenta de distribuidor está activa. Ya puedes ver precios en:
{{2}}

¿Dudas? Responde aquí o llama al +56 9 9011 7784
```

**Template 2: Nuevo lead asignado**
```
Hola {{1}}, tenés un nuevo lead en {{2}}.

Cliente: {{3}}
Teléfono: {{4}}
Interés: {{5}}

Contactalo en las próximas 2 horas para mayor efectividad.
```

---

## 📊 Analytics

### Vercel Analytics (nativo)
- Web Vitals
- Traffic
- Performance

### Analytics Custom (Supabase)

```sql
-- Tabla user_activity ya definida en DATABASE.md
-- Se puede consultar con:

-- Leads por mes
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as leads
FROM leads
GROUP BY month
ORDER BY month DESC;

-- Conversiones: visitor → distributor
SELECT 
  role,
  COUNT(*),
  DATE_TRUNC('month', created_at) as month
FROM users
GROUP BY role, month
ORDER BY month DESC;

-- Páginas más visitadas
SELECT 
  page,
  COUNT(*) as visits
FROM user_activity
WHERE action = 'page_view'
GROUP BY page
ORDER BY visits DESC;
```

### Dashboard de Analytics (Admin)

| Métrica | Cálculo | Frecuencia |
|---------|---------|------------|
| Visitantes únicos | COUNT(DISTINCT session_id) | Diario |
| Registros nuevos | COUNT(users) WHERE created_at = hoy | Diario |
| Leads generados | COUNT(leads) WHERE created_at = hoy | Diario |
| Tasa de conversión | Leads / Visitantes * 100 | Semanal |
| Producto más visto | Producto con más page_views | Semanal |
| Tiempo promedio en página | AVG(time_on_page) | Mensual |

---

## 🗺️ Google Maps / Geolocalización

### Uso: Zonas de distribuidores

```
1. Distribuidor se registra con ciudad
2. Admin asigna zona de cobertura (radio en km)
3. Cuando llega lead por web, sistema geocodifica dirección
4. Asigna lead al distribuidor más cercano / zona correspondiente
5. Notifica distribuidor por email/WhatsApp
```

### API: Google Maps Geocoding (opcional)

```typescript
// Asignar lead a distribuidor por zona
async function assignLeadToDistributor(lead: Lead) {
  // Geocodificar dirección del lead
  const coords = await geocodeAddress(lead.address);
  
  // Buscar distribuidores en zona
  const distributors = await db
    .select('*')
    .from('users')
    .where('role', 'distributor')
    .where('is_active', true);
  
  // Encontrar más cercano
  const nearest = findNearest(coords, distributors);
  
  // Asignar y notificar
  await assignLead(lead.id, nearest.id);
  await notifyDistributor(nearest.id, lead);
}
```

---

## 🖼️ Optimización de Imágenes

### Next.js Image (automático)

```tsx
import Image from 'next/image';

// Optimización automática: WebP, lazy loading, responsive
<Image
  src={product.image_url}
  alt={product.name}
  width={800}
  height={600}
  className="rounded-lg"
  priority={isPrimary} // Precarga para LCP
/>
```

### Supabase Storage + Transformations

```
URL base: https://xxxx.supabase.co/storage/v1/object/public/products/image.jpg

Con transformación:
https://xxxx.supabase.co/storage/v1/render/image/public/products/image.jpg?width=800&height=600&resize=contain
```

---

## 🔒 Seguridad

### Headers de seguridad (Next.js)

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};
```

### Rate Limiting (API)

```typescript
// Middleware o API route
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minuto
  uniqueTokenPerInterval: 500,
});

export async function POST(req: Request) {
  try {
    await limiter.check(10, req.ip); // 10 requests por minuto
    // ... procesar request
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
}
```

---

*Integraciones v1.0 — Proyecto Bombas de Calor*
