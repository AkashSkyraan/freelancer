// FREELANCER ONBORADING FORM
// #region Create Freelancer Profile
/**
 * @swagger
 * /api/freelancer/createprofile:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: create freelancer profile
 *     description: Create freelancer profile form 1.
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
 *                 example: "akash"
 *               profile_pic:
 *                 type: string
 *                 example: "www.google.com"
 *               email:
 *                 type: string
 *                 example: "test12@gmail.com"
 *               phn_num:
 *                 type: string
 *                 example: "9876543210"
 *               c_code:
 *                 type: string
 *                 example: "+91"
 *               zip_code:
 *                 type: string
 *                 example: "641006"
 *               address:
 *                 type: string
 *                 example: "d.no 3 fci road, ganapathy"
 *               city:
 *                 type: string
 *                 example: "coimbatore"
 *               state:
 *                 type: string
 *                 example: "tamil nadu"
 *               country:
 *                 type: string
 *                 example: "india"
 *               about:
 *                 type: string
 *                 example: "this is about me"
 *               languages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     language_id:
 *                       type: integer
 *                       example: 2
 *                     proficiency_id:
 *                       type: integer
 *                       example: 2
 *                 example:
 *                    - language_id: 1
 *                      proficiency_id: 2
 *                    - language_id: 2
 *                      proficiency_id: 3
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Create Freelancer Profile Position
/**
 * @swagger
 * /api/freelancer/createposition:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: create freelancer profile Position - Form setp 2
 *     description: Create freelancer profile position in form step-2.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position_id:
 *                 type: number
 *                 example: 1
 *               experience_id:
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

// #region Create Freelancer Profile categories and services
/**
 * @swagger
 * /api/freelancer/createservice:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: create freelancer profile Categories and Services - Form setp 3
 *     description: Create freelancer profile Categories and Services in form step-3.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_id:
 *                 type: array
 *                 items:
 *                    type: number
 *                    example: 2, 13, 24
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Create Freelancer Profile Skills
/**
 * @swagger
 * /api/freelancer/createskill:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: create freelancer profile skills - Form setp 4
 *     description: Create freelancer profile Skills in form step-4.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skill_id:
 *                 type: array
 *                 items:
 *                    type: number
 *                    example: 2, 13, 24, 2, 3, 10
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update Freelancer Profile
/**
 * @swagger
 * /api/freelancer/updateprofile:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Update freelancer profile
 *     description: Update freelancer profile.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "USER_JNTOYP5UA8J7MQV"
 *               skill_id:
 *                 type: array
 *                 items:
 *                    type: number
 *                    example: 2, 13, 24, 2, 3, 10
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

//EDUCATION
// #region Create Freelancer Profile education
/**
 * @swagger
 * /api/freelancer/createeducation:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: create freelancer profile education
 *     description: create freelancer education.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course:
 *                 type: string
 *                 example: "Computer science"
 *               start_month:
 *                 type: number
 *                 example: 6
 *               start_year:
 *                 type: number
 *                 example: 2020
 *               end_month:
 *                 type: number
 *                 example: 4
 *               end_year:
 *                 type: number
 *                 example: 2024
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update Freelancer Profile education
/**
 * @swagger
 * /api/freelancer/updateeducation:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Update freelancer profile education
 *     description: Update freelancer education.
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
 *               course:
 *                 type: string
 *                 example: "Computer science"
 *               start_month:
 *                 type: number
 *                 example: 6
 *               start_year:
 *                 type: number
 *                 example: 2020
 *               end_month:
 *                 type: number
 *                 example: 4
 *               end_year:
 *                 type: number
 *                 example: 2024
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Delete Freelancer Profile education
/**
 * @swagger
 * /api/freelancer/deleteeducation:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Delete freelancer profile education
 *     description: Delete freelancer education.
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

// WORK EXPERIENCE
// #region Create Freelancer Profile Work experience
/**
 * @swagger
 * /api/freelancer/creatework:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: create freelancer profile Work experience
 *     description: create freelancer Work experience.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_role:
 *                 type: string
 *                 example: "Computer science"
 *               start_month:
 *                 type: number
 *                 example: 6
 *               start_year:
 *                 type: number
 *                 example: 2020
 *               end_month:
 *                 type: number
 *                 example: 4
 *               end_year:
 *                 type: number
 *                 example: 2024
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region update Freelancer Profile Work experience
/**
 * @swagger
 * /api/freelancer/updatework:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: update freelancer profile Work experience
 *     description: update freelancer Work experience.
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
 *               job_role:
 *                 type: string
 *                 example: "Computer science"
 *               start_month:
 *                 type: number
 *                 example: 6
 *               start_year:
 *                 type: number
 *                 example: 2020
 *               end_month:
 *                 type: number
 *                 example: 4
 *               end_year:
 *                 type: number
 *                 example: 2024
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Delete Freelancer Profile education
/**
 * @swagger
 * /api/freelancer/deletework:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Delete freelancer profile Work experience
 *     description: Delete freelancer Work experience.
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

//GET FREELANCER PROFILE DETAILS
// #region Delete Freelancer Profile education
/**
 * @swagger
 * /api/freelancer/getprofile:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Get freelancer profile
 *     description: get freelancer profile.
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
