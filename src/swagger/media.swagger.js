// #region Upload image
/**
 * @swagger
 * /api/media/upload-image:
 *   post:
 *     tags:
 *       - Media
 *     summary: To upload image only
 *     description: upload media supported png, jpeg, webp.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: array
 *                 items:
 *                  type: string
 *                  format: binary
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Upload image
/**
 * @swagger
 * /api/media/upload-video:
 *   post:
 *     tags:
 *       - Media
 *     summary: To upload video only
 *     description: upload media supported mp4, mkv, mov, webm.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: array
 *                 items:
 *                  type: string
 *                  format: binary
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Upload image
/**
 * @swagger
 * /api/media/upload-doc:
 *   post:
 *     tags:
 *       - Media
 *     summary: To upload document
 *     description: upload media supported pdf, msword.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: array
 *                 items:
 *                  type: string
 *                  format: binary
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

export {};
