FROM nginx:1.18 AS builder

ARG ENV=production
ARG BASE_URL=https://www.ivpn.net
ARG API_URL=https://api.ivpn.net
ARG PAYPAL_CLIENT_ID=Ae94bviH2d45LcrM1nnnUcIDuJNb2NZgR_-3GKoJS1krkkNiInSl9V-SHMLvpPd1V8P9-yDRNoWBWK44

WORKDIR /opt/build

# Install nodejs, yarn and hugo
RUN apt-get update  \
    && apt-get install -y gnupg gnupg2 gnupg1 \
    && apt-get install -y nodejs \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install yarn \
    && curl -L  https://github.com/gohugoio/hugo/releases/download/v0.76.3/hugo_0.76.3_Linux-64bit.deb -o /tmp/hugo.deb \
    && dpkg -i /tmp/hugo.deb \
    && rm /tmp/hugo.deb

COPY ./src/themes/ivpn-v3/package.json ./src/themes/ivpn-v3/yarn.lock ./src/themes/ivpn-v3/
RUN yarn --cwd ./src/themes/ivpn-v3/ --pure-lockfile

COPY ./src ./src
RUN echo "MIX_APP_WEBAPI_URL=${BASE_URL}\nMIX_APP_API_URL=${API_URL}\nMIX_APP_PAYPAL_CLIENT_ID=${PAYPAL_CLIENT_ID}\n" > ./src/themes/ivpn-v3/.env
RUN echo "Environment: $ENV\nBase URL: ${BASE_URL}\nAPI URL: ${API_URL}\nPayPal Client ID: ${PAYPAL_CLIENT_ID}\n"

RUN yarn --cwd ./src/themes/ivpn-v3/ $ENV

RUN sed -E -e 's/^layout:(.*)$/layout: mobile-app/' \
     -e 's/^url:(.*)$/url: \/privacy-mobile-app\//' \
     -e 's/^canonical:(.*)$/canonical: \/privacy\//' \
   ./src/content/pages/privacy-policy.md > ./src/content/pages/privacy-policy-mobile.md \
   && sed -E -e 's/^layout:(.*)$/layout: mobile-app/' \
     -e 's/^url:(.*)$/url: \/tos-mobile-app\//' \
     -e 's/^canonical:(.*)$/canonical: \/tos\//' \
   ./src/content/pages/terms-of-service.md > ./src/content/pages/terms-of-service-mobile.md

RUN hugo -s ./src -b ${BASE_URL} --environment $ENV -d /opt/build/public

FROM nginx:1.18

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/build/public /var/www/static