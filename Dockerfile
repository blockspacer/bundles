#
# KOA REST API BOILERPLATE

### BASE
FROM node:10.15.0-alpine AS base
LABEL maintainer "Sergio Pino <ext_sapinol@falabella.cl>"
# Set the working directory
WORKDIR /app
# Copy project specification and dependencies lock files
COPY package.json yarn.lock ./

### DEPENDENCIES
FROM base AS dependencies
# Install dependencies for `node-gyp`
# RUN apk --no-cache add --virtual builds-deps build-base python
# Configure NPM for private repositories
ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
# Install Node.js dependencies (only production)
RUN yarn --production
# Backup production dependencies aside
RUN cp -R ./node_modules /tmp
# Install ALL Node.js dependencies
RUN yarn
# Delete the NPM token
RUN rm -f .npmrc
# Backup development dependencies aside
RUN mv ./node_modules /tmp/node_modules_dev

### RELEASE
FROM gascregistry.azurecr.io/builds/node:10-alpine AS release
# FROM base AS release
# Install for healthcheck
# RUN apk add --update --no-cache curl
# Copy development dependencies if --build-arg DEBUG=1, or production dependencies
ARG DEBUG
COPY --from=dependencies /tmp/node_modules${DEBUG:+_dev} ./node_modules
# Copy app sources
# Copy app sources
RUN mkdir config
COPY docker/config-secrets-env.sh ./config
COPY docker/entrypoint.sh .
COPY . .

#Time Out Aplication in sec
#ENV TIMEOUT 3
#Base Name Api
#ENV BASE_NAME price

# General
# Expose application name
# ENV APP_NAME
# Expose application port
# ENV APP_HOST
# Expose application port
# ENV APP_PORT 3000

# Logger
# ENV LOG_ENABLED=
# ENV LOG_LEVEL=

# MONGOMS
ENV MONGOMS_VERSION latest
#MONGOMS_DOWNLOAD_DIR=
ENV MONGOMS_PLATFORM linux
ENV MONGOMS_ARCH x64
ENV DEBUG jest-mongodb:*

# APM
ENV PROMETHEUS on

# Expose application port
ENV APP_PORT 3000
EXPOSE $APP_PORT

# Set NODE_ENV to 'development' if --build-arg DEBUG=1, or 'production'
ENV NODE_ENV=${DEBUG:+development}
ENV NODE_ENV=${NODE_ENV:-development}

# Run
# ENTRYPOINT [". ./entrypoint.sh"]
CMD ["/bin/sh","entrypoint.sh"]
