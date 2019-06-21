/**
 * @swagger
 * /api/v1/customer-orders/lpn:
 *   get:
 *     tags:
 *     - Bundles
 *     summary: Get all documents from collection.
 *     operationId: find
 *     responses:
 *       '200':
 *         x-summary: OK
 *         description:  Get a document of type order from the collection, given the orderId.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllSuccessResponse'
 *       '204':
 *         x-summary: No Content
 *         description: No document found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         x-summary: Internal Server Error
 *         description: Non Controlled Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */

/**
 * @swagger
 * /api/v1/customer-orders/lpn/order/{orderId}/lpnid/{lpnId}:
 *   get:
 *     tags:
 *     - Bundles
 *     summary: Get a document from collection.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order collection to get
 *       - in: path
 *         name: lpnId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the lpn collection to get
 *     responses:
 *       '200':
 *         description : OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSuccessResponse'
 *       '204':
 *         x-summary: OK
 *         description: No content found.
 *       '500':
 *         x-summary: Internal Server Error
 *         description: Non Controlled Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */

/**
 * @swagger
 * /api/v1/customer-orders/lpn/reception-doc-type/{recDocType}:
 *   get:
 *     tags:
 *     - Bundles
 *     summary: Get a document from collection.
 *     parameters:
 *       - in: path
 *         name: recDocType
 *         schema:
 *           type: string
 *         required: true
 *         description: Reception document Type
 *     responses:
 *       '200':
 *         description : OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSuccessResponse'
 *       '204':
 *         x-summary: OK
 *         description: No content found.
 *       '500':
 *         x-summary: Internal Server Error
 *         description: Non Controlled Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */

/**
 * @swagger
 * /api/v1/customer-orders/lpn/:
 *   post:
 *     tags:
 *     - Bundles
 *     summary: Create a new document in the collection.
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/LPN'
 *     operationId: add
 *     responses:
 *       '201':
 *         x-summary: OK
 *         description:  Create a document of type order from the collection, given the orderId.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostSuccessResponse'
 *       '400':
 *         x-summary: Bad Request
 *         description: Bad request - Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidateErrorResponse'
 *       '422':
 *         x-summary: Unprocessable Entity
 *         description: Unprocessable Entity - Duplicate key error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DuplicateKeyErrorResponse'
 *       '500':
 *         x-summary: Internal Server Error
 *         description: Non Controlled Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */

/**
 * @swagger
 * /api/v1/customer-orders/lpn/status-update:
 *   patch:
 *     tags:
 *     - Bundles
 *     summary: Update elements in the document.
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/PatchBodyRequest'
 *     operationId: patchStatus
 *     responses:
 *       '201':
 *         x-summary: OK
 *         description:  Create a document of type order from the collection, given the orderId.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatchSuccessResponse'
 *       '400':
 *         x-summary: Bad Request
 *         description: Bad request - Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidateErrorResponse'
 *       '500':
 *         x-summary: Internal Server Error
 *         description: Non Controlled Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */

/**
 * @swagger
 * /api/v1/customer-orders/lpn/order/{orderId}/lpnid/{lpnId}:
 *   put:
 *     tags:
 *     - Bundles
 *     summary: Update a document from collection.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order collection to get
 *       - in: path
 *         name: lpnId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the lpn collection to get
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/LPN'
 *     operationId: update
 *     responses:
 *       '200':
 *         x-summary: OK
 *         description:  Create a document of type order from the collection, given the orderId.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PutSuccessResponse'
 *       '204':
 *         x-summary: OK
 *         description: No content found to be updated.
 *       '400':
 *         x-summary: Bad Request
 *         description: Bad request - Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidateErrorResponse'
 *       '422':
 *         x-summary: Unprocessable Entity
 *         description: Unprocessable Entity - Duplicate key error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DuplicateKeyErrorResponse'
 *       '500':
 *         x-summary: Internal Server Error
 *         description: Non Controlled Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */

/**
 * @swagger
 * /api/v1/customer-orders/lpn/order/{orderId}/lpnid/{lpnId}:
 *   delete:
 *     tags:
 *     - Bundles
 *     summary: Delete a document from collection.
 *     operationId: delete
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         description: ID of the order collection to delete
 *       - in: path
 *         name: lpnId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the lpn collection to get
 *     responses:
 *       '200':
 *         x-summary: OK
 *         description:  Delete a document of type order from the collection, given the orderId.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteSuccessResponse'
 *       '204':
 *         x-summary: OK
 *         description: No content found to be deleted.
 *       '500':
 *         x-summary: Internal Server Error
 *         description: Non Controlled Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalErrorResponse'
 */
