// #region Get Common master Dropdown
/**
 * @swagger
 * /api/dropdowns/getlookup:
 *   post:
 *     tags:
 *       - Master Dropdown
 *     summary: To get dropdown for specific category
 *     description: select and pass the category in body.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: "industry_type"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Add Common master Dropdown
/**
 * @swagger
 * /api/dropdowns/addlookup:
 *   post:
 *     tags:
 *       - Master Dropdown
 *     summary: To add dropdown for specific category
 *     description: select and pass the required fields in the body.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: "industry_type"
 *               value:
 *                 type: string
 *                 example: "admin_support"
 *               icon:
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

// #region Update Common master Dropdown
/**
 * @swagger
 * /api/dropdowns/updatelookup:
 *   post:
 *     tags:
 *       - Master Dropdown
 *     summary: To update dropdown for specific category
 *     description: select and pass the id and required fields in the body.
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
 *               value:
 *                 type: string
 *                 example: "admin_support"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Delete Common master Dropdown
/**
 * @swagger
 * /api/dropdowns/deletelookup:
 *   post:
 *     tags:
 *       - Master Dropdown
 *     summary: To delete dropdown for specific category
 *     description: pass the id.
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

export {};
