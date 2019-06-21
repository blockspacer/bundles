'use strict';
const { ServiceBusClient, ReceiveMode } = require('@azure/service-bus');
const axios = require('axios');
const dotenv = require('dotenv');
const { asnTransform } = require('../utils');
const { mongodb, rediscache } = require('../databases');
const logger = require('../logger');
const { whmgapi, add, traces } = require('../controllers');

dotenv.config();

// const handler = () => ({
//   main: async () => {
async function main() {
  const ns = ServiceBusClient.createFromConnectionString(
    process.env.AZURE_SERVICEBUS_CONNECTION_STRING
  );
  const client = ns.createSubscriptionClient(
    process.env.AZURE_TOPIC_NAME,
    process.env.AZURE_SUBSCRIPTION_NAME
  );
  const receiver = client.createReceiver(ReceiveMode.peekLock);

  const onMessageHandler = async brokeredMessage => {
    const api = whmgapi.getMethods;
    const http = api.handlers({ axios, logger });
    const mongo = add.handlers({
      mongodb,
      rediscache,
      logger
    });
    const routes = traces.routes;
    const routesXD = routes.handlers({ axios, logger });
    const eventBody = JSON.parse(brokeredMessage.body);
    let transformedMsg = null;
    if (brokeredMessage.userProperties.eventType === process.env.CREATE) {
      http
        .getAsnById(eventBody.asnId)
        .then(async wmngResponse => {
          if (typeof wmngResponse !== 'undefined' || wmngResponse !== null) {
            logger.info('Transforming message from source to target.');
            transformedMsg = await asnTransform.transform(wmngResponse);
            delete transformedMsg['_id'];
          }
          return transformedMsg;
        })
        .then(async transformedMsg => {
          const tracesBody = await routesXD.stretches(
            transformedMsg.lpn.firstOriginFacilityId,
            transformedMsg.lpn.lastDestinationFacilityId
          );
          logger.info(tracesBody);
          transformedMsg['lpnTraces'] = tracesBody;
          const bundle = transformedMsg;
          logger.info(bundle);
          return bundle;
        })
        .then(async msg => {
          await mongo.postFromSb(msg).then(async mongoresp => {
            if (typeof mongoresp !== 'undefined' || mongoresp !== null) {
              if (mongoresp.data === 'MongoError') {
                await brokeredMessage.deadLetter({
                  deadletterReason: `${mongoresp.data}:${mongoresp.code}`,
                  deadLetterErrorDescription: mongoresp.message
                });
                transformedMsg = null;
                mongoresp = null;
              } else if (
                typeof mongoresp.insertedId !== 'undefined' &&
                mongoresp.insertedId !== null
              ) {
                logger.info('LPN successfuly inserted');
                await brokeredMessage.complete();
                transformedMsg = null;
                mongoresp = null;
              } else {
                throw new Error('Unknown error');
              }
            } else {
              throw new Error('Unknown error');
            }
          });
        })
        .catch(async err => {
          logger.error('Unknown error: ', err);
          brokeredMessage.deadLetter({
            deadletterReason: 'Unknown error',
            deadLetterErrorDescription: `Unknown error. -Desc: ${err}`
          });
          throw new Error(err);
        });
    }
  };
  const onErrorHandler = err => {
    logger.info('Error occurred - Error Handler: ', err);
    throw err;
  };

  try {
    receiver.registerMessageHandler(onMessageHandler, onErrorHandler, {
      autoComplete: false
    });

    // Waiting long enough before closing the receiver to receive messages
    // await delay(5000);

    // await receiver.close();
    // await client.close();
  } finally {
    // await ns.close();
  }
}
// });

main().catch(err => {
  logger.info('Error occurred - Main Catch Handler: ', err);
});

module.exports = {
  main
};
