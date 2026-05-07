# ProdigyAI — AI-Powered Workplace Productivity Assistant

![ProdigyAI](https://img.shields.io/badge/ProdigyAI-Workplace%20Assistant-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TanStack](https://img.shields.io/badge/TanStack-Start-FF4154?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> A modern, AI-powered productivity assistant designed for professionals, remote teams, managers, and business users who want to automate repetitive workplace tasks and boost efficiency.

---

## ✨ Features

| Module | Description |
|---|---|
| **📊 Dashboard** | Productivity overview with usage stats, quick actions, and AI-powered insights |
| **📧 Email Generator** | Compose professional emails with tone/audience selection and smart templates |
| **📝 Meeting Summarizer** | Generate structured summaries with executive overview, key points, decisions & action items |
| **✅ Task Planner** | Kanban-style board with priority labeling, AI suggestions, and productivity scoring |
| **🔍 Research Assistant** | Tabbed research interface with summaries, insights, recommendations & source tracking |
| **💬 AI Chat** | Conversational AI assistant with conversation history and contextual responses |
| **⚙️ Settings** | Comprehensive configuration including Responsible AI ethics, privacy & limitations |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [Bun](https://bun.sh/) (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/prodigy-ai.git
cd prodigy-ai

# Install dependencies
bun install

# Start the development server
bun run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
bun run build
```

## 🛠 Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19, SSR)
- **Build Tool:** [Vite 7](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with semantic design tokens
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** Edge-ready (Cloudflare Workers compatible)

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/           # shadcn/ui primitives
│   ├── AppSidebar.tsx
│   └── ThemeToggle.tsx
├── routes/           # File-based routing (TanStack Router)
│   ├── index.tsx     # Dashboard
│   ├── email.tsx     # Email Generator
│   ├── meetings.tsx  # Meeting Summarizer
│   ├── tasks.tsx     # Task Planner
│   ├── research.tsx  # Research Assistant
│   ├── chat.tsx      # AI Chat
│   └── settings.tsx  # Settings & Responsible AI
├── hooks/            # Custom React hooks
├── lib/              # Utilities
└── styles.css        # Design tokens & global styles
```

## 🎨 Design System

ProdigyAI uses a custom design token system built on `oklch` color space with full dark/light mode support, glassmorphism effects, and a professional indigo/blue/cyan palette.

## 🤖 Responsible AI

ProdigyAI is built with ethical AI principles:

- **Transparency** — Clear indication when content is AI-generated
- **Privacy** — No user data is stored or shared without consent
- **Fairness** — Bias-aware prompt engineering
- **Human oversight** — AI assists, humans decide

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using <a href="https://lovable.dev">Lovable</a></p>
