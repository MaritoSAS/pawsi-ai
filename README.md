<div align="center">
  <img src="public/logo-pawsi.png" alt="Pawsi AI" width="240" />
  <br/><br/>
  <h1>Pawsi AI</h1>
  <p><strong>Plataforma de Gestión Inteligente de Salud Pública Animal</strong></p>
  <p><em>ONG Fucolla · Salta, Argentina · Puna Tech 2026</em></p>
  <br/>
  <p>
    <img src="https://img.shields.io/badge/Track-Arkiv-2563eb?style=flat-square" alt="Arkiv Track" />
    <img src="https://img.shields.io/badge/Ideathon-Stellar-8B4513?style=flat-square" alt="Stellar Ideathon" />
    <img src="https://img.shields.io/badge/ODS-3-4C9F38?style=flat-square" alt="ODS 3" />
    <img src="https://img.shields.io/badge/ODS-11-F99D1C?style=flat-square" alt="ODS 11" />
    <img src="https://img.shields.io/badge/ODS-17-1F436A?style=flat-square" alt="ODS 17" />
  </p>
</div>

---

## Transacciones de Prueba (Stellar Testnet)

| Donante | Monto | Destino | Hash Ledger | Estado |
|---------|-------|---------|-------------|--------|
| Gómez, María | 150 XLM | Tratamiento Luna - La Caldera | GA5W...3R4Q | ✅ Verificado |
| Fernández, Juan | 300 XLM | Campaña Castración Vaqueros | GC8K...9P1M | ✅ Verificado |
| Fundación Puna | 1200 XLM | Licenciamiento Tecnológico Fucolla | GD2X...7L2N | ✅ Verificado |

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui |
| **IA Predictiva** | Genkit + Google Gemini 2.5 Flash |
| **Datos Verificables** | Arkiv Network (Web3 database) |
| **Transparencia** | Stellar (XLM / USDC) |
| **Despliegue** | Firebase App Hosting / Vercel |

---

## Instalación y Ejecución Local

### Prerrequisitos
- Node.js 18+
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/MaritoSAS/pawsi-ai.git
cd pawsi-ai

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abrir en el navegador: [http://localhost:9002](http://localhost:9002)

### Comandos adicionales

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Turbopack, puerto 9002) |
| `npm run build` | Build de producción |
| `npm run lint` | Linter (Next.js ESLint) |
| `npm run typecheck` | TypeScript type checking |

---

## Equipo

3 integrantes — colaboradores del repositorio.

---

## Estructura del Proyecto

```
pawsi-ai/
├── public/                # Archivos estáticos (logos PNG)
├── docs/                  # Documentación del hackathon
│   ├── pitch-deck-arkiv.md
│   ├── pitch-deck-stellar.md
│   ├── checklist-entrega.md
│   └── blueprint.md
├── src/
│   ├── app/               # App Router (páginas y layouts)
│   │   ├── page.tsx       # Página principal
│   │   ├── layout.tsx     # Layout raíz
│   │   └── globals.css    # Estilos globales
│   ├── ai/                # Flujos de IA (Genkit)
│   │   ├── genkit.ts
│   │   ├── dev.ts
│   │   └── flows/
│   ├── components/        # shadcn/ui components
│   │   └── ui/
│   ├── hooks/             # Custom hooks
│   └── lib/               # Utilidades
├── package.json
└── README.md
```

---

## Herramientas de IA Utilizadas

- **Claude** — Arquitectura, código, pitch
- **ChatGPT** — Ideas de producto
- **Genkit / Gemini 2.5 Flash** — Motor de IA predictiva
- **Cursor / OpenCode Go** — Edición asistida

---

## Enlaces Rápidos

| Recurso | Link |
|---------|------|
| 🌐 Demo en vivo | [pawsi-ai.vercel.app](https://pawsi-ai.vercel.app) |
| 📊 Pitch Deck Arkiv | [docs/pitch-deck-arkiv.md](docs/pitch-deck-arkiv.md) |
| 💡 Pitch Deck Stellar | [docs/pitch-deck-stellar.md](docs/pitch-deck-stellar.md) |
| ✅ Checklist de Entrega | [docs/checklist-entrega.md](docs/checklist-entrega.md) |
| 📝 Formulario Arkiv | [forms.arkiv.network/punatech26](https://forms.arkiv.network/punatech26) |
| 📝 Formulario Stellar | [form.typeform.com/to/eFquz55J](https://form.typeform.com/to/eFquz55J) |

---

<div align="center">
  <sub>Una alianza estratégica entre la <strong>ONG Fucolla</strong>, los <strong>Municipios de Salta</strong> y <strong>Arkiv Network</strong>.</sub>
  <br/>
  <sub>Desarrollado para la <strong>Hackathon Puna Tech</strong> · Salta, Argentina · 28–30 mayo 2026</sub>
</div>
