'use strict';
const objectMapper = require('object-mapper');

let transform_array = {
  '[].orderId': {
    key: '[].orderId',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnId': {
    key: '[].lpn[].lpnId',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnStatus': {
    key: '[].lpn[].lpnStatus',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnStatusDate': {
    key: '[].lpn[].lpnStatusDate',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].originCommerce': {
    key: '[].lpn[].originCommerce',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].destinationCommerce': {
    key: '[].lpn[].destinationCommerce',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].totalTraces': {
    key: '[].lpn[].totalTraces',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].sku': {
    key: '[].lpn[].sku',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].skuDescription': {
    key: '[].lpn[].skuDescription',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].quantity': {
    key: '[].lpn[].quantity',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].receptionDocumentType': {
    key: '[].lpn[].receptionDocumentType',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].firstOriginFacilityId': {
    key: '[].lpn[].firstOriginFacilityId',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].firstOriginFacilityName': {
    key: '[].lpn[].firstOriginFacilityName',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lastDestinationFacilityId': {
    key: '[].lpn[].lastDestinationFacilityId',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lastDdestinationFacilityName': {
    key: '[].lpn[].lastDdestinationFacilityName',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace': {
    key: '[].lpn[].lpnTrace',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].traceStatus': {
    key: '[].lpn[].lpnTrace.[].traceStatus',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].site': {
    key: '[].lpn[].lpnTrace.[].site',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].plannedDate': {
    key: '[].lpn[].lpnTrace.[].plannedDate',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].receptionDate': {
    key: '[].lpn[].lpnTrace.[].receptionDate',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].user': {
    key: '[].lpn[].lpnTrace.[].user',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].carrier': {
    key: '[].lpn[].lpnTrace.[].carrier',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].licensePlate': {
    key: '[].lpn[].lpnTrace.[].licensePlate',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].originFacilityIdXD': {
    key: '[].lpn[].lpnTrace.[].traceSoriginFacilityIdXDtatus',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].originFacilityNameXD': {
    key: '[].lpn[].lpnTrace.[].originFacilityNameXD',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].destinationFacilityIdXD': {
    key: '[].lpn[].lpnTrace.[].destinationFacilityIdXD',
    transform: function (value) {
      return value;
    }
  },
  '[].lpn.[].lpnTrace.[].destinationFacilityNameXD': {
    key: '[].lpn[].lpnTrace.[].destinationFacilityNameXD',
    transform: function (value) {
      return value;
    }
  }
};

let transform = {
  'orderId': {
    key: '[].orderId',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnId': {
    key: '[].lpn[].lpnId',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnStatus': {
    key: '[].lpn[].lpnStatus',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnStatusDate': {
    key: '[].lpn[].lpnStatusDate',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].originCommerce': {
    key: '[].lpn[].originCommerce',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].destinationCommerce': {
    key: '[].lpn[].destinationCommerce',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].totalTraces': {
    key: '[].lpn[].totalTraces',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].sku': {
    key: '[].lpn[].sku',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].skuDescription': {
    key: '[].lpn[].skuDescription',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].quantity': {
    key: '[].lpn[].quantity',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].receptionDocumentType': {
    key: '[].lpn[].receptionDocumentType',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].firstOriginFacilityId': {
    key: '[].lpn[].firstOriginFacilityId',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].firstOriginFacilityName': {
    key: '[].lpn[].firstOriginFacilityName',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lastDestinationFacilityId': {
    key: '[].lpn[].lastDestinationFacilityId',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lastDdestinationFacilityName': {
    key: '[].lpn[].lastDdestinationFacilityName',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace': {
    key: '[].lpn[].lpnTrace',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].traceStatus': {
    key: '[].lpn[].lpnTrace.[].traceStatus',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].site': {
    key: '[].lpn[].lpnTrace.[].site',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].plannedDate': {
    key: '[].lpn[].lpnTrace.[].plannedDate',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].receptionDate': {
    key: '[].lpn[].lpnTrace.[].receptionDate',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].user': {
    key: '[].lpn[].lpnTrace.[].user',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].carrier': {
    key: '[].lpn[].lpnTrace.[].carrier',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].licensePlate': {
    key: '[].lpn[].lpnTrace.[].licensePlate',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].originFacilityIdXD': {
    key: '[].lpn[].lpnTrace.[].traceSoriginFacilityIdXDtatus',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].originFacilityNameXD': {
    key: '[].lpn[].lpnTrace.[].originFacilityNameXD',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].destinationFacilityIdXD': {
    key: '[].lpn[].lpnTrace.[].destinationFacilityIdXD',
    transform: function (value) {
      return value;
    }
  },
  'lpn.[].lpnTrace.[].destinationFacilityNameXD': {
    key: '[].lpn[].lpnTrace.[].destinationFacilityNameXD',
    transform: function (value) {
      return value;
    }
  }
};


exports.transform = function (message, type) {
  let result;

  if (type === 'array') {
    result = objectMapper(message, transform_array);
  } else {
    result = objectMapper(message, transform);
  }

  return result;
};
