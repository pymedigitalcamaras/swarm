# 🚀 COMANDOS PARA WINDOWS - Ruta Personalizada

> Ruta local: `C:\Users\HP\Desktop\SW-NAE-CLAW`
> Repo GitHub: `https://github.com/pymedigitalcamaras/swarm.git`

---

## 1️⃣ DESCOMPRIMIR EL PROYECTO

Copia el archivo `bombas-calor-latam.zip` a tu escritorio y descomprímelo dentro de `SW-NAE-CLAW`.

O por consola (PowerShell como Admin):

```powershell
# Crear carpeta si no existe
mkdir -Force "C:\Users\HP\Desktop\SW-NAE-CLAW"

# Descomprimir (si tienes 7zip instalado)
# 7z x "C:\Users\HP\Desktop\bombas-calor-latam.zip" -o"C:\Users\HP\Desktop\SW-NAE-CLAW"
```

**O simplemente:** Click derecho en el ZIP → Extraer en `SW-NAE-CLAW`.

---

## 2️⃣ ABRIR CONSOLA Y NAVEGAR

```powershell
cd "C:\Users\HP\Desktop\SW-NAE-CLAW\proyecto-bombas-calor"
```

Verifica que estás en la carpeta correcta:
```powershell
dir
```
Deberías ver: `src/`, `docs/`, `supabase/`, `package.json`, etc.

---

## 3️⃣ INSTALAR DEPENDENCIAS

```powershell
npm install
```

Si te da error de permisos, abre PowerShell como **Administrador**.

---

## 4️⃣ CONFIGURAR VARIABLES DE ENTORNO

```powershell
# Copiar archivo de ejemplo
copy .env.example .env.local

# Abrir en Notepad para editar
notepad .env.local
```

Edita con tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU-ANON-KEY
SUPABASE_SERVICE_ROLE_KEY=TU-SERVICE-ROLE-KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your-resend-api-key
```

**Guardar y cerrar.**

---

## 5️⃣ EJECUTAR SQL EN SUPABASE

1. Ve a [supabase.com](https://supabase.com) → tu proyecto → **SQL Editor**
2. Abre el archivo: `C:\Users\HP\Desktop\SW-NAE-CLAW\proyecto-bombas-calor\supabase\migrations\001_initial_schema.sql`
3. **Copia TODO el contenido** y pégalo en el editor
4. Click **RUN**

✅ Base de datos lista.

---

## 6️⃣ INICIAR SERVIDOR LOCAL

```powershell
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

Para detener: `Ctrl + C`

---

## 7️⃣ SUBIR A GITHUB (Repo: pymedigitalcamaras/swarm)

### Primera vez:

```powershell
# 1. Inicializar git
git init

# 2. Agregar todo
git add .

# 3. Commit inicial
git commit -m "🚀 Initial commit: B2B SaaS Bombas de Calor LATAM"

# 4. Conectar a tu repo (asegúrate de que exista en GitHub)
git remote add origin https://github.com/pymedigitalcamaras/swarm.git

# 5. Subir a main
git branch -M main
git push -u origin main
```

Si te pide login, usa tu usuario y token de GitHub (no tu contraseña).

### Para actualizar después (cada vez que cambies algo):

```powershell
git add .
git commit -m "Descripcion de los cambios"
git push origin main
```

---

## 8️⃣ DESPLEGAR EN VERCEL

```powershell
# Instalar CLI (una sola vez)
npm install -g vercel

# Login
vercel login

# Desplegar preview
vercel

# Desplegar producción
vercel --prod
```

**O via web:**
1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repo `pymedigitalcamaras/swarm`
3. Agrega las variables de entorno (las de `.env.local`)
4. Deploy automático en cada push a `main`

---

## 📂 RESUMEN DE RUTAS

| Qué | Dónde está |
|-----|-----------|
| Código fuente | `C:\Users\HP\Desktop\SW-NAE-CLAW\proyecto-bombas-calor\src\` |
| SQL para Supabase | `C:\Users\HP\Desktop\SW-NAE-CLAW\proyecto-bombas-calor\supabase\migrations\001_initial_schema.sql` |
| Variables de entorno | `C:\Users\HP\Desktop\SW-NAE-CLAW\proyecto-bombas-calor\.env.local` |
| Comandos para ejecutar | `C:\Users\HP\Desktop\SW-NAE-CLAW\proyecto-bombas-calor\package.json` |

---

## ⚠️ SI ALGO FALLA

**Error "npm no se reconoce":** Instala Node.js desde [nodejs.org](https://nodejs.org) (versión 20+).

**Error de git:** Instala Git desde [git-scm.com](https://git-scm.com).

**Error de SQL en Supabase:** Asegúrate de copiar **TODO** el archivo `001_initial_schema.sql`, no omitas la primera línea.

**Error al hacer push a GitHub:** Si el repo ya tiene contenido, primero haz:
```powershell
git pull origin main --allow-unrelated-histories
```
Luego vuelve a hacer push.

---

## 🔄 FLUJO DE TRABAJO DIARIO

```powershell
cd "C:\Users\HP\Desktop\SW-NAE-CLAW\proyecto-bombas-calor"

# Ver estado
git status

# Hacer cambios en el código...

# Guardar en git
git add .
git commit -m "Lo que hice hoy"
git push origin main

# Ver en localhost
npm run dev
```

---

## 📞 WhatsApp de Contacto

**+56 9 9011 7784**

---

*Cuando avances me das las credenciales de Supabase y sigo entregando código.*
