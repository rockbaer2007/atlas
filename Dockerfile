# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY packages ./packages
COPY examples ./examples
COPY scripts ./scripts

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    ATLAS_HOST=0.0.0.0 \
    ATLAS_APP_HOST=0.0.0.0 \
    ATLAS_APP_PORT=4176 \
    ATLAS_ADMIN_PORT=4175 \
    ATLAS_DEMO_PORT=4174

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/examples ./examples
COPY --from=builder /app/packages ./packages

EXPOSE 4176 4175 4174

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "const port = process.env.ATLAS_APP_PORT || '4176'; fetch(`http://127.0.0.1:${port}/health`).then(response => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "scripts/atlas-app-server.mjs"]
