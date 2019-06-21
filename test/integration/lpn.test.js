'use strict';

const supertest = require('supertest');
const os = require('os');
const pkg = require('../../package.json');
const app = require('../../app');
const server = app.listen();

const requestDataLpn = require('../request/requestData/requestDataLpn');
const requestDataOnlyRequiredFields = require('../request/requestData/requestDataOnlyRequiredFields');
const requestDataAllFieldsOptionalsEmpty = require('../request/requestData/requestDataAllFieldsOptionalsEmpty');
const requestDataWrongLpn = require('../request/requestData/requestDataWrongLpn');
const requestDataUpdateLpn = require('../request/requestData/requestDataUpdateLpn');
const requestPatch = require('../request/requestData/requestPatch');
const requestPatchOneLpn = require('../request/requestData/requestPatchOneLpn');

const path = `/api/v1/customer-orders/lpn`;

const getAll = `${path}`;
const getCore = `${path}/core`;
const getSpec = `${path}/spec`;
const getHealthy = `${path}/status/healthy`;

const post = `${path}`;
const get = `${path}/order/${requestDataLpn.orderId}/lpnid/${requestDataLpn.lpn[0].lpnId}`;
const put = `${path}/order/${requestDataLpn.orderId}/lpnid/${requestDataLpn.lpn[0].lpnId}`;
const getRecDocType = `${path}/reception-doc-type/${requestDataUpdateLpn.lpn[0].receptionDocumentType}`;
const patch = `${path}/status-update`;

const valueOrderId = requestDataLpn.orderId;
const valueLpnId = requestDataLpn.lpn[0].lpnId;
const valueLpnStatus = requestDataLpn.lpn[0].lpnStatus;

afterAll(async () => {
  await app.terminate();
});

describe('lpn Flow Integration test', () => {
  const request = supertest(server);
  describe(`[CCCORP-2238 - GET (Core )] ${getCore}`, () => {
    test('<200> should always return with the API server information', async () => {
      const res = await request
        .get(getCore)
        .expect('Content-Type', /json/)
        .expect(200);

      const info = res.body;
      const expected = ['name', 'version', 'description', 'environments'];
      expect(Object.keys(info)).toEqual(expect.arrayContaining(expected));
      expect(info.name).toBe(pkg.name);
      expect(info.version).toBe(pkg.version);
      expect(info.description).toBe(pkg.description);
      expect(info.environments).toBeInstanceOf(Object);

      const environments = info.environments;
      expect(environments.hostname).toBe(os.hostname());
      expect(environments.nodeVersion).toBe(process.versions['node']);
      expect(environments.platform).toBe(`${process.platform}/${process.arch}`);
    });
  });

  describe(`[CCCORP-2239 - GET (Spec)] ${getSpec}`, () => {
    it('<200> should always return API specification in swagger format', async () => {
      await request
        .get(getSpec)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe(`[CCCORP-2239 - GET (healthy)] ${getHealthy}`, () => {
    it('<200> should get healty', async () => {
      await request
      .get(getHealthy)
      .expect(200);
      });
  });

  describe(`[CCCORP-2242 - GET (All)] ${getAll}`, () => {
    it('<204> should get no item at all', async () => {
      await request
        .get(getAll)
        .expect(204);
    });
  });

  //SE ELIMINARON DATOS YA QUE DABA ERROR CON SKU 
  describe(`[CCCORP-2246 - POST] ${post}`, () => {
    it('<201> should insert one item', async () => {
      const res = await request
        .post(post)
        .send(requestDataLpn)
        .expect('Content-Type', /json/)
        .expect(201);

       const body = res.body;

       expect(body.status).toBe('success');
       expect(body.data.insertedId);
       expect(body.message).toBe('Success inserting data!');
    });
  });

  describe(`[CCCORP-2244 - POST (only required fields)] ${post}`, () => {
    it('<201> should insert one item', async () => {
      const res = await request
        .post(post)
        .send(requestDataOnlyRequiredFields)
        .expect('Content-Type', /json/)
        .expect(201);

       const body = res.body;

       expect(body.status).toBe('success');
       expect(body.data.insertedId);
       expect(body.message).toBe('Success inserting data!');
    });
  });

  describe(`[CCCORP-2245 - POST (all fields optionals empty)] ${post}`, () => {
    it('<201> should insert one item', async () => {
      const res = await request
        .post(post)
        .send(requestDataAllFieldsOptionalsEmpty)
        .expect('Content-Type', /json/)
        .expect(201);

       const body = res.body;

       expect(body.status).toBe('success');
       expect(body.data.insertedId);
       expect(body.message).toBe('Success inserting data!');
    });
  });

  describe(`[CCCORP-2247 - POST (without the required attribute "orderId")] ${post}`, () => {
    it('<400> should not insert the object', async () => {
      delete requestDataLpn.orderId;
      const res = await request
        .post(post)
        .send(requestDataLpn)
        .expect('Content-Type', /json/)
        .expect(400); 

      requestDataLpn.orderId = valueOrderId;
      const body = res.body;

      expect(body.status).toBe('fail');
      expect(body.data).toBeInstanceOf(Object);
      expect(body.data.isJoi).toBe(true);
      expect(body.data.details).toBeInstanceOf(Array);
      expect(body.data._object).toBeInstanceOf(Object);
      expect(body.message).toBe('Validation Error');
    });
  });

  describe(`[CCCORP-2247 - POST (without the required attribute "lpnId")] ${post}`, () => {
    it('<400> should not insert the object', async () => {
      delete requestDataLpn.lpn[0].lpnId;
      const res = await request
        .post(post)
        .send(requestDataLpn)
        .expect('Content-Type', /json/)
        .expect(400); 

      requestDataLpn.lpn[0].lpnId = valueLpnId;
      const body = res.body;

      expect(body.status).toBe('fail');
      expect(body.data).toBeInstanceOf(Object);
      expect(body.data.isJoi).toBe(true);
      expect(body.data.details).toBeInstanceOf(Array);
      expect(body.data._object).toBeInstanceOf(Object);
      expect(body.message).toBe('Validation Error');
    });
  });

  describe(`[CCCORP-2247 - POST (without the required attribute "lpnStatus")] ${post}`, () => {
    it('<400> should not insert the object', async () => {
      delete requestDataLpn.lpn[0].lpnStatus;
      const res = await request
        .post(post)
        .send(requestDataLpn)
        .expect('Content-Type', /json/)
        .expect(400); 

      requestDataLpn.lpn[0].lpnStatus = valueLpnStatus;
      const body = res.body;

      expect(body.status).toBe('fail');
      expect(body.data).toBeInstanceOf(Object);
      expect(body.data.isJoi).toBe(true);
      expect(body.data.details).toBeInstanceOf(Array);
      expect(body.data._object).toBeInstanceOf(Object);
      expect(body.message).toBe('Validation Error');
    });
  });

  describe(`[CCCORP-2250 - POST] ${post}`, () => {
    it('<400> should not insert the object', async () => {
      const res = await request
        .post(post)
        .send(requestDataWrongLpn)
        .expect('Content-Type', /json/)
        .expect(400); 

      const body = res.body;

      expect(body.status).toBe('fail');
      expect(body.data).toBeInstanceOf(Object);
      expect(body.data.isJoi).toBe(true);
      expect(body.data.details).toBeInstanceOf(Array);
      expect(body.data._object).toBeInstanceOf(Object);
      expect(body.message).toBe('Validation Error');
    });
  });

  describe(`[CCCORP-2251 - POST] ${post}`, () => {
    it('<422> should not insert the object', async () => {
      const res = await request
        .post(post)
        .send(requestDataLpn)
        .expect('Content-Type', /json/)
        .expect(422);

       const body = res.body;

       expect(body.status).toBe('fail');
       expect(body.code).toBe('MongoError');
       expect(body.message).toBe('E11000 duplicate key error.');
    });
  });

    describe(`[CCCORP-2253 - GET] ${get}`, () => {
    it('<200> should get an item with id 1', async () => {
      const res = await request
        .get(get)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = res.body;

      expect(body.status).toBe('success');
      expect(body.data).toEqual(requestDataLpn);
      expect(body.message).toContain('Data founded');
    });
  });

  describe(`[CCCORP-2254 - GET] ${get}`, () => {
    it('<204> No content found.', async () => {
      await request
        .get(`${path}/order/orderNotExist/lpnid/lpnidNotExist`)
        .expect(204);
    });
  });

  describe(`[CCCORP-2241 - GET (All)] ${getAll}`, () => {
    it('<200> should get all item', async () => {
      await request
        .get(getAll)
        .expect(200);
    });
  });

  describe(`[CCCORP-2256 - PUT] ${put}`, () => {
    it('<200> should update the document.', async () => {
      const res = await request
        .put(put)
        .send(requestDataUpdateLpn)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = res.body;

      expect(body.status).toBe('success');
      expect(body.data).toEqual(requestDataUpdateLpn);
      expect(body.message).toBe('Data updated');
    });
  });

  describe(`[CCCORP-2257 - PUT] ${put}`, () => {
    it('<204> No content found to be updated.', async () => {
        await request
        .put(`${path}/order/orderNotExist/lpnid/lpnidNotExist`)
        .send(requestDataUpdateLpn)
        .expect(204);
    });
  });

  describe(`[CCCORP-2258 - PUT] ${put}`, () => {
    it('<400> Bad request - Validation Error', async () => {
        await request
        .put(put)
        .send(requestDataWrongLpn)
        .expect(400);
    });
  });

    describe(`[CCCORP-2259 - PUT] ${put}`, () => {
    it('<400> Bad request - Validation Error', async () => {
      delete requestDataUpdateLpn.orderId;
      const res = await request
        .put(put)
        .send(requestDataUpdateLpn)
        .expect('Content-Type', /json/)
        .expect(400);

      requestDataUpdateLpn.orderId = valueOrderId;
      const body = res.body;

      expect(body.status).toBe('fail');
      expect(body.data).toBeInstanceOf(Object);
      expect(body.data.isJoi).toBe(true);
      expect(body.data.details).toBeInstanceOf(Array);
      expect(body.data._object).toBeInstanceOf(Object);
      expect(body.message).toBe('Validation Error');
    });
  });

  describe(`[CCCORP-2260 - PUT] ${put}`, () => {
    it('<400> Bad request - Validation Error', async () => {
      delete requestDataUpdateLpn.lpn[0].lpnId;
      const res = await request
        .put(put)
        .send(requestDataUpdateLpn)
        .expect('Content-Type', /json/)
        .expect(400);

      requestDataUpdateLpn.lpn[0].lpnId = valueLpnId;
      const body = res.body;

      expect(body.status).toBe('fail');
      expect(body.data).toBeInstanceOf(Object);
      expect(body.data.isJoi).toBe(true);
      expect(body.data.details).toBeInstanceOf(Array);
      expect(body.data._object).toBeInstanceOf(Object);
      expect(body.message).toBe('Validation Error');
    });
  });

  describe(`[CCCORP-2261 - PUT] ${put}`, () => {
    it('<400> Bad request - Validation Error', async () => {
      delete requestDataUpdateLpn.lpn[0].lpnStatus;
      const res = await request
        .put(put)
        .send(requestDataUpdateLpn)
        .expect('Content-Type', /json/)
        .expect(400);

      requestDataUpdateLpn.lpn[0].lpnStatus = valueLpnStatus;
      const body = res.body;

      expect(body.status).toBe('fail');
      expect(body.data).toBeInstanceOf(Object);
      expect(body.data.isJoi).toBe(true);
      expect(body.data.details).toBeInstanceOf(Array);
      expect(body.data._object).toBeInstanceOf(Object);
      expect(body.message).toBe('Validation Error');
    });
  });
  
  describe(`[CCCORP-2262 - PUT] ${put}`, () => {
    it('<204> No content found to be updated.', async () => {
        await request
        .put(`${path}/order/orderIdNotExist/lpnid/${requestDataLpn.lpn[0].lpnId}`)
        .send(requestDataLpn)
        .expect(204);
    });
  });

  describe(`[CCCORP-2263 - PUT] ${put}`, () => {
    it('<204> No content found to be updated.', async () => {
        await request
        .put(`${path}/order/${requestDataLpn.orderId}/lpnid/lpnidNotExist`)
        .send(requestDataLpn)
        .expect(204);
    });
  });


  //al actualizar el orderId en el body se actualilza y no deberia, 
  //en el test CCCORP-2264 se esta actualizando el lpnId que si esta dando un error correcto
  describe(`[CCCORP-2264 - PUT] ${put}`, () => {
    it('<422> Unprocessable Entity - Duplicate key error.', async () => {
      requestDataUpdateLpn.lpn[0].lpnId = `${requestDataOnlyRequiredFields.lpn[0].lpnId}`;
      const res = await request
        .put(put)
        .send(requestDataUpdateLpn)
        .expect('Content-Type', /json/)
        .expect(422);

      requestDataUpdateLpn.lpn[0].lpnId = valueLpnId;
      const body = res.body;

      expect(body.status).toBe('fail');
      expect(body.code).toBe('MongoError');
      expect(body.message).toBe('E11000 duplicate key error.');
    });
  });


  describe(`[CCCORP-2266 - GET (recDocType)] ${getRecDocType}`, () => {
    it('<200> should get an item', async () => {
      const res = await request
        .get(getRecDocType)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = res.body;

      expect(body.status).toBe('success');
      expect(body.data).toEqual(requestDataUpdateLpn);
      expect(body.message).toContain('Data founded');
    });
  });

  describe(`[CCCORP-2268 - GET (recDocType)] ${getRecDocType}`, () => {
    it('<204> No content found.', async () => {
      await request
        .get(`${path}/reception-doc-type/docTypeNotExist`)
        .expect(204);
    });
  });

//Error en swagger, no es un array dentro de otro array
//debe ser solo un array con lpn's
  describe(`[CCCORP-2270 - PATCH (status-update)] ${patch}`, () => {
    it('<201> should patch item', async () => {
      const res = await request
        .patch(patch)
        .send(requestPatchOneLpn)
        .expect('Content-Type', /json/)
        .expect(201);

        const body = res.body;
       expect(body.status).toBe('success');
       expect(body.message).toContain('Data updated');
    });
  });

  //Validar despues como replicar
  describe(`[CCCORP-2271 - PATCH (status-update)] ${patch}`, () => {
    it('<400> Bad request - Validation Error', async () => {
      requestDataUpdateLpn.lpn[0].lpnId = [12];
      const res = await request
        .put(patch)
        .send(requestPatch)
        //.expect('Content-Type', /json/)
        .expect(400);

        requestDataUpdateLpn.lpn[0].lpnId  = valueLpnId;
      const body = res.body;

      expect(body.status).toBe('fail');
      expect(body.data).toBeInstanceOf(Object);
      expect(body.data.isJoi).toBe(true);
      expect(body.data.details).toBeInstanceOf(Array);
      expect(body.data._object).toBeInstanceOf(Object);
      expect(body.message).toBe('Validation Error');
    });
  });

  describe(`[CCCORP-2273 - GET  after PATCH] ${get}`, () => {
    it('<200> should get an item', async () => {
      const res = await request
        .get(get)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = res.body;

      expect(body.status).toBe('success');
      expect(body.data[0].lpn[0].lpnStatus).toEqual('Recepcionada');
      expect(body.message).toContain('Data founded');
    });
  });

  //Error en swagger, no es un array dentro de otro array
//debe ser solo un array con lpn's
describe(`[CCCORP-2275 - PATCH (status-update)] ${patch}`, () => {
  it('<201> should patch item', async () => {
    const res = await request
      .patch(patch)
      .send(requestPatch)
      .expect('Content-Type', /json/)
      .expect(201);

      const body = res.body;
     expect(body.status).toBe('success');
     expect(body.message).toContain('Data updated');
  });
});

describe(`[CCCORP-2276 - GET of PATCH only one lpn (first)] ${get}`, () => {
  it('<200> should get an item', async () => {
    const res = await request
      .get(`${path}/order/${requestDataLpn.orderId}/lpnid/${requestDataLpn.lpn[0].lpnId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const body = res.body;

    expect(body.status).toBe('success');
    expect(body.data[0].lpn[0].lpnStatus).toEqual('Recepcionada');
    expect(body.message).toContain('Data founded');
  });
});

describe(`[CCCORP-2277 - GET of PATCH only one lpn (second)] ${get}`, () => {
  it('<200> should get an item', async () => {
    const res = await request
      .get(`${path}/order/${requestDataOnlyRequiredFields.orderId}/lpnid/${requestDataOnlyRequiredFields.lpn[0].lpnId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const body = res.body;

    expect(body.status).toBe('success');
    expect(body.data[0].lpn[0].lpnStatus).toEqual('Recepcionada');
    expect(body.message).toContain('Data founded');
  });
});

  describe(`[CCCORP-2278 - DELETE of first POST]`, () => {
    it('<200> should delete an item with inserted', async () => {
      const res = await request
        .delete(`${path}/order/${requestDataLpn.orderId}/lpnid/${requestDataLpn.lpn[0].lpnId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = res.body;

      expect(body.status).toBe('success');
      expect(body.message).toContain('Data deleted');
    });
  });

  describe(`[CCCORP-2279 - DELETE of first POST]`, () => {
    it('<200> should delete an item with inserted', async () => {
      const res = await request
        .delete(`${path}/order/${requestDataOnlyRequiredFields.orderId}/lpnid/${requestDataOnlyRequiredFields.lpn[0].lpnId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = res.body;

      expect(body.status).toBe('success');
      expect(body.message).toContain('Data deleted');
    });
  });

  describe(`[CCCORP - DELETE of empty date]`, () => {
    it('<200> should delete an item with inserted', async () => {
      const res = await request
        .delete(`${path}/order/${requestDataAllFieldsOptionalsEmpty.orderId}/lpnid/${requestDataAllFieldsOptionalsEmpty.lpn[0].lpnId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const body = res.body;

      expect(body.status).toBe('success');
      expect(body.message).toContain('Data deleted');
    });
  });

  describe(`[CCCORP-2280 - DELETE 204]`, () => {
    it('<204> should delete an item with inserted', async () => {
      const res = await request
        .delete(`${path}/order/notExist/lpnid/notExist}`)
        .expect(204);
    });
  });
 
  describe('[CCCORP-2282 - GET (All) of DELETE ]', () => {
    it('<204> should not find the item deleted', async () => {
      await request
        .get(getAll)
        .expect(204);
    });
  });
});