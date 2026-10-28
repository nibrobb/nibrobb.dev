# syntax=docker/dockerfile:1

ARG NODE_VERSION=24
ARG PNPM_VERSION=12.15.0

FROM node:${NODE_VERSION}-alpine AS base
ARG PNPM_VERSION
RUN npm install -g pnpm@${PNPM_VERSION}
WORKDIR /app

FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile
COPY . .
# Public variables are static and get inlined into the client bundle at build time
ARG PUBLIC_BASE_DOMAIN=""
ARG PUBLIC_GTAG_ID=""
ARG PUBLIC_SLACK_REDIRECT_URI=""
ENV ADAPTER=node \
    PUBLIC_BASE_DOMAIN=${PUBLIC_BASE_DOMAIN} \
    PUBLIC_GTAG_ID=${PUBLIC_GTAG_ID} \
    PUBLIC_SLACK_REDIRECT_URI=${PUBLIC_SLACK_REDIRECT_URI}
# Private variables are read at runtime; blank placeholders satisfy route analysis
RUN GITHUB_TOKEN="" SLACK_CLIENT_ID="" SLACK_CLIENT_SECRET="" pnpm run build

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prod --ignore-scripts

FROM node:${NODE_VERSION}-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/build ./build
COPY --chown=node:node package.json ./
USER node
EXPOSE 3000
CMD ["node", "build"]
