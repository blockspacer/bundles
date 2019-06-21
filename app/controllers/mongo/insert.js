'use strict';
const { save } = require('../redis');

const handlers = ({
  mongodb,
  rediscache,
  logger,
  schema,
  Joi,
  DUPLICATE_KEY_ERROR
}) => ({
  post: async ctx => {
    logger.info('Validating request');
    const validate = Joi.validate(ctx.request.body, schema);
    if (validate.error === null) {
      let db;
      let redis;

      // for (let index = 0; index < ctx.request.body.lpn.length; index++) {
      //   const element = ctx.request.body.lpn[index];
      //   element.actualSectionDate = await isoDate(ctx.request.body.lpn[index].actualSectionDate);
      //   element.totalSectionsDate = await isoDate(ctx.request.body.lpn[index].totalSectionsDate);
      // }

      db = mongodb.getDb();
      await db
        .insertOne(ctx.request.body)
        .then(result => {
          if (!result) {
            ctx.status = 500;
            ctx.throw(500);
          } else {
            logger.info('Attempting to save data in Redis');
            redis = save.redis({ rediscache, logger });
            redis.saveDataIntoCache(result.ops[0]);
          }
          return ctx.res.created({
            data: { insertedId: result.insertedId },
            message: 'Success inserting data!'
          });
        })
        .catch(err => {
          if (err.name === 'MongoError' && err.code === 11000) {
            logger.error(err.errmsg);
            ctx.res.unprocessableEntity(DUPLICATE_KEY_ERROR);
            ctx.app.emit('error', err, ctx);
          } else {
            logger.error(err.errmsg);
            ctx.throw(ctx.status, err.message);
          }
        });
    } else {
      logger.error('Validation error');
      logger.error(validate.error);
      return ctx.res.badRequest({
        data: validate.error,
        message: 'Validation Error'
      });
    }
  },
  postFromSb: async data => {
    let queryResult = null;
    let db;
    let redis;

    // for (let index = 0; index < ctx.request.body.lpn.length; index++) {
    //   const element = ctx.request.body.lpn[index];
    //   element.actualSectionDate = await isoDate(ctx.request.body.lpn[index].actualSectionDate);
    //   element.totalSectionsDate = await isoDate(ctx.request.body.lpn[index].totalSectionsDate);
    // }

    db = mongodb.getDb();
    logger.info(data);
    await db
      .insertOne(data)
      .then(result => {
        if (result) {
          logger.info('Attempting to save data in Redis');
          redis = save.redis({ rediscache, logger });
          redis.saveDataIntoCache(result.ops[0]);
          queryResult = result;
        }
      })
      .catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
          logger.error(err);
          queryResult = {
            data: err.name,
            code: err.code,
            message: err.errmsg
          };
          data = null;
        } else {
          logger.error(err);
          queryResult = {
            data: err.name,
            code: err.code,
            message: err.errmsg
          };
          data = null;
        }
      });
    return queryResult;
  }
});

module.exports = {
  handlers
};
