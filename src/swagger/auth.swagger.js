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
 *                 example: test12@gmail.com
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
 *                 example: test12@gmail.com
 *               phn_num:
 *                 type: string
 *                 example: "9876543210"
 *               c_code:
 *                 type: string
 *                 example: "+91"
 *               otp:
 *                 type: string
 *                 example: "123456"
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

// #region SignUp User
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User Signup
 *     description: Signup using email and password.
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
 *                 example: test12@gmail.com
 *               password:
 *                 type: string
 *                 example: "password@123"
 *               role:
 *                 type: string
 *                 example: "CLIENT"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Login User
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     description: login using email and password.
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
 *                 example: test12@gmail.com
 *               password:
 *                 type: string
 *                 example: "password@123"
 *               role:
 *                 type: string
 *                 example: "CLIENT"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Login User
/**
 * @swagger
 * /api/auth/forgot-pwd:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User forgot password
 *     description: Forgot password change.
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
 *                 example: test12@gmail.com
 *               password:
 *                 type: string
 *                 example: "password@123"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

export {};
