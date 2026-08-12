// #region Create client profile
/**
 * @swagger
 * /api/client/createprofile:
 *   post:
 *     tags:
 *       - Client Profile
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
 *               lat:
 *                 type: string
 *                 example: "81.23342"
 *               lng:
 *                 type: string
 *                 example: "33.43223"
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
 *       - Client Profile
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
 *       - Client Profile
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
 *       - Client Profile
 *     summary: Get client profile details
 *     description: Get client profile details by passing user_id.
 *
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update client password
/**
 * @swagger
 * /api/client/updatepwd:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Update client password
 *     description: Update client password with required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "mypassword@123"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update client Credentials
/**
 * @swagger
 * /api/client/updatecredential:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Update client credentials
 *     description: Update client credentials with required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "myclient@gmail.com"
 *               phn_num:
 *                 type: string
 *                 example: "9876543210"
 *               c_code:
 *                 type: string
 *                 example: "+80"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update client Preference
/**
 * @swagger
 * /api/client/preference:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Update client notification preference
 *     description: Update client preferences with required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_notification:
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

export {};
