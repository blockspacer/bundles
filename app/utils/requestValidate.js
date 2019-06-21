const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  orderId: Joi.string().required(),
  lpn: Joi.array().items({
    lpnId: Joi.string().required(),
    lpnStatus: Joi.string().required(),
    lpnStatusDate: Joi.string().allow(''),
    originCommerce: Joi.string().allow(''),
    destinationCommerce: Joi.string().allow(''),
    totalTraces: Joi.string().allow(''),
    products: Joi.array().items({
      sku: Joi.string().allow(''),
      skuDescription: Joi.string().allow('')
    }),
    quantity: Joi.string().allow(''),
    receptionDocumentType: Joi.string().allow(''),
    firstOriginFacilityId: Joi.string().allow(''),
    firstOriginFacilityName: Joi.string().allow(''),
    lastDestinationFacilityId: Joi.string().allow(''),
    lastDestinationFacilityName: Joi.string().allow(''),
    lpnTrace: Joi.array().items({
      traceStatus: Joi.string().allow(''),
      // processed: Joi.boolean(),
      site: Joi.string().allow(''),
      plannedDate: Joi.string().allow(''),
      receptionDate: Joi.string().allow(''),
      user: Joi.string().allow(''),
      carrier: Joi.string().allow(''),
      licensePlate: Joi.string().allow(''),
      originFacilityIdXD: Joi.string().allow(''),
      originFacilityNameXD: Joi.string().allow(''),
      destinationFacilityIdXD: Joi.string().allow(''),
      destinationFacilityNameXD: Joi.string().allow('')
    })
  })
});

module.exports = schema;
