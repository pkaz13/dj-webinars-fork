FROM node:23.11.1-bullseye AS base
RUN npm install -g npm && npm install --g pnpm

WORKDIR /usr/src/app

ARG ENV
ARG DATABASE_URL
ARG PORT
ARG JWT_SECRET
ARG PUBLIC_URL

ENV ENV=$ENV
ENV DATABASE_URL=$DATABASE_URL
ENV PORT=$PORT
ENV JWT_SECRET=$JWT_SECRET
ENV PUBLIC_URL=$PUBLIC_URL

COPY --chown=node:node pnpm-lock.yaml ./
RUN pnpm fetch --prod

COPY --chown=node:node . .
RUN pnpm install
RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node prepare-db.sh ./prepare-db.sh
RUN chmod +x ./prepare-db.sh

RUN [ "./prepare-db.sh" ]

FROM node:23.11.0-bullseye AS builder
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/prisma ./prisma
COPY . .

RUN pnpm build

ENV NODE_ENV=production
RUN pnpm install --offline

FROM node:23.11.0-alpine3.21 AS runner

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

USER node

EXPOSE 5000

CMD [ "node", "dist/src/main.js" ]
