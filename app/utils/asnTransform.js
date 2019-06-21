'use strict';
const objectMapper = require('object-mapper');

let transform = {
  'advanceShippedNotice.asn.salesOrderNbr': {
    key: 'orderId',
    transform: value => {
      return value;
    }
  },
  'advanceShippedNotice.asn.lpn.[].lpnId': {
    key: 'lpn.[].lpnId',
    transform: value => {
      return value;
    }
  },
  'advanceShippedNotice.asn.lpn.[].lpnStatus': {
    key: 'lpn.[].lpnStatus',
    transform: value => {
      return value;
    }
  },
  'advanceShippedNotice.asn.lpn.[].lpnStatusDate': {
    key: 'lpn.[].lpnStatusDate',
    transform: value => {
      return value;
    }
  },
  'advanceShippedNotice.asn.originFacilityAliasId': {
    key: 'lpn.[].originCommerce',
    transform: value => {
      return value;
    }
  },
  'advanceShippedNotice.asn.destinationFacilityAliasId': {
    key: 'lpn.[].destinationCommerce',
    transform: value => {
      return value;
    }
  },
  'advanceShippedNotice.asn.lpn.[].lpndetail.lpnDetailQuantity.quantity': {
    key: 'lpn.[].quantity',
    transform: value => {
      return value;
    }
  }
};

let dest = {
  orderId: '',
  lpn: [
    {
      lpnId: '',
      lpnStatus: '',
      lpnStatusDate: '',
      originCommerce: '',
      destinationCommerce: '',
      totalTraces: '',
      products: [{ sku: '', skuDescription: '' }],
      quantity: '',
      receptionDocumentType: '',
      firstOriginFacilityId: '',
      firstOriginFacilityName: '',
      lastDestinationFacilityId: '',
      lastDestinationFacilityName: '',
      lpnTrace: [
        {
          traceStatus: '',
          site: '',
          plannedDate: '',
          receptionDate: '',
          user: '',
          carrier: '',
          licensePlate: '',
          originFacilityIdXD: '',
          originFacilityNameXD: '',
          destinationFacilityIdXD: '',
          destinationFacilityNameXD: ''
        }
      ]
    }
  ]
};
exports.transform = message => {
  let result;

  result = objectMapper(message, dest, transform);

  return result;
};
