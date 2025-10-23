# Al-Fursan Al-Rubaiah for Management and Investment - Traditional Jordanian Products

## Overview

Al-Fursan Al-Rubaiah for Management and Investment is a comprehensive web application built on Replit for a Jordanian food manufacturing company specializing in traditional products. The application serves as both a corporate website and product showcase, featuring the company's two main product lines: "Jameedna Zaman" and "Jameed Al Badawia". Built with modern web technologies and optimized for Replit's deployment platform, the site emphasizes Arabic-first design with RTL support, elegant visual presentation, and comprehensive business information including certifications, production capabilities, and contact management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application is built using React 18 with TypeScript, following a component-based architecture pattern. The routing system uses React Router for client-side navigation with dedicated pages for products, company information, blog content, and contact forms. The design system implements shadcn/ui components with extensive customization for Arabic typography and RTL layout support.

### Design System and Styling
Tailwind CSS provides the styling foundation with a comprehensive design system featuring brand-specific color schemes for each product line. The application includes custom CSS variables for consistent theming, specialized Arabic font support (Tajawal and Cairo), and glass morphism effects for modern visual appeal. The responsive design adapts across all device sizes with container-based layouts.

### State Management and Data Flow
The application uses React's built-in state management with hooks, complemented by TanStack React Query for any future API integration needs. Form handling is implemented with React Hook Form and validation through resolvers. Toast notifications provide user feedback across the application.

### Component Organization
Components are organized in a hierarchical structure with reusable UI components in the `components/ui` directory, feature-specific components grouped by functionality, and page-level components handling routing and layout composition. The architecture supports code reusability and maintainability through consistent patterns.

### Internationalization and Accessibility
The application is primarily Arabic with English support, implementing proper RTL text direction, Arabic-optimized typography, and semantic HTML structure. The design accommodates both languages with appropriate font loading and text rendering.

### Performance Optimizations
The application includes image optimization strategies, lazy loading implementation, component-level code splitting potential, and efficient bundle management through Vite's build system. Custom hooks handle complex functionality like count-up animations and mobile detection.

## External Dependencies

### Core Framework Dependencies
- **React 18.3.1**: Primary frontend framework with hooks and modern features
- **TypeScript**: Type safety and enhanced development experience
- **React Router**: Client-side routing and navigation management
- **Vite**: Build tool and development server with fast HMR

### UI and Styling Libraries
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Lucide React**: Icon library with consistent visual design
- **Class Variance Authority**: Component variant management
- **Clsx**: Utility for conditional CSS class construction

### Form and Validation
- **React Hook Form**: Efficient form handling with minimal re-renders
- **Hookform Resolvers**: Validation integration for form schemas

### Advanced Features
- **Hugging Face Transformers**: AI-powered image processing capabilities
- **Embla Carousel**: Touch-friendly carousel component
- **TanStack React Query**: Server state management and caching
- **Date-fns**: Date manipulation and formatting utilities

### Development and Build Tools
- **ESLint**: Code linting with TypeScript and React configurations
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **Vite**: Modern build tool with fast HMR for Replit development
- **Replit Deployments**: Automated deployment and hosting on Replit platform

### Design and Animation
- **Next Themes**: Theme management system
- **CMDK**: Command menu functionality
- **Input OTP**: One-time password input components

## Recent Changes

### October 2025 - Medjoul Dates Product Addition
- **New Product Launch**: Added Medjoul Dates (التمر المجدول) as the third product line in the company's portfolio
- **Full Integration**: Product integrated across all pages including ProductShowcase, Products page, Footer, ContactRFQ, and RequestQuote forms
- **Bilingual Content**: Complete Arabic and English translations added to LanguageContext for product name, description, ingredients, and features
- **Product Details**: Includes premium packaging options (5kg and 1kg sizes), quality certifications (ISO, HACCP, Halal), and "King of Dates" positioning
- **Consistent Styling**: Product card styling matches existing products with amber gradient theme, certificate badges, and size specifications
- **Image Asset**: Product image path set to `/medjoul-dates-package.png` (requires image upload to public folder)
- **Forms Updated**: Product now available for quote requests and RFQ submissions alongside existing Jameed products

### October 2025 - Complete Rebranding Update
- **Company Name Update**: Updated all references from "Al Fursan Quadruple" to "Al-Fursan Al-Rubaiah for Management and Investment" throughout the codebase
- **Product Naming**: Updated "Jameed Badawya" to "Jameed Al Badawia" across all components, pages, and translation files
- **Tagline Update**: Changed "Knights of Quality" to "Al-Fursan Quality" (Arabic: "جودة الفرسان")
- **About Page Content**: Completely refreshed company story, vision, mission, and quality assurance sections with professional copy in both Arabic and English
- **Logo Enhancement**: Updated to original logo with proper blue/gray colors, increased size for better visibility across all pages
- **Hero Section Design**: Removed color overlay from video background for clearer viewing, changed header text to blue matching logo colors
- **Translation Files**: Updated LanguageContext.tsx with consistent bilingual naming conventions throughout the application
- **SEO Updates**: Updated meta titles, descriptions, and structured data across all pages to reflect new company name
- **Component Updates**: Modified Header, Footer, ContactRFQ, ProductShowcase, AboutUs, and all page components for brand consistency

### December 2024 - Migration to Replit
- **Complete Platform Migration**: Successfully migrated from external platform to native Replit development environment
- **Asset Optimization**: Reorganized all images to `/assets/images/` with descriptive names for better maintainability
- **Configuration Updates**: Optimized Vite configuration for Replit's hosting environment (port 5000, proper host binding)
- **Dependency Cleanup**: Removed external platform dependencies and streamlined for Replit-native development
- **Deployment Ready**: Configured for seamless deployment using Replit's built-in deployment system

## Replit-Specific Architecture

### Development Environment
- **Replit Workspace**: Fully configured for in-browser development with auto-save and collaboration features
- **Port Configuration**: Application runs on port 5000 with proper host binding for Replit's environment
- **Asset Management**: Organized static assets in `/public/assets/` for optimal performance
- **Environment Variables**: Ready for Replit Secrets integration for any future API requirements

### Deployment Strategy
- **Replit Deployments**: Configured for one-click deployment with automatic SSL and custom domain support
- **Build Optimization**: Vite build process optimized for Replit's edge deployment network
- **Performance**: Lightweight bundle with efficient asset loading for fast global delivery

The architecture prioritizes performance, maintainability, and user experience while being fully optimized for Replit's development and deployment ecosystem, supporting the specific needs of a bilingual, culturally-sensitive business website for traditional food manufacturing.