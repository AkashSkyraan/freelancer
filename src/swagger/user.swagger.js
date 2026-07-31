// #region Create client profile
/**
 * @swagger
 * /api/user/createcprofile:
 *   post:
 *     tags:
 *       - User
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
 *                 example: USER_JNTOYP5UA8J7MQV
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
 *                 type: string
 *                 example: "IT"
 *               com_size:
 *                 type: string
 *                 example: "CLIENT"
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
 *                 example: 641006"
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

export {};
