# Smart Restaurant Ecosystem - Frontend

Enterprise-grade React + Vite application for Smart Restaurant Management System.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **Axios** - HTTP client (to be installed)

## Project Structure

```
frontend/
├── src/
│   ├── assets/          # Static assets (images, icons, fonts)
│   ├── components/      # Reusable React components
│   │   ├── common/      # Shared/common components
│   │   ├── layout/      # Layout components (Sidebar, Header)
│   │   └── ui/          # UI component library (Button, Card, Input, etc.)
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Page layout wrappers
│   ├── pages/           # Page components (auth, dashboard, pos, etc.)
│   ├── services/        # API services and HTTP client
│   ├── styles/          # Global styles and design system
│   │   ├── base/        # Base styles (reset, typography)
│   │   ├── components/  # Component-specific styles
│   │   ├── themes/      # CSS variables and theme definitions
│   │   └── utilities/   # Utility classes
│   ├── types/           # TypeScript/JavaScript type definitions
│   ├── utils/           # Utility functions
│   ├── constants/       # Application constants
│   ├── App.jsx          # Root component with routes
│   └── main.jsx         # Application entry point
├── public/              # Public static files
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── .env.example         # Environment variables template
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Design System

The application uses a comprehensive design system with:

- **CSS Variables** - Centralized design tokens for colors, spacing, typography
- **Utility Classes** - Reusable utility classes for common patterns
- **Component Library** - Pre-built UI components (Button, Card, Input, Modal, Table, etc.)

## Architecture

This project follows enterprise-grade architecture suitable for:

- Multi-role access control
- POS (Point of Sale) system
- Inventory management
- Analytics dashboard
- AI-powered features
- Authentication & authorization

## Path Aliases

The project uses path aliases for cleaner imports:

- `@` → `./src`
- `@components` → `./src/components`
- `@layouts` → `./src/layouts`
- `@pages` → `./src/pages`
- `@hooks` → `./src/hooks`
- `@utils` → `./src/utils`
- `@services` → `./src/services`
- `@contexts` → `./src/contexts`
- `@types` → `./src/types`
- `@constants` → `./src/constants`
- `@assets` → `./src/assets`
- `@styles` → `./src/styles`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

- Backend integration with Node.js
- MongoDB database connection
- JWT authentication
- Role-based access control
- Real-time features with WebSocket
- Analytics dashboard
- AI-powered recommendations
