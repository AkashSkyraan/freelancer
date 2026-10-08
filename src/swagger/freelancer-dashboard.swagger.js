// #region Get my project counts
/**
 * @swagger
 * /api/fdash/getmyprojectscount:
 *   post:
 *     tags:
 *       - Freelancer Dashboard
 *     summary: Get my project counts
 *     description: Get my project counts.
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Get project status wsie
/**
 * @swagger
 * /api/fdash/getprojects:
 *   post:
 *     tags:
 *       - Freelancer Dashboard
 *     summary: Get projects status wise
 *     description: Get project status wise.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: opened
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Get project Details and freelancer details status wsie
/**
 * @swagger
 * /api/fdash/getprojectsdetails:
 *   post:
 *     tags:
 *       - Freelancer Dashboard
 *     summary: Get projects details and freelancer list by status wise
 *     description: Get project details and freelancer list by status wise.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: number
 *                 example: 7
 *               status:
 *                 type: string
 *                 example: pending
 *               init_by:
 *                 type: string
 *                 example: FREELANCER
 *               is_pinned:
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

// #region Get project Details and freelancer details status wsie
/**
 * @swagger
 * /api/fdash/rejectproject:
 *   post:
 *     tags:
 *       - Freelancer Dashboard
 *     summary: Reject freelancer project interest or remove freelancer from project
 *     description: Reject freelancer project interest or remove freelancer from project
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
 *               reason:
 *                 type: string
 *                 example: fake qualifications
 *               type:
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
{
}
