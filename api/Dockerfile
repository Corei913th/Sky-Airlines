# =========================================================
# Base image with Node.js 22 and corepack pnpm 11
# =========================================================
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@11.5.2 --activate
WORKDIR /app

# =========================================================
# Install dependencies & generate Prisma Client
# =========================================================
FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma/
RUN pnpm install --frozen-lockfile && pnpm exec prisma generate

# =========================================================
# Build application and prune dev dependencies
# =========================================================
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm build && pnpm prune --prod

# =========================================================
# Minimal production runtime image
# =========================================================
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Security: Create non-root system group and user
RUN addgroup -S nodejs && adduser -S nestjs -G nodejs

# Copy built dist, production node_modules, and prisma schema
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma

USER nestjs

ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/health || exit 1

CMD ["node", "dist/main.js"]
