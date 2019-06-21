'use strict';

const handlers = ({ axios, logger }) => ({
  getAsnById: async asnId => {
    let asn = null;
    await axios
      .get(`${process.env.LCCC_ASN}/${asnId}`)
      .then(response => {
        asn = response.data;
      })
      .catch(e => {
        logger.info(e);
        throw e;
      });
    return asn;
  },
  getAllRoutes: async () => {
    let data = null;
    await axios
      .get(process.env.LCCC_ROUTES)
      .then(response => {
        let res = response.data;
        data = res;
      })
      .catch(e => {
        logger.error(e);
        data = null;
      });
    return data;
  }
});

module.exports = {
  handlers
};
