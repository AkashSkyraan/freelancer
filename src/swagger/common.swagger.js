/**
 * @swagger
 * components:
 *   responses:
 *
 *     SuccessResponse:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *                 example: 200
 *               success:
 *                 type: integer
 *                 example: 1
 *               message:
 *                 type: string
 *                 example: successfull response
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *               error:
 *                 type: string
 *                 example: ""
 *
 *     BadRequest:
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *                 example: 0
 *               message:
 *                 type: string
 *                 example: Invalid request
 *               data:
 *                 type: array
 *                 example: []
 *               error:
 *                 type: string
 *                 example: Validation failed
 *
 *     Unauthorized:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *                 example: 0
 *               message:
 *                 type: string
 *                 example: Unauthorized
 *               data:
 *                 type: array
 *                 example: []
 *               error:
 *                 type: string
 *                 example: Invalid token
 *
 *     InternalServerError:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *                 example: 500
 *               success:
 *                 type: integer
 *                 example: 0
 *               message:
 *                 type: string
 *                 example: Something went wrong
 *               data:
 *                 type: array
 *                 example: []
 *               error:
 *                 type: string
 *                 example: Internal Server Error
 */

export {};
