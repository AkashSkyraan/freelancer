// #region Create client profile
/**
 * @swagger
 * /api/client/createprofile:
 *   post:
 *     tags:
 *       - Client
 *     summary: Create client profile
 *     description: create client profile with required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "USER_JNTOYP5UA8J7MQV"
 *               name:
 *                 type: string
 *                 example: sky
 *               profile:
 *                 type: string
 *                 example: "profileURL"
 *               com_name:
 *                 type: string
 *                 example: "skyraan"
 *               com_type:
 *                 type: number
 *                 example: 2
 *               com_size:
 *                 type: number
 *                 example: 1
 *               com_site:
 *                 type: string
 *                 example: "www.client.com"
 *               email:
 *                 type: string
 *                 example: "skyraan@gmail.com"
 *               phn_num:
 *                 type: string
 *                 example: "9876543210"
 *               c_code:
 *                 type: string
 *                 example: "+91"
 *               zip_code:
 *                 type: string
 *                 example: "641006"
 *               address:
 *                 type: string
 *                 example: "fci road"
 *               city:
 *                 type: string
 *                 example: "coimbatore"
 *               state:
 *                 type: string
 *                 example: "Tamil nadu"
 *               country:
 *                 type: string
 *                 example: "india"
 *               about:
 *                 type: string
 *                 example: "looking for some freelancers"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Delete client profile
/**
 * @swagger
 * /api/client/deleteprofile:
 *   post:
 *     tags:
 *       - Client
 *     summary: Delete client profile
 *     description: Delete client profile with id.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update client profile
/**
 * @swagger
 * /api/client/updateprofile:
 *   post:
 *     tags:
 *       - Client
 *     summary: Update client profile
 *     description: Update client profile with required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: ""
 *               profile:
 *                 type: string
 *                 example: ""
 *               com_name:
 *                 type: string
 *                 example: ""
 *               com_type:
 *                 type: number
 *                 example: null
 *               com_size:
 *                 type: number
 *                 example: null
 *               com_site:
 *                 type: string
 *                 example: ""
 *               email:
 *                 type: string
 *                 example: ""
 *               phn_num:
 *                 type: string
 *                 example: ""
 *               c_code:
 *                 type: string
 *                 example: ""
 *               zip_code:
 *                 type: string
 *                 example: ""
 *               address:
 *                 type: string
 *                 example: ""
 *               city:
 *                 type: string
 *                 example: ""
 *               state:
 *                 type: string
 *                 example: ""
 *               country:
 *                 type: string
 *                 example: ""
 *               about:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Get client profile
/**
 * @swagger
 * /api/client/getprofile:
 *   post:
 *     tags:
 *       - Client
 *     summary: Get client profile details
 *     description: Get client profile details by passing user_id.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "USER_JNTOYP5UA8J7MQV"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

export {};
