# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable
RUN apk add --no-cache python3 make g++

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY packages ./packages
COPY atlas-plugins ./atlas-plugins
COPY examples ./examples
COPY scripts ./scripts

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM node:22-alpine AS runtime

ARG TARGETARCH
ARG OH_MY_POSH_VERSION=31.3.0

WORKDIR /app

ENV NODE_ENV=production \
    ATLAS_HOST=0.0.0.0 \
    ATLAS_APP_HOST=0.0.0.0 \
    ATLAS_APP_PORT=4176 \
    ATLAS_ADMIN_PORT=4175 \
    ATLAS_DEMO_PORT=4174 \
    ATLAS_DISTRIBUTION_TARGET=standalone-docker-preview

RUN apk add --no-cache openssh-client curl bash \
  && case "${TARGETARCH:-amd64}" in amd64) OMP_ARCH=amd64 ;; arm64) OMP_ARCH=arm64 ;; arm) OMP_ARCH=arm ;; *) echo "Unsupported Oh My Posh architecture: ${TARGETARCH}" >&2; exit 1 ;; esac \
  && curl --fail --location --silent --show-error \
    "https://github.com/JanDeDobbeleer/oh-my-posh/releases/download/v${OH_MY_POSH_VERSION}/checksums.txt" \
    --output /tmp/oh-my-posh-checksums.txt \
  && curl --fail --location --silent --show-error \
    "https://github.com/JanDeDobbeleer/oh-my-posh/releases/download/v${OH_MY_POSH_VERSION}/posh-linux-${OMP_ARCH}" \
    --output /usr/local/bin/oh-my-posh \
  && chmod 0755 /usr/local/bin/oh-my-posh \
  && OMP_SHA="$(awk -v file="posh-linux-${OMP_ARCH}" '$2 == file { print $1 }' /tmp/oh-my-posh-checksums.txt)" \
  && test -n "${OMP_SHA}" \
  && printf '%s  %s\n' "${OMP_SHA}" /usr/local/bin/oh-my-posh | sha256sum -c - \
  && rm /tmp/oh-my-posh-checksums.txt \
  && apk del curl

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/examples ./examples
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/atlas-plugins ./atlas-plugins
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4176 4175 4174

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["node", "-e", "const port = process.env.ATLAS_APP_PORT || '4176'; fetch('http://127.0.0.1:' + port + '/health').then(response => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "scripts/atlas-app-server.mjs"]
