# 🔄 FLUJO DE USUARIO

## Mapa de Flujos Principales

```
┌─────────────────────────────────────────────────────────────────────┐
│                         VISITANTE ANÓNIMO                           │
│                    (Llega por cualquier canal)                       │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🏠 HOME                                                            │
│  ├── Ve hero slider                                                │
│ ├── Lee propuesta de valor                                         │
│ ├── Ve stats de credibilidad                                       │
│ ├── CTA principal: "Quiero ser distribuidor"                        │
│ └── WhatsApp flotante siempre visible                              │
└─────────────────────────────────────────────────────────────────────┘
                              │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ 📦 PRODUCTOS  │  │ 🤝 DISTRIB.  │  │ 🔧 HERRAM.  │
│              │  │              │  │              │
│ Ve catálogo  │  │ Lee programa │  │ Usa calcula.│
│ Sin precios  │  │ Aplica       │  │ Usa config.  │
│ (🔒 locked)  │  │ Formulario   │  │ Usa simul.   │
└──────────────┘  └──────────────┘  └──────────────┘
          │                  │                  │
          │                  │                  │
          ▼                  │                  ▼
┌─────────────────────────────────────┐       │
│ 🔐 LOGIN / REGISTRO                 │       │
│                                    │       │
│ 2 caminos:                          │       │
│                                    │       │
│ A) Ya es distribuidor:              │       │
│    → Login con email/pass           │       │
│    → Acceso a precios               │       │
│                                    │       │
│ B) Nuevo interesado:                │       │
│    → Registro (paso 1)              │       │
│    → Confirmación email             │       │
│    → Espera activación (24-48h)     │       │
│    → Admin cambia role a distrib.   │       │
│    → Notificación WhatsApp/email    │       │
└─────────────────────────────────────┘       │
          │                                   │
          │ (A) Ya activo                     │ (B) Nuevo
          ▼                                   │
┌─────────────────────────────────────────────┐│
│ 🎯 DISTRIBUIDOR ACTIVO (logueado)          ││
│                                             ││
│ Capacidades:                                ││
│ • Ve precios en productos                   ││
│ • Descarga fichas técnicas PDF              ││
│ • Accede a herramientas avanzadas           ││
│ • Recibe leads de su zona                   ││
│ • Contacto directo con soporte técnico      ││
│                                             ││
│ Flujo típico:                               ││
│ 1. Entra a productos                        ││
│ 2. Ve precio + margen sugerido              ││
│ 3. Descarga ficha técnica                   ││
│ 4. Usa calculadora para cotizar cliente     ││
│ 5. Clickea "Conectar con CRM"               ││
│ 6. Sistema envía lead a CRM externo         ││
│ 7. Recibe seguimiento en WhatsApp/email      ││
└─────────────────────────────────────────────┘│
                                               │
                                               ▼
┌─────────────────────────────────────────────┐
│ 📞 CRM EXTERNO (Integración)                │
│                                             │
│ Datos enviados:                             │
│ • Info del distribuidor                     │
│ • Producto de interés                       │
│ • Cliente final (si aplica)                 │
│ • Cotización generada                       │
│                                             │
│ Respuesta esperada:                         │
│ • Confirmación de recepción                │
│ • Asignación de vendedor                   │
│ • Seguimiento en pipeline                  │
└─────────────────────────────────────────────┘
```

---

## 🔍 Flujo Detallado: Visitante → Distribuidor

### Paso 1: Descubrimiento (Home)

**Duración objetivo:** 30-60 segundos
**Acciones:**
1. Usuario llega al sitio (SEO, ads, referral, WhatsApp)
2. Ve hero slider (3-5 slides, autoplay 5s cada uno)
3. Lee propuesta de valor en 3 cards
4. Stats de credibilidad (números grandes)

**Decisiones:**
- ¿Quiere ver productos? → /productos
- ¿Quiere aplicar como distribuidor? → /distribuidores
- ¿Quiere hablar por WhatsApp? → Clickea botón flotante

---

### Paso 2: Exploración de Productos (Catálogo)

**Duración objetivo:** 1-3 minutos
**Acciones:**
1. Usuario entra a /productos
2. Ve grid de productos con filtros por categoría
3. Cada tarjeta muestra:
   - Imagen principal
   - Nombre y modelo
   - Specs clave (kW, COP, voltaje)
   - "🔒 Precio: Login requerido"
   - CTA: "Ver ficha técnica"

**Frustración potencial:** No ver precios
**Solución:** Banner persistente: "Regístrate gratis para ver precios de distribuidor"

**Decisiones:**
- ¿Clickea en producto? → Ficha individual
- ¿Clickea "Login para ver precios"? → /login
- ¿Clickea "Quiero ser distribuidor"? → /distribuidores

---

### Paso 3: Ficha de Producto (Detalle)

**Duración objetivo:** 2-5 minutos
**Acciones:**
1. Usuario ve galería de imágenes (5 mínimo)
2. Lee especificaciones técnicas
3. Lee beneficios (5 bullets)
4. Ve "🔒 Precio bloqueado" o precio real si logueado
5. Ve CTAs:
   - "Quiero ser distribuidor de este producto"
   - "Descargar ficha técnica PDF"
   - "¿Dudas? Habla con un ingeniero" (WhatsApp)

**Si logueado (distribuidor):**
- Ve precio de distribuidor
- Ve precio de venta sugerido
- Ve margen calculado
- Puede descargar PDF
- Puede "Enviar a CRM" (lead)

---

### Paso 4: Registro (Nuevo usuario)

**Duración objetivo:** 2-3 minutos
**Formulario:**
1. Nombre completo
2. Email
3. Teléfono (WhatsApp)
4. País
5. Ciudad
6. Empresa (opcional)
7. Contraseña
8. Confirmar contraseña

**Validaciones:**
- Email único
- Teléfono con formato válido por país
- Contraseña 8+ caracteres

**Después del submit:**
1. Muestra: "✅ Cuenta creada. Revisa tu correo."
2. Envía email de confirmación (Supabase Auth)
3. Usuario tiene role='visitor' por defecto
4. Admin recibe notificación de nuevo registro
5. Admin revisa y cambia role a 'distributor' en 24-48h
6. Sistema envía WhatsApp/email al usuario: "Tu cuenta fue activada"

---

### Paso 5: Primer Login como Distribuidor

**Experiencia:**
1. Usuario entra con email/pass
2. Sistema verifica role='distributor'
3. Redirige a /productos (o dashboard personalizado)
4. Muestra mensaje de bienvenida: "Bienvenido, [nombre]. Ya puedes ver precios."
5. Primer producto que ve ya muestra precio real

**Onboarding opcional ( primera vez):**
- Tour de 3 pasos del panel
- Explicación de herramientas disponibles
- Sugerencia de descargar primera ficha técnica

---

## 🔄 Flujo de Conversión: Herramientas → Lead → CRM

### Calculadora de Ahorro

```
1. Usuario (visitante o distribuidor) entra a /herramientas/calculadora-ahorro
2. Ingresa datos del cliente:
   - Tipo calefacción actual
   - Gasto mensual
   - m²
   - Ciudad
3. Sistema calcula:
   - Ahorro anual
   - Retorno de inversión
   - Ahorro 10 años
   - CO2 evitado
4. Muestra resultado visual (gráfico simple)
5. CTA: "Quiero ofrecer esto a mis clientes"
6. Si no logueado → /login con mensaje: "Guarda esta cotización registrándote"
7. Si logueado → Opción de "Enviar a CRM" con datos del cálculo
```

### Configurador de Proyecto

```
1. Usuario responde 5 preguntas paso a paso
2. Sistema recomienda producto ideal
3. Muestra ficha técnica resumida
4. Si logueado: muestra precio + opción de cotizar
5. CTA: "Cotizar este proyecto" → Genera lead en CRM
```

### Simulador de Negocio

```
1. Usuario ajusta variables (slider)
2. Sistema calcula proyección de ingresos
3. Muestra gráfico de crecimiento año 1-3
4. CTA: "Quiero empezar con estas cifras" → /distribuidores
```

---

## 📞 Flujo WhatsApp

### Botón Flotante (Siempre visible)

```
+56 9 9011 7784

Icono: WhatsApp (verde, pulso suave)
Posición: Bottom-right, fixed
Margin: 24px desde bordes

Tooltip on hover: "Hablar con un asesor"
```

### Click en WhatsApp

```
1. Usuario clickea botón
2. Abre WhatsApp Web o app nativa
3. Mensaje pre-llenado (opcional):
   "Hola, vi su página de bombas de calor y tengo interés en [producto/página actual]."
4. Número destino: +56 9 9011 7784
```

---

## 🔐 Flujo de Roles y Permisos

```
┌─────────────────────────────────────────────────────────┐
│ VISITOR (role='visitor')                                │
│ • Ve productos sin precios                              │
│ • Usa herramientas básicas                              │
│ • Puede registrarse                                     │
│ • Ve contenido público                                  │
└─────────────────────────────────────────────────────────┘
                           │
                           │ (Admin aprueba)
                           ▼
┌─────────────────────────────────────────────────────────┐
│ DISTRIBUTOR (role='distributor')                        │
│ • Ve productos CON precios                              │
│ • Descarga fichas técnicas                              │
│ • Accede a herramientas avanzadas                       │
│ • Recibe leads de su zona                               │
│ • Puede enviar leads a CRM                              │
│ • Ve contenido exclusivo                                │
└─────────────────────────────────────────────────────────┘
                           │
                           │ (Admin asigna)
                           ▼
┌─────────────────────────────────────────────────────────┐
│ ADMIN (role='admin')                                    │
│ • Todo lo del distribuidor                              │
│ • Acceso a /admin/*                                     │
│ • CRUD productos, usuarios, imágenes                      │
│ • Edita contenido del sitio                             │
│ • Ve analytics y leads                                  │
│ • Gestiona slider hero                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Diagrama de Estados: Lead

```
┌─────────┐    ┌────────────┐    ┌──────────┐    ┌──────────┐
│  NEW    │───▶│ CONTACTED  │───▶│ QUALIFIED│───▶│ CONVERTED│
│ (Nuevo) │    │ (Contactado)│   │ (Calificado)│  │ (Convertido)│
└─────────┘    └────────────┘    └──────────┘    └──────────┘
       │              │              │               │
       │              │              │               │
       ▼              ▼              ▼               ▼
   ┌─────────┐   ┌─────────┐   ┌─────────┐    ┌─────────┐
   │  LOST   │   │  LOST   │   │  LOST   │    │  LOST   │
   │ (Perdido)│   │ (Perdido)│   │ (Perdido)│    │ (Perdido)│
   └─────────┘   └─────────┘   └─────────┘    └─────────┘

Transiciones:
- NEW → CONTACTED: Admin/CRM marca como contactado
- CONTACTED → QUALIFIED: Interés confirmado, presupuesto OK
- QUALIFIED → CONVERTED: Compra realizada, distribuidor activo
- Cualquier estado → LOST: No interés, no responde, no califica
```

---

## 📊 Mapa de Calor: Dónde Clickean

| Zona | % Clics | Acción esperada |
|------|---------|-----------------|
| Hero CTA primario | 35% | /productos o /distribuidores |
| WhatsApp flotante | 25% | Abre WhatsApp |
| Producto individual | 15% | /productos/[slug] |
| Login/Registro | 10% | /login |
| Herramientas | 8% | /herramientas/* |
| Footer links | 5% | Variado |
| Navbar | 2% | Navegación general |

---

*Flujo de Usuario v1.0 — Proyecto Bombas de Calor*
