# One image for everything AwaitIO runs on Kamal (.kamal/deploy.yml): the static site (awaitio.com)
# and the demo (demo.awaitio.com). Every role starts the same image with its own `cmd`.
#
# The demo is built in its own stage; the site needs no build, its static export in apps/site/out is
# committed and only copied, so a site change never rebuilds the demo.

FROM node:22.14-alpine3.20 AS base
RUN corepack enable pnpm
WORKDIR /usr/src/app

# ---------------------------------------------------------------------------------------------
# demo.awaitio.com
FROM base AS demo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY libs ./libs
COPY apps/demo ./apps/demo
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter "@awaitio/demo..."
RUN pnpm --filter "@awaitio/demo..." run build
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm --filter @awaitio/demo deploy --prod /srv/demo

# ---------------------------------------------------------------------------------------------
FROM node:22.14-alpine3.20 AS runtime
ENV NODE_ENV=production
RUN apk add --no-cache nginx
COPY .kamal/nginx.conf /etc/nginx/nginx.conf
COPY apps/site/out /srv/site
COPY --from=demo --chown=node:node /srv/demo /srv/demo
WORKDIR /srv/demo
USER node
EXPOSE 8080
