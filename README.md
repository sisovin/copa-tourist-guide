# Copa Tourist Guide

This repository contains the monorepo for the Copa Tourist Guide project. The purpose of this project is to provide a comprehensive guide for tourists visiting the Copa region, including information on attractions, accommodations, dining, and more.

## Development Checklist

### 🚀 Core Setup
- [ ] Initialize Turborepo/pnpm/npm workspace
- [ ] Configure shared ESLint/Prettier in `packages/config/`
- [ ] Set up TypeScript strict mode in root `tsconfig.json`
- [ ] Add PostgreSQL service to `docker-compose.yml`
- [ ] Create `.env` template with required variables

### 📦 Backend (`apps/server`)
#### Prisma & Database
- [ ] Define Prisma schema (`prisma/schema.prisma`) with:
  - [ ] `User` model (id, email, passwordHash, role, refreshToken)
  - [ ] `Gallery` model (if needed)
  - [ ] Enums (`Role`: USER, ADMIN)
- [ ] Generate Prisma client types in `packages/database/`
- [ ] Define Zod schemas in `packages/schemas/`:
  - [ ] User registration/login validation
  - [ ] API response types

### 🌐 Frontend (`apps/web`)
- [ ] Set up Next.js project
- [ ] Configure Tailwind CSS in `tailwind.config.js`
- [ ] Create basic layout and components
- [ ] Implement authentication pages (register, login, logout) using Next.js and Tailwind CSS
- [ ] Integrate frontend with backend API for user authentication and gallery management

### 🛠️ DevOps
- [ ] Dockerize NestJS server (`apps/server/Dockerfile`)
- [ ] Optimize Next.js build in `next.config.js`
- [ ] Set up CI/CD pipeline (GitHub Actions)

### ✅ Final Checks
- [ ] Test all auth flows (register/login/refresh/logout)
- [ ] Verify role-based access control
- [ ] Validate image optimization in gallery
- [ ] Audit security headers (CSP, CORS)
