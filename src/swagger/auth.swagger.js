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
 *               type:
 *                 type: number
 *                 example: 0
 *
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region verify OTP
/**
 * @swagger
 * /api/auth/verifyotp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify OTP
 *     description: Verify OTP sent to the user's email or phone number.
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
 *               otp:
 *                 type: string
 *                 example: "123456"
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
