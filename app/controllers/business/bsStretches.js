'use strict';
const { getMethods } = require('../axios');
const _ = require('lodash');

const handlers = ({ axios, logger }) => ({
  stretches: async (firstOriginFacilityId, lastDestinationFacilityId) => {
    const array = [];
    const stretches = getMethods.handlers({ axios, logger });
    const rs = await stretches.getAllRoutes();

    const result = _.find(rs.RouteXDConfiguration, {
      OriginFacilityID: firstOriginFacilityId,
      DestinationFacilityID: lastDestinationFacilityId
    });
    let arrayOriginResult = result.DestinationFacilitiesXD;

    let origen = {
      traceStatus: 'en ruta',
      site: 'TBD',
      plannedDate: 'TBD',
      receptionDate: new Date(),
      user: 'TBD',
      // Empresa transportista
      carrier: 'TBD',
      // patente
      licensePlate: 'TBD',
      originFacilityIdXD: result.OriginFacilityID,
      originFacilityNameXD: result.OriginFacilityName,
      destinationFacilityIdXD:
        result.DestinationFacilitiesXD[0].DestinationFacilityIdXD,
      destinationFacilityNameXD:
        result.DestinationFacilitiesXD[0].DestinationFacilityNameXD
    };
    array.push(origen);

    if (arrayOriginResult.length > 1) {
      for (let id = 0; id < arrayOriginResult.length - 1; id++) {
        let cd = {
          traceStatus: 'recepcionado',
          site: 'TBD',
          plannedDate: 'TBD',
          receptionDate: new Date(),
          user: 'TBD',
          // Empresa transportista
          carrier: 'TBD',
          // patente
          licensePlate: 'TBD',
          originFacilityIdXD: arrayOriginResult[id].DestinationFacilityIdXD,
          originFacilityNameXD: arrayOriginResult[id].DestinationFacilityNameXD,
          destinationFacilityIdXD:
            arrayOriginResult[id + 1].DestinationFacilityIdXD,
          destinationFacilityNameXD:
            arrayOriginResult[id + 1].DestinationFacilityNameXD
        };

        array.push(cd);

        cd = {
          traceStatus: 'en ruta',
          site: 'TBD',
          plannedDate: 'TBD',
          receptionDate: new Date(),
          user: 'TBD',
          // Empresa transportista
          carrier: 'TBD',
          // patente
          licensePlate: 'TBD',
          originFacilityIdXD: arrayOriginResult[id].DestinationFacilityIdXD,
          originFacilityNameXD: arrayOriginResult[id].DestinationFacilityNameXD,
          destinationFacilityIdXD:
            arrayOriginResult[id + 1].DestinationFacilityIdXD,
          destinationFacilityNameXD:
            arrayOriginResult[id + 1].DestinationFacilityNameXD
        };

        array.push(cd);
      }
    }

    let destino = {
      traceStatus: 'recepcionado',
      site: 'TBD',
      plannedDate: 'TBD',
      receptionDate: 'TBD',
      user: 'TBD',
      // Empresa transportista
      carrier: 'TBD',
      // patente
      licensePlate: 'TBD',
      originFacilityIdXD:
        arrayOriginResult[arrayOriginResult.length - 1].DestinationFacilityIdXD,
      originFacilityNameXD:
        arrayOriginResult[arrayOriginResult.length - 1]
          .DestinationFacilityNameXD,
      destinationFacilityIdXD: result.DestinationFacilityID,
      destinationFacilityNameXD: result.DestinationFacilityName
    };

    array.push(destino);
    return array;
  }
});

module.exports = {
  handlers
};
