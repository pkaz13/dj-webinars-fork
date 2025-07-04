FROM node:22.15.1-alpine3.21@sha256:152270cd4bd094d216a84cbc3c5eb1791afb05af00b811e2f0f04bdc6c473602 AS development
WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN npm i -g npm && \
    npm i -g pnpm && \
    pnpm install --frozen-lockfile --prefer-offline

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .
RUN pnpm build

CMD ["pnpm", "dev"]


FROM nginx:1.28.0-alpine3.21-slim@sha256:39a9a15e0a81914a96fa9ffa980cdfe08e2e5e73ae3424f341ad1f470147c413 AS production

RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser && \
    mkdir -p /var/cache/nginx/client_temp && \
    chown -R appuser:appgroup /var/cache/nginx /var/run /var/log/nginx

RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

COPY --from=development --chown=appuser:appgroup /app/dist /usr/share/nginx/html

RUN mkdir -p /run && chown appuser:appgroup /run
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

ENTRYPOINT ["/bin/sh", "-c", "envsubst '${VITE_API_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
