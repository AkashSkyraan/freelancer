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
// #region Get Freelancer Profile Details
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

// UPDATE FREELACER PROFILE
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
 *               name:
 *                 type: string
 *                 example: "skyraan person"
 *               profile_pic:
 *                 type: string
 *                 example: "www.skyraan_person_pic"
 *               about:
 *                 type: string
 *                 example: "about skyraan person"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update Freelancer Position
/**
 * @swagger
 * /api/freelancer/updateposition:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Update freelancer position
 *     description: Update freelancer position.
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
 *               position_id:
 *                 type: number
 *                 example: 2
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

// #region Update Freelancer skills
/**
 * @swagger
 * /api/freelancer/updateskill:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Update freelancer skill
 *     description: Update freelancer skill.
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

// #region Update Freelancer Languages
/**
 * @swagger
 * /api/freelancer/updatelang:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Update freelancer languages
 *     description: Update freelancer languages.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               languages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     language_id:
 *                       type: integer
 *                       example: 2
 *                     proficiency_id:
 *                       type: integer
 *                       example: 2
 *                 example:
 *                    - id: 7
 *                      language_id: 1
 *                      proficiency_id: 2
 *                    - id: 8
 *                      language_id: 2
 *                      proficiency_id: 3
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Add Freelancer Languages
/**
 * @swagger
 * /api/freelancer/addlang:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Add freelancer languages
 *     description: Add freelancer languages.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update Freelancer address
/**
 * @swagger
 * /api/freelancer/updateaddress:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Update freelancer Address
 *     description: Update freelancer Address.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "fci road gannapathy"
 *               zip_code:
 *                 type: string
 *                 example: "641006"
 *               city:
 *                 type: string
 *                 example: "coimbatore"
 *               state:
 *                 type: string
 *                 example: "Tamil Nadu"
 *               country:
 *                 type: string
 *                 example: "India"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update Freelancer preference
/**
 * @swagger
 * /api/freelancer/preference:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Update freelancer Preference
 *     description: Update freelancer preference.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_available:
 *                 type: number
 *                 example: 1
 *               is_notification:
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

// #region Update Freelancer Password
/**
 * @swagger
 * /api/freelancer/updatepwd:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Update freelancer password
 *     description: Update freelancer password.
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

// #region Update Freelancer Credentials
/**
 * @swagger
 * /api/freelancer/updatecredential:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Update freelancer Credentials
 *     description: Update freelancer Credentials.
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
 *                 example: myskyraan@gmail.com
 *               phn_num:
 *                 type: string
 *                 example: 9874562233
 *               c_code:
 *                 type: string
 *                 example: +81
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Search Project
/**
 * @swagger
 * /api/freelancer/searchproject:
 *   post:
 *     tags:
 *       - Freelancer Profile
 *     summary: Search project
 *     description: Search project.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categories:
 *                 type: array
 *                 items:
 *                  type: integer
 *                 example: [1,2,3,4]
 *               experience:
 *                 type: array
 *                 items:
 *                  type: integer
 *                 example: [1,2,3,4]
 *               price:
 *                 type: array
 *                 items:
 *                  type: integer
 *                 example: [1,2,3,4]
 *               keyword:
 *                 type: string
 *                 example: react
 *               location:
 *                 type: string
 *                 example: coimbatore
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

export {};
