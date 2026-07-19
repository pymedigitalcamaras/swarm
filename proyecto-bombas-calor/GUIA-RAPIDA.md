# 🚀 GUÍA RÁPIDA DE EJECUCIÓN

> **No pienses. Solo copia, pega y ejecuta.**

---

## 1️⃣ DESCARGAR Y DESCOMPRIMIR

```bash
# Si te llegó un ZIP:
unzip bombas-calor-latam.zip
cd bombas-calor-latam

# O si clonaste:
git clone <url-repositorio>
cd bombas-calor-latam
```

---

## 2️⃣ INSTALAR AUTOMÁTICAMENTE

```bash
chmod +x setup.sh
./setup.sh
```

**O manualmente:**
```bash
npm install
cp .env.example .env.local
```

---

## 3️⃣ CONFIGURAR SUPABASE

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto nuevo
2. Copia la **URL** y las **API keys** (Settings → API)
3. Edita `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU-ANON-KEY
SUPABASE_SERVICE_ROLE_KEY=TU-SERVICE-ROLE-KEY
```

4. Ve al **SQL Editor** de Supabase
5. Abre el archivo `supabase/migrations/001_initial_schema.sql`
6. **Copia todo y pégalo** en el editor
7. Click **Run**

✅ Listo. Tu base de datos está viva.

---

## 4️⃣ INICIAR EL SERVIDOR

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 5️⃣ SUBIR A GITHUB

```bash
# 1. Inicializar
git init

# 2. Agregar todo
git add .

# 3. Commit inicial
git commit -m "🚀 Initial commit: B2B SaaS Bombas de Calor LATAM"

# 4. Crear repo en GitHub (vacío, sin README)
#    https://github.com/new

# 5. Conectar y subir
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git branch -M main
git push -u origin main
```

---

## 6️⃣ DESPLEGAR EN VERCEL

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
vercel

# Producción
vercel --prod
```

**O via web:**
1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repo de GitHub
3. Agrega las variables de entorno (las de `.env.local`)
4. Deploy automático en cada push a `main`

---

## 📁 ESTRUCTURA DEL PROYECTO

```
bombas-calor-latam/
├── src/                 # Código fuente Next.js
│   ├── app/             # Rutas y páginas
│   ├── components/      # Componentes React
│   └── lib/             # Utilidades, Supabase, etc.
├── supabase/
│   └── migrations/        # SQL para la base de datos
├── public/              # Imágenes y archivos estáticos
├── setup.sh             # Script de instalación
├── .env.example         # Variables de entorno ejemplo
└── package.json         # Dependencias
```

---

## 🛠️ COMANDOS ÚTILES

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Inicia servidor local |
| `npm run build` | Compila para producción |
| `npm run lint` | Revisa errores de código |
| `vercel` | Despliega preview |
| `vercel --prod` | Despliega producción |

---

## ⚠️ SI ALGO FALLA

**Error de SQL:** Asegúrate de copiar TODO el archivo `001_initial_schema.sql`. No omitas la primera línea.

**Error de dependencias:** Borra `node_modules` y `package-lock.json`, luego `npm install`.

**Error de env:** Verifica que `.env.local` existe y tiene las 3 variables de Supabase.

---

## 📞 Soporte

WhatsApp: **+56 9 9011 7784**

---

*Generado por el equipo completo. Listo para escalar.*
