// #region Create client profile
/**
 * @swagger
 * /api/client/createprofile:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Create client profile
 *     description: create client profile with required fields.
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
 *                 example: sky
 *               profile:
 *                 type: string
 *                 example: "profileURL"
 *               com_name:
 *                 type: string
 *                 example: "skyraan"
 *               com_type:
 *                 type: number
 *                 example: 2
 *               com_size:
 *                 type: number
 *                 example: 1
 *               com_site:
 *                 type: string
 *                 example: "www.client.com"
 *               email:
 *                 type: string
 *                 example: "skyraan@gmail.com"
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
 *                 example: "fci road"
 *               city:
 *                 type: string
 *                 example: "coimbatore"
 *               state:
 *                 type: string
 *                 example: "Tamil nadu"
 *               country:
 *                 type: string
 *                 example: "india"
 *               lat:
 *                 type: string
 *                 example: "81.23342"
 *               lng:
 *                 type: string
 *                 example: "33.43223"
 *               about:
 *                 type: string
 *                 example: "looking for some freelancers"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Delete client profile
/**
 * @swagger
 * /api/client/deleteprofile:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Delete client profile
 *     description: Delete client profile with id.
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

// #region Update client profile
/**
 * @swagger
 * /api/client/updateprofile:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Update client profile
 *     description: Update client profile with required fields.
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
 *               name:
 *                 type: string
 *                 example: ""
 *               profile:
 *                 type: string
 *                 example: ""
 *               com_name:
 *                 type: string
 *                 example: ""
 *               com_type:
 *                 type: number
 *                 example: null
 *               com_size:
 *                 type: number
 *                 example: null
 *               com_site:
 *                 type: string
 *                 example: ""
 *               email:
 *                 type: string
 *                 example: ""
 *               phn_num:
 *                 type: string
 *                 example: ""
 *               c_code:
 *                 type: string
 *                 example: ""
 *               zip_code:
 *                 type: string
 *                 example: ""
 *               address:
 *                 type: string
 *                 example: ""
 *               city:
 *                 type: string
 *                 example: ""
 *               state:
 *                 type: string
 *                 example: ""
 *               country:
 *                 type: string
 *                 example: ""
 *               about:
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

// #region Get client profile
/**
 * @swagger
 * /api/client/getprofile:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Get client profile details
 *     description: Get client profile details by passing user_id.
 *
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update client password
/**
 * @swagger
 * /api/client/updatepwd:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Update client password
 *     description: Update client password with required fields.
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
 *                 example: "mypassword@123"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update client Credentials
/**
 * @swagger
 * /api/client/updatecredential:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Update client credentials
 *     description: Update client credentials with required fields.
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
 *                 example: "myclient@gmail.com"
 *               phn_num:
 *                 type: string
 *                 example: "9876543210"
 *               c_code:
 *                 type: string
 *                 example: "+80"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Update client Preference
/**
 * @swagger
 * /api/client/preference:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Update client notification preference
 *     description: Update client preferences with required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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

// #region Add save freelancer
/**
 * @swagger
 * /api/client/addsavefreelancer:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Save freelancer
 *     description: Save freelancer with required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               freelancer_id:
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

// #region update Unsave freelancer
/**
 * @swagger
 * /api/client/unsavefreelancer:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: UnSave freelancer
 *     description: UnSave freelancer with required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               freelancer_id:
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

// #region Get saved freelancers
/**
 * @swagger
 * /api/client/getsavedfreelancer:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Get saved freelancer
 *     description: Get saved freelancer with required fields.
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Add recently visited freelancer
/**
 * @swagger
 * /api/client/addrecentlyvisitfreelancer:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Add recently visited freelancer
 *     description: Add recently visited freelancer with required fields.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               freelancer_id:
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

// #region Get recently visited freelancers
/**
 * @swagger
 * /api/client/getrecentlyvisitfreelancer:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Get recently visited freelancer
 *     description: Get recently visited freelancer.
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Search Freelancer
/**
 * @swagger
 * /api/client/searchfreelancer:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Search freelancer
 *     description: Search freelancer.
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
 *               rating:
 *                 type: array
 *                 items:
 *                  type: integer
 *                 example: [5,4]
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

// #region Add rate freelancer
/**
 * @swagger
 * /api/client/addratefreelancer:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Add rate freelancer
 *     description: Add rate Freelancer rating and feedback.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               freelancer_id:
 *                 type: number
 *                 example: 2
 *               project_id:
 *                 type: number
 *                 example: 2
 *               rating:
 *                 type: number
 *                 example: 5
 *               review:
 *                 type: string
 *                 example: He did all good
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Get my projects
/**
 * @swagger
 * /api/client/getmyprojects:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Get my proejcts
 *     description: Get my projects.
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

// #region Invite to project
/**
 * @swagger
 * /api/client/invitetoproject:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Invite to project
 *     description: Invite to project.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: array
 *                 items:
 *                  type: integer
 *                 example: [1,2,3,4]
 *               freelancer_id:
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

// #region Get View freelancer profile
/**
 * @swagger
 * /api/client/viewfreelancerprofile:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Get and view freelancer profile
 *     description: Get and view freelancer profile.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               freelancer_id:
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

// #region Get View freelancer profile
/**
 * @swagger
 * /api/client/reportfreelancer:
 *   post:
 *     tags:
 *       - Client Profile
 *     summary: Report freelancer
 *     description: Report freelancer.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               freelancer_id:
 *                 type: number
 *                 example: 2
 *               reason_id:
 *                 type: number
 *                 example: 2
 *               reason:
 *                 type: string
 *                 example: not available
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// #endregion

export {};
