# Build a glibc Linux runtime outside the target VM/LXC. Alpine runtime packages
# cannot be installed on Debian/Ubuntu because their native modules use musl.
FROM node:22-bookworm AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ systemd \
    && rm -rf /var/lib/apt/lists/*
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY packages ./packages
COPY atlas-plugins ./atlas-plugins
COPY examples ./examples
COPY scripts ./scripts
COPY packaging/home-assistant-app/atlas/config.yaml ./packaging/home-assistant-app/atlas/config.yaml
RUN pnpm install --frozen-lockfile && pnpm build && pnpm test:linux && pnpm linux:prepare
RUN node --input-type=module -e 'import {writeFileSync} from "node:fs"; import {createUnit} from "./scripts/atlas-linux-installer.mjs"; writeFileSync("/tmp/atlas.service",createUnit({app:"/opt/atlas",state:"/var/lib/atlas",environment:"/etc/atlas/atlas.env",node:"/usr/local/bin/node"}));' \
    && systemd-analyze verify /tmp/atlas.service
RUN mkdir -p /export/node && cp /usr/local/bin/node /export/node/node \
    && tar -C output -czf /export/atlas-linux-runtime.tar.gz linux-runtime \
    && cp /usr/local/LICENSE /export/node/LICENSE \
    && cp output/linux-runtime/atlas-linux-runtime.json /export/atlas-linux-runtime.json \
    && cd /export && sha256sum atlas-linux-runtime.tar.gz node/node > SHA256SUMS

FROM scratch AS export
COPY --from=builder /export/ /
