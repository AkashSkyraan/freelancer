// #region Request OTP
/**
 * @swagger
 * /api/auth/requestotp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Request OTP
 *     description: Sends an OTP to the user's email or phone number.
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
 *                 example: test@gmail.com
 *               phn_num:
 *                 type: string
 *                 example: "9876543210"
 *               c_code:
 *                 type: string
 *                 example: "+91"
 *
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

export {};
