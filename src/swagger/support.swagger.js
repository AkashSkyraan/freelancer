// #region Check Freelancer Password
/**
 * @swagger
 * /api/support/checkpwd:
 *   post:
 *     tags:
 *       - Support
 *     summary: Check freelancer password
 *     description: Check freelancer password.
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
 *                 example: password@123
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

export {};
