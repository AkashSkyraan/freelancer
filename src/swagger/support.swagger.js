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

// #region Get Recent Search
/**
 * @swagger
 * /api/support/recentsearch:
 *   post:
 *     tags:
 *       - Support
 *     summary: Get recent search
 *     description: Get recent search.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
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

// #region Delete Recent Search
/**
 * @swagger
 * /api/support/deleterecentsearch:
 *   post:
 *     tags:
 *       - Support
 *     summary: Delete recent search
 *     description: Delete recent search.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search_id:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1,2
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Get Trending Search
/**
 * @swagger
 * /api/support/gettrendsearch:
 *   post:
 *     tags:
 *       - Support
 *     summary: Get Trending search
 *     description: Get Trending search.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
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
