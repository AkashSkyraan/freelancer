// #region Create Freelancer Profile
/**
 * @swagger
 * /api/freelancer/createProfile:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: create freelancer profile
 *     description: Create freelancer profile form 1.
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
 *                 example: "akash"
 *               profile_pic:
 *                 type: string
 *                 example: "www.google.com"
 *               email:
 *                 type: string
 *                 example: "test12@gmail.com"
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
 *                 example: "d.no 3 fci road, ganapathy"
 *               city:
 *                 type: string
 *                 example: "coimbatore"
 *               state:
 *                 type: string
 *                 example: "tamil nadu"
 *               country:
 *                 type: string
 *                 example: "india"
 *               about:
 *                 type: string
 *                 example: "this is about me"
 *               languages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     language_id:
 *                       type: integer
 *                       example: 2
 *                     proficiency_id:
 *                       type: integer
 *                       example: 2
 *                 example:
 *                    - language_id: 1
 *                      proficiency_id: 2
 *                    - language_id: 2
 *                      proficiency_id: 3
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

export {};
