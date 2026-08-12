// #region Create and post project
/**
 * @swagger
 * /api/project/createproject:
 *   post:
 *     tags:
 *       - Project
 *     summary: Create and post project
 *     description: create  and post project with required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "new project"
 *               description:
 *                 type: string
 *                 example: "new project for schools and colleges"
 *               skills :
 *                 type: string
 *                 example: "1,2,3"
 *               talent_role:
 *                 type: number
 *                 example: 2
 *               duration:
 *                 type: number
 *                 example: 1
 *               duration_type:
 *                 type: string
 *                 example: "week"
 *               experience:
 *                 type: number
 *                 example: 1
 *               price:
 *                 type: number
 *                 example: 10000
 *               price_type:
 *                 type: number
 *                 example: 2
 *               open_position:
 *                 type: number
 *                 example: 06
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Delete project
/**
 * @swagger
 * /api/project/deleteproject:
 *   post:
 *     tags:
 *       - Project
 *     summary: Delete project
 *     description: Delete project by passing id.
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
 *                 example: 2
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Get Individual project
/**
 * @swagger
 * /api/project/getsoloproject:
 *   post:
 *     tags:
 *       - Project
 *     summary: Get individual project
 *     description: Get individual project by passing id.
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
 *                 example: 2
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update project
/**
 * @swagger
 * /api/project/updateproject:
 *   post:
 *     tags:
 *       - Project
 *     summary: Update project
 *     description: Update project with required fields.
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
 *               title:
 *                 type: string
 *                 example: "new project"
 *               description:
 *                 type: string
 *                 example: "new project for schools and colleges"
 *               skills :
 *                 type: string
 *                 example: "1,2,3"
 *               talent_role:
 *                 type: number
 *                 example: 2
 *               duration:
 *                 type: number
 *                 example: 1
 *               duration_type:
 *                 type: string
 *                 example: "week"
 *               experience:
 *                 type: number
 *                 example: 1
 *               price:
 *                 type: number
 *                 example: 10000
 *               price_type:
 *                 type: string
 *                 example: "fixed"
 *               open_position:
 *                 type: number
 *                 example: 06
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

export {};
