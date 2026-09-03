# Sky Airlines - Backend API

[![CI Pipeline](https://github.com/Corei913th/Sky-Airlines/actions/workflows/ci.yml/badge.svg)](https://github.com/Corei913th/Sky-Airlines/actions/workflows/ci.yml)
![Node Version](https://img.shields.io/badge/node-v22-green.svg)
![pnpm Version](https://img.shields.io/badge/pnpm-v11.5.2-blue.svg)
![Prisma](https://img.shields.io/badge/Prisma-v7.9.1-indigo.svg)
![NestJS](https://img.shields.io/badge/NestJS-v11.0.1-red.svg)

Production-ready NestJS backend service for **Sky Airlines** providing flight booking integrations, user sessions, authentication, security hashing, and structured logging.

---

## 🚀 Tech Stack

- **Framework**: [NestJS 11](https://nestjs.com/)
- **Language**: TypeScript 5
- **Database & ORM**: PostgreSQL + [Prisma 7](https://www.prisma.io/) with `@prisma/adapter-pg` driver adapter
- **Integrations**: [Duffel Flights API](https://duffel.com/)
- **Security**: Bcrypt Hashing Service (`SecurityModule`), JWT & User Sessions
- **Logging**: Pino Logger with AsyncLocalStorage correlation context (`LoggerModule`)
- **Configuration & Validation**: Zod + `@nestjs/config` with static `ENV` single source of truth
- **Package Manager**: pnpm v11.5.2

---

## 📁 Repository Structure

```text
Sky-Airlines/
├── .github/
│   ├── actions/
│   │   └── setup-api/         # Composite action for pnpm & Prisma Client setup
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI pipeline (Quality, Test, Build, Security)
├── api/                       # NestJS Application directory
│   ├── prisma/                # Prisma Schema & Database Migrations
│   ├── src/
│   │   ├── config/            # Strongly-typed environment schemas (Zod)
│   │   ├── infrastructure/    # Core infrastructure providers (Prisma, Duffel, Logger, Security)
│   │   └── modules/           # Business domain modules & shared utilities
│   ├── test/                  # E2E & Integration tests
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── tsconfig.json
└── .gitignore
```

---

## 🛠️ Quick Start

### 1. Prerequisites

- **Node.js**: `v22.x`
- **pnpm**: `v11.5.2` (`npm i -g pnpm`)
- **PostgreSQL**: `v15+` running locally or via Docker

### 2. Environment Configuration

Create a `.env` file inside the `api/` directory:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sky_airlines?schema=public"
DUFFEL_ACCESS_TOKEN="duffel_test_your_access_token"
LOG_LEVEL=info
```

### 3. Installation & Database Setup

```bash
# Navigate to the API application folder
cd api

# Install dependencies with strict lockfile
pnpm install

# Apply Prisma database migrations
pnpm exec prisma migrate dev

# Generate Prisma Client
pnpm exec prisma generate
```

---

## ⚙️ Development Commands

All commands should be executed inside the `api/` directory:

| Command | Description |
| :--- | :--- |
| `pnpm start:dev` | Start NestJS in watch mode |
| `pnpm build` | Compile NestJS production bundle |
| `pnpm test` | Run Jest unit & integration test suites |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm lint` | Run ESLint static analysis with auto-fix |
| `pnpm format` | Format code using Prettier |

---

## 🛡️ CI/CD Pipeline (GitHub Actions)

The repository includes a GitHub Actions pipeline configured in `.github/workflows/ci.yml` featuring:

1. **`secret-scan`**: Secret leak detection using Gitleaks.
2. **`quality`**: Code quality validation (`ESLint`, `Prettier`, `tsc --noEmit`).
3. **`test`**: Automated Jest test execution against an ephemeral PostgreSQL 15 service container.
4. **`build`**: Verification of NestJS production build compilation.

### Required GitHub Secrets for CI:
- `TEST_DB_USER`: Username for test PostgreSQL database container.
- `TEST_DB_PASSWORD`: Password for test PostgreSQL database container.
- `DUFFEL_TEST_TOKEN`: API token for Duffel API testing.

---

## 📄 License

This project is proprietary and confidential.
