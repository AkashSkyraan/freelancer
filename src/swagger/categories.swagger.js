// #region Add categories
/**
 * @swagger
 * /api/category/addcategory:
 *   post:
 *     tags:
 *       - Category and Subcategory
 *     summary: Add category and sub category
 *     description: Add category and sub category by passing required fields.
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
 *                 example: "ui and ux"
 *               icon:
 *                 type: string
 *                 example: ""
 *               parent_id:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Delete categories
/**
 * @swagger
 * /api/category/deletecategory:
 *   post:
 *     tags:
 *       - Category and Subcategory
 *     summary: Delete category and sub category
 *     description: Delete category and sub category by id.
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

// #region Get categories
/**
 * @swagger
 * /api/category/getcategory:
 *   post:
 *     tags:
 *       - Category and Subcategory
 *     summary: Get category and sub category
 *     description: Get category and sub category by passing required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parent_id:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Get categories
/**
 * @swagger
 * /api/category/updatecategory:
 *   post:
 *     tags:
 *       - Category and Subcategory
 *     summary: Update category and sub category
 *     description: Update category and sub category by passing id.
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
 *                 example: 7
 *               name:
 *                 type: string
 *                 example: "ui and ux"
 *               icon:
 *                 type: string
 *                 example: ""
 *               parent_id:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

export {};
