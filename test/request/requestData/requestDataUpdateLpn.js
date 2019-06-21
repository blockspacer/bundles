const requestDataLpn = require('./requestDataLpn.js');

module.exports =  {
  orderId: `${requestDataLpn.orderId}`,
  lpn: [
    {
      lpnId: `${requestDataLpn.lpn[0].lpnId}`,
      lpnStatus: 'Enrutado Bodega.',
      lpnStatusDate: 'update',
      totalTraces: 'update',
      quantity: 'update',
      receptionDocumentType: 'update',
      firstOriginFacilityId: 'update',
      firstOriginFacilityName: 'update',
      lastDestinationFacilityId: 'update',
      lpnTrace: [
        {
          traceStatus: 'update',
          site: 'update',
          plannedDate: 'update',
          receptionDate: 'update',
          user: 'update',
          carrier: 'update',
          licensePlate: 'update',
          originFacilityIdXD: 'update',
          originFacilityNameXD: 'update',
          destinationFacilityIdXD: 'update',
          destinationFacilityNameXD: 'update'
        }
      ]
    }
  ]
}