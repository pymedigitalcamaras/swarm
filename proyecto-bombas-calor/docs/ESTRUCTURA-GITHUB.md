# 📁 ESTRUCTURA GITHUB

## Repositorio

```
bombas-calor-latam/
├── .github/
│   ├── workflows/
│   │   └── ci.yml              # CI/CD con GitHub Actions
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
│
├── docs/                        # Documentación
│   ├── SITEMAP.md
│   ├── WIREFRAMES.md
│   ├── COPYWRITING.md
│   ├── ARQUITECTURA.md
│   ├── DATABASE.md
│   ├── FLUJO-USUARIO.md
│   ├── INTEGRACIONES.md
│   ├── SISTEMA-IMAGENES.md
│   ├── PANEL-ADMIN.md
│   └── ESPECIFICACION-TECNICA.md
│
├── src/                         # Código fuente
│   ├── app/                     # Next.js App Router
│   ├── components/              # Componentes React
│   ├── lib/                     # Utilidades y hooks
│   ├── types/                   # TypeScript types
│   └── styles/                  # Estilos globales (si aplica)
│
├── public/                      # Assets estáticos
│   ├── images/
│   └── docs/
│
├── tests/                       # Tests (si aplica)
│   ├── e2e/
│   └── unit/
│
├── supabase/                    # Migrations y seeds
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seeds/
│       └── 001_seed_data.sql
│
├── .env.local.example
├── .env.production.example
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## GitHub Actions (CI/CD)

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

## .gitignore

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js
.next/
out/

# Production
build/

# Environment
.env.local
.env.production

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
.DS_Store
*.pem
.vscode/
.idea/

# Supabase
supabase/.temp/
```

*Estructura GitHub v1.0*
