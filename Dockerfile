FROM mhart/alpine-node

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont


# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV NODE_ENV=production

WORKDIR /app


COPY yarn.lock package.json ./
RUN yarn install --production

COPY . .
COPY tsconfig.base.json ./tsconfig.json

RUN mv tsconfig.base.json tsconfig.json

# clean
RUN yarn cache clean && \
    rm -rf yarn.lock

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

CMD ["yarn", "ts-node", "-T", "."]
