'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const logging = require('@kasa/koa-logging');
const requestId = require('@kasa/koa-request-id');
const { responseHandler, errorHandler, servicebus } = require('./middlewares');
const { mongodb, rediscache } = require('./databases');
const { default: timeout } = require('@uswitch/koa-timeout');
const koaSwagger = require('koa2-swagger-ui');
const apm = require('./apm');
const logger = require('./logger');
const { core, healthy, common } = require('./routes');

const prometheus = apm.collectors[0];
const sbListener = servicebus.main();

mongodb.connectToDb();
rediscache.connectToRedis();

class App extends Koa {
  constructor(...params) {
    super(...params);

    // Trust proxy
    this.proxy = true;
    // Disable `console.errors` except development env
    this.silent = this.env !== 'development';

    this.servers = [];

    this._configureMiddlewares();
    this._configureRoutes();
  }

  _configureMiddlewares() {
    this.use(
      bodyParser({
        enableTypes: ['json'],
        formLimit: '10mb',
        jsonLimit: '10mb'
      })
    );
    this.use(requestId());
    this.use(
      cors({
        origin: '*',
        allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
        allowHeaders: ['Content-Type', 'Authorization'],
        exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
      })
    );
    this.use(responseHandler());
    // timeout
    this.use(timeout(process.env.TIMEOUT * 1000 || 3000, { status: 499 }));
    // Metrics
    if (prometheus.active) {
      logger.info({ event: 'execute' }, 'Prometheus On');
      // eslint-disable-next-line no-undef
      this.use(meters.middleware);
      this.use((ctx, next) => {
        if (ctx.request.path !== '/metrics') { return next(); }
        // eslint-disable-next-line no-undef
        ctx.body = meters.print();
        return ctx.body;
      });
    } else {
      logger.info({ event: 'execute' }, 'Prometheus Off');
    }

    this.use(errorHandler());
    this.use(logging({
      logger,
      overrideSerializers: false
    }));
    this.use(koaSwagger({
      routePrefix: `/api/${process.env.API_VERSION}/customer-orders/lpn/doc/swagger`,
      swaggerOptions: {
        url: `http://${process.env.ADDRESS}/api/${process.env.API_VERSION}/customer-orders/lpn/spec`,
      },
    }),);
  }

  _configureRoutes() {
    // Bootstrap application router
    this.use(core.routes());
    this.use(core.allowedMethods());
    this.use(healthy.routes());
    this.use(healthy.allowedMethods());
    this.use(common.routes());
    this.use(common.allowedMethods());
  }

  listen(...args) {
    const server = super.listen(...args);
    sbListener;
    this.servers.push(server);
    return server;
  }

  async terminate() {
    // TODO: Implement graceful shutdown with pending request counter
    for (const server of this.servers) {
      server.close();
    }
  }
}

module.exports = App;
