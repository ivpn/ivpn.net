FROM node:22.12-slim AS builder

ARG ENV=production
ARG BASE_URL=http://localhost:8010
ARG API_URL=https://api.ivpn.net
ARG PAYPAL_CLIENT_ID=Ae94bviH2d45LcrM1nnnUcIDuJNb2NZgR_-3GKoJS1krkkNiInSl9V-SHMLvpPd1V8P9-yDRNoWBWK44

WORKDIR /opt/build

# Install Hugo and cleanup
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates \
    && curl -L https://github.com/gohugoio/hugo/releases/download/v0.154.0/hugo_0.154.0_linux-amd64.deb -o /tmp/hugo.deb \
    && dpkg -i /tmp/hugo.deb \
    && rm /tmp/hugo.deb \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies (cached layer for faster rebuilds)
COPY ./src/themes/ivpn-v3/package.json ./src/themes/ivpn-v3/package-lock.json ./src/themes/ivpn-v3/
RUN cd ./src/themes/ivpn-v3/ && npm install

# Copy source and build assets
COPY ./src ./src
RUN echo "VITE_APP_WEBAPI_URL=${BASE_URL}\nVITE_APP_API_URL=${API_URL}\nVITE_APP_PAYPAL_CLIENT_ID=${PAYPAL_CLIENT_ID}\n" > ./src/themes/ivpn-v3/.env.${ENV} \
    && echo "Environment: $ENV\nBase URL: ${BASE_URL}\nAPI URL: ${API_URL}\nPayPal Client ID: ${PAYPAL_CLIENT_ID}\n" \
    && cd ./src/themes/ivpn-v3/ && npm run $ENV

# Generate mobile app pages
RUN sed -E \
        -e 's/^layout:(.*)$/layout: mobile-app/' \
        -e 's/^url:(.*)$/url: \/en\/privacy-mobile-app\//' \
        -e 's/^canonical:(.*)$/canonical: \/en\/privacy\//' \
        ./src/content/en/pages/privacy-policy.md > ./src/content/en/pages/privacy-policy-mobile.md \
    && sed -E \
        -e 's/^layout:(.*)$/layout: mobile-app/' \
        -e 's/^url:(.*)$/url: \/en\/tos-mobile-app\//' \
        -e 's/^canonical:(.*)$/canonical: \/en\/tos\//' \
        ./src/content/en/pages/terms-of-service.md > ./src/content/en/pages/terms-of-service-mobile.md \
    && sed -E \
        -e 's/^layout:(.*)$/layout: mobile-app/' \
        -e 's/^url:(.*)$/url: \/es\/privacy-mobile-app\//' \
        -e 's/^canonical:(.*)$/canonical: \/es\/privacy\//' \
        ./src/content/es/pages/privacy-policy.md > ./src/content/es/pages/privacy-policy-mobile.md \
    && sed -E \
        -e 's/^layout:(.*)$/layout: mobile-app/' \
        -e 's/^url:(.*)$/url: \/es\/tos-mobile-app\//' \
        -e 's/^canonical:(.*)$/canonical: \/es\/tos\//' \
        ./src/content/es/pages/terms-of-service.md > ./src/content/es/pages/terms-of-service-mobile.md

# Build Hugo site
RUN hugo -s ./src -b ${BASE_URL} --environment $ENV -d /opt/build/public

FROM nginx:1.27-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/build/public /var/www/static
