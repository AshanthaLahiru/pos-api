let self;

export default class UserController {
  constructor(express, userService, constants, auth) {
    self = this;
    self.expressRouter = new express.Router();
    self.userService = userService;
    self.constants = constants;
    self.auth = auth;

    self.expressRouter.post("/", self.insertUser);
    self.expressRouter.put("/:email", self.updateUser);
    self.expressRouter.get("/:email", self.findUser);
    self.expressRouter.delete("/:email", self.removeUser);
    self.expressRouter.post("/login", self.loginUser);
  }

  /**
   * @swagger
   * /user/:
   *   post:
   *     tags:
   *       - User
   *     description: Add a new user
   *     parameters:  
   *       - name: user
   *         in: body
   *         required: true
   *         description: User
   *         schema:
   *           $ref: "#/definitions/UpdateUser"
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: Successfully created
   *         schema:
   *           type: object
   *           properties:
   *            status: 
   *              type: string
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: An unknown issue occurred
   */
  insertUser(req, res, next) {
    self.userService
      .insertUser(req.body)
      .then(result => {
        if (result) {
          res.status(201).json({ status: "Insert Successful" });
        } else {
          res.status(403).json({ status: "Insert Failed" });
        }
      })
      .catch(err => {
        return next(err);
      });
  }

  /**
  * @swagger
  * /user/{email}:
  *   get:
  *     tags:
  *       - User   
  *     security: 
  *       - Bearer: []
  *     description: Get user by email
  *     parameters:
  *       - name: email
  *         type: string
  *         in: path
  *         required: true
  *         description: Email of the user
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: User
  *         schema:
  *           $ref: "#/definitions/User"
  *       400:
  *         description: Bad Request
  *       401:
  *         description: Unauthorized
  *       500:
  *         description: An unknown issue occurred
  */
  findUser(req, res, next) {
    self.userService
      .findUser(req.params.email)
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(403).json({ status: "Find Failed" });
        }
      })
      .catch(err => {
        return next(err);
      });
  }

  /**
  * @swagger
  * /user/{email}:
  *   put:
  *     tags:
  *       - User   
  *     security: 
  *       - Bearer: []
  *     description: Get user by email
  *     parameters:
  *       - name: email
  *         type: string
  *         in: path
  *         required: true
  *         description: Email of the user
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: User
  *         schema:
  *           type: object
  *           properties:
  *            status: 
  *              type: string
  *       400:
  *         description: Bad Request
  *       401:
  *         description: Unauthorized
  *       500:
  *         description: An unknown issue occurred
  */
  updateUser(req, res, next) {
    self.userService
      .updateUser(req.params.email, req.body)
      .then(result => {
        if (result) {
          res.status(200).json({ status: "Update Successful" });
        } else {
          res.status(403).json({ status: "Update Failed" });
        }
      })
      .catch(err => {
        return next(err);
      });
  }

  /**
  * @swagger
  * /user/{email}:
  *   delete:
  *     tags:
  *       - User   
  *     security: 
  *       - Bearer: []
  *     description: Get user by email
  *     parameters:
  *       - name: email
  *         type: string
  *         in: path
  *         required: true
  *         description: Email of the user
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: User
  *         schema:
  *           type: object
  *           properties:
  *            status: 
  *              type: string
  *       400:
  *         description: Bad Request
  *       401:
  *         description: Unauthorized
  *       500:
  *         description: An unknown issue occurred
  */
  removeUser(req, res, next) {
    self.userService
      .removeUser(req.params.name)
      .then(result => {
        if (result) {
          res.status(200).json({ status: "Delete Successful" });
        } else {
          res.status(403).json({ status: "Delete Failed" });
        }
      })
      .catch(err => {
        return next(err);
      });
  }

  /**
  * @swagger
  * /user/login:
  *   post:
  *     tags:
  *       - User   
  *     description: Get user by email
  *     parameters:
  *       - name: credentials
  *         in: body
  *         description: Email of the user
  *         schema:
  *           type: object
  *           properties:
  *             email:
  *               type: string
  *               example: ashantha.lahiru@gmail.com
  *             password:
  *               type: string
  *               example: abc
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: User
  *         schema:
  *           type: object
  *           properties:
  *            token: 
  *              type: string
  *       400:
  *         description: Bad Request
  *       401:
  *         description: Unauthorized
  *       500:
  *         description: An unknown issue occurred
  */
  loginUser(req, res, next) {
    self.userService
      .loginUser(req.body)
      .then(result => {
        if (result instanceof Error) {
          throw result;
        }
        else if (result) {
          res.status(200).json(result);
        } else {
          res.status(403).json({ status: "Authentication Failed" });
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

/**
  * @swagger
  * definitions:
  *  User:
  *     properties:
  *       email:
  *         type: string
  *       name:
  *         type: string
  *
  *  UpdateUser:
  *     properties:
  *       email:
  *         type: string
  *       name:
  *         type: string
  *       password:
  *         type: string
  */
