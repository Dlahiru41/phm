# NCVMS - National Child Vaccination Management System

TypeScript-based Single Page Application (SPA) for the National Child Vaccination Management System.

## Project Structure

```
stitch/
├── index.html                          # Main SPA entry point
├── package.json                        # NPM dependencies and scripts
├── tsconfig.json                       # TypeScript configuration
├── vite.config.ts                      # Vite build configuration
├── README.md                           # Project documentation
├── src/
│   ├── main.ts                         # Application entry point
│   ├── router/
│   │   ├── Router.ts                   # Router class implementation
│   │   └── routes.ts                   # Route definitions
│   ├── pages/
│   │   ├── PageLoader.ts               # Page content loader utility
│   │   ├── home.html                   # Home page content
│   │   ├── login-content.html          # Login page content
│   │   ├── parent-dashboard-desktop.html
│   │   ├── parent-dashboard-mobile.html
│   │   ├── phm-dashboard.html
│   │   ├── child-profile-schedule.html
│   │   ├── growth-chart.html
│   │   └── moh-analytics-dashboard.html
│   ├── css/
│   │   └── common.css                  # Shared/common styles
│   └── js/
│       └── tailwind-config.js          # Shared Tailwind configuration
└── resources/
    └── images/                         # Image assets
```

## Features

- **TypeScript**: Full TypeScript support with type safety
- **SPA Routing**: Client-side routing with browser history support
- **Component-based**: Modular page structure
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast development server and build tool

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Routes

- `/` - Home page with navigation
- `/login` - Login & Authentication page
- `/parent-dashboard-desktop` - Parent Dashboard (Desktop view)
- `/parent-dashboard-mobile` - Parent Dashboard (Mobile view)
- `/phm-dashboard` - PHM Dashboard
- `/child-profile-schedule` - Child Profile & Schedule
- `/growth-chart` - Growth Chart View
- `/moh-analytics-dashboard` - MOH Analytics Dashboard

## Development

### Type Checking

```bash
npm run type-check
```

### Project Structure

- **Router**: Handles client-side routing and navigation
- **PageLoader**: Loads page content dynamically
- **Routes**: Defines all application routes
- **Pages**: HTML content for each page (body content only)

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Material Symbols** - Icon library
- **Public Sans** - Google Fonts

## Notes

- All pages are loaded dynamically via the router
- Navigation uses browser history API
- Pages are stored as HTML content files (body content only)
- Shared styles and configuration are in `src/css/` and `src/js/`
- Images are stored in `resources/images/`

## License

© 2026 Ministry of Health. All Rights Reserved.
