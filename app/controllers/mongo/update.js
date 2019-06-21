'use strict';
const { update, remove } = require('../redis');

const handlers = ({
  mongodb,
  rediscache,
  logger,
  isoDate,
  schema,
  Joi,
  dto,
  DUPLICATE_KEY_ERROR,
  INTERNAL_ERROR
}) => ({
  put: async ctx => {
    const id = ctx.params.id;
    const orderId = ctx.params.orderId;
    let db;
    let redisUpd;
    let redisDel;
    db = mongodb.getDb();
    redisUpd = update.redis({ rediscache, logger });
    redisDel = remove.redis({ rediscache, logger });
    const validate = Joi.validate(ctx.request.body, schema);
    if (validate.error === null) {
      ctx.request.body.lpn.actualSectionDate = await isoDate(
        ctx.request.body.lpn.actualSectionDate
      );
      ctx.request.body.lpn.totalSectionsDate = await isoDate(
        ctx.request.body.lpn.totalSectionsDate
      );

      await db
        .findOneAndUpdate(
          // eslint-disable-next-line quote-props
          { orderId: orderId, 'lpn.lpnId': id },
          { $set: ctx.request.body },
          { returnOriginal: false }
        )
        .then(updatedResult => {
          if (updatedResult.value !== null) {
            redisDel.deleteDataFromCache(orderId, id);
            redisUpd.updateDataInCache(ctx, updatedResult.value);
            ctx.body = updatedResult.value;
          } else {
            return ctx.res.noContent({ message: 'Nothing to be updated' });
          }
          let msj = dto.transform(ctx.body, 'array');
          return ctx.res.ok({ data: msj, message: 'Data updated' });
        })
        .catch(e => {
          if (e.name === 'MongoError' && e.code === 11000) {
            logger.error(e.errmsg);
            ctx.res.unprocessableEntity(DUPLICATE_KEY_ERROR);
            ctx.app.emit('error', e, ctx);
          } else {
            logger.error(e);
            ctx.res.internalServerError(INTERNAL_ERROR);
            ctx.app.emit('error', e, ctx);
          }
        });
    } else {
      logger.error('Validation error');
      return ctx.res.badRequest({
        data: validate.error,
        message: 'Validation Error'
      });
    }
  },
  patch: async ctx => {
    let db;
    let redisUpd;
    let redisDel;
    db = mongodb.getDb();
    redisUpd = update.redis({ rediscache, logger });
    redisDel = remove.redis({ rediscache, logger });
    for (let index = 0; index < ctx.request.body.lpnsId.length; index++) {
      const element = ctx.request.body.lpnsId[index];
      // Listo para ubicar
      await db
        .findOneAndUpdate(
          { 'lpn.lpnId': element },
          { $set: { 'lpn.$.lpnStatus': 'Recepcionada' } },
          { returnOriginal: false }
        )
        .then(updatedResult => {
          if (updatedResult.value !== null) {
            logger.info(updatedResult.value.orderId);
            logger.info(element);
            redisDel.deleteDataFromCache(updatedResult.value.orderId, element);
            redisUpd.patchInCache(updatedResult.value);
            ctx.body = updatedResult.value;
          } else {
            return ctx.res.noContent({ message: 'Nothing to be updated' });
          }
          return ctx.res.created({ message: 'Data updated' });
        })
        .catch(e => {
          if (e.name === 'MongoError' && e.code === 11000) {
            logger.error(e.errmsg);
            ctx.res.unprocessableEntity(DUPLICATE_KEY_ERROR);
            ctx.app.emit('error', e, ctx);
          } else {
            logger.error(e.errmsg);
            ctx.res.internalServerError(INTERNAL_ERROR);
            ctx.app.emit('error', e, ctx);
          }
        });
    }
  }
});

module.exports = {
  handlers
};
