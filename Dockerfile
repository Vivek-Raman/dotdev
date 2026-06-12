FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# PUBLIC_* vars are inlined by Astro at build time (see import.meta.env in src/).
# Pass via `docker build --build-arg` locally, or GitHub Actions secrets in CI.
ARG PUBLIC_POSTHOG_KEY=
ARG PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

ENV PUBLIC_POSTHOG_KEY=$PUBLIC_POSTHOG_KEY \
    PUBLIC_POSTHOG_HOST=$PUBLIC_POSTHOG_HOST
RUN npm run build

FROM nginx:1.29.3-alpine3.22 AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
# COPY --from=builder /app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
