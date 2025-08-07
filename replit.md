# Overview

This is a modern full-stack portfolio website built for showcasing professional software development experience. The application presents a personal portfolio with sections for home, about, projects, experience, and contact information. It features a sophisticated dark theme design with smooth animations and interactive elements, demonstrating both frontend and backend development capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React with TypeScript, leveraging modern development practices and libraries:

- **Framework**: React 18 with TypeScript for type safety and better development experience
- **Routing**: Wouter for lightweight client-side routing without the overhead of React Router
- **Styling**: Tailwind CSS with custom CSS variables for theming, implementing a consistent dark theme design system
- **UI Components**: Extensive use of Radix UI primitives through shadcn/ui components for accessible, customizable interface elements
- **Animations**: Framer Motion for smooth page transitions and scroll-triggered animations
- **State Management**: TanStack Query (React Query) for server state management and API data fetching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
The backend follows a traditional Express.js server architecture:

- **Server Framework**: Express.js with TypeScript for API endpoints and static file serving
- **API Design**: RESTful API structure with dedicated routes for contact form submission and file downloads
- **Development Setup**: Vite integration for hot module replacement and development tooling
- **Error Handling**: Centralized error middleware with proper HTTP status codes and JSON responses
- **Logging**: Custom request logging middleware for API endpoint monitoring

## Database Integration
The application is configured for PostgreSQL integration using modern ORM patterns:

- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Database**: PostgreSQL configured through Neon Database serverless driver
- **Migrations**: Drizzle Kit for database schema migrations and management
- **Schema Definition**: Centralized schema definitions in TypeScript with Zod validation

## Development and Build System
The project uses a modern build and development workflow:

- **Build Tool**: Vite for fast development builds and optimized production bundles
- **Bundling**: ESBuild for server-side code bundling with ES modules support
- **TypeScript**: Strict TypeScript configuration with path mapping for clean imports
- **Code Quality**: Integrated development tools with runtime error overlays and debugging support

## Deployment Architecture
The application is designed for modern deployment platforms:

- **Static Assets**: Client-side build outputs to dist/public for CDN serving
- **Server Bundle**: Node.js compatible server bundle with external package handling
- **Environment Configuration**: Environment variable driven configuration for database connections and API keys
- **Container Ready**: Docker integration supported through modern tooling

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **PostgreSQL**: Primary database system using connection strings for configuration

## UI and Component Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives for building design system components
- **Shadcn/UI**: Pre-built component library based on Radix UI with Tailwind CSS styling
- **Lucide React**: Modern icon library providing consistent iconography

## Development and Build Tools
- **Vite**: Build tool and development server with React plugin support
- **Tailwind CSS**: Utility-first CSS framework with custom design system implementation
- **TypeScript**: Static type checking and enhanced development experience
- **ESBuild**: Fast JavaScript bundler for production builds

## Form and Data Management
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation for both client and server-side data validation
- **TanStack Query**: Server state management with caching and synchronization

## Animation and Interaction
- **Framer Motion**: Production-ready motion library for React animations
- **Embla Carousel**: Lightweight carousel library for image and content sliders

## Email and Communication
- **Contact Form Integration**: Built-in contact form with email submission capabilities (configured for future email service integration)

## File Management
- **Resume Download**: Static file serving for downloadable documents and assets
- **Asset Management**: Organized asset structure for images, documents, and media files