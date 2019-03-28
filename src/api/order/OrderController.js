let self;

export default class OrderController {
  constructor(express, orderService, constants, auth) {
    self = this;
    self.expressRouter = new express.Router();
    self.orderService = orderService;
    self.constants = constants;
    self.auth = auth;

    self.expressRouter.post("/", self.auth.verifyToken, self.createOrder);
    self.expressRouter.put("/:orderId", self.auth.verifyToken, self.updateOrderByOrderId);
    self.expressRouter.get("/user/:email", self.auth.verifyToken, self.getOrdersByEmail);
    self.expressRouter.get("/:orderId/items", self.auth.verifyToken, self.getOrderItemsByOrderId);
    self.expressRouter.delete("/:orderId", self.auth.verifyToken, self.removeOrderByOrderId);
  }

  /**
   * @swagger
   * /order/:
   *   post:
   *     tags:
   *       - Order
   *     security: 
   *       - Bearer: []
   *     description: Create an order
   *     parameters:
   *       - name: order
   *         in: body
   *         required: true
   *         description: Order
   *         schema:
   *           $ref: "#/definitions/Order"
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
  createOrder(req, res, next) {
    if (!req.body) {
      throw new Error("Missing Body Parameteres");
    }

    self.orderService
      .createOrder(req.body)
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
   * /order/user/{email}:
   *   get:
   *     tags:
   *       - Order
   *     security: 
   *       - Bearer: []
   *     description: Get orders by email
   *     parameters:
   *       - name: email
   *         in: path
   *         type: string
   *         required: true
   *         description: Email of the user
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Retrieve successful
   *         schema:
   *          $ref: "#/definitions/Order"
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: An unknown issue occurred
   */
  getOrdersByEmail(req, res, next) {
    if (!req.params.email) {
      throw new Error("Missing Parameters");
    }

    self.orderService
      .getOrdersByEmail(req.params.email)
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
   * /order/{orderId}/items:
   *   get:
   *     tags:
   *       - Order
   *     security: 
   *       - Bearer: []
   *     description: Get orders by email
   *     parameters:
   *       - name: orderId
   *         in: path
   *         type: string
   *         required: true
   *         description: ID of the order
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Retrieve successful    
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: An unknown issue occurred
   */
  getOrderItemsByOrderId(req, res, next) {
    if (!req.params.orderId) {
      throw new Error("Missing Parameters");
    }

    self.orderService
      .getOrderItemsByOrderId(req.params.orderId)
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
   * /order/{orderId}:
   *   delete:
   *     tags:
   *       - Order
   *     security: 
   *       - Bearer: []
   *     description: Delete an order
   *     parameters:
   *       - name: orderId
   *         in: path
   *         type: string
   *         required: true
   *         description: Order ID
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successfully deleted
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
  removeOrderByOrderId(req, res, next) {
    if (!req.params.orderId) {
      throw new Error("Missing Parameters");
    }

    self.orderService
      .removeOrderByOrderId(req.params.orderId)
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
  * /order/{orderId}:
  *   put:
  *     tags:
  *       - Order
  *     security: 
  *       - Bearer: []
  *     description: Update a new order
  *     parameters:
  *       - name: orderId
  *         in: path
  *         type: string
  *         required: true
  *         description: Order ID
  *       - name: order
  *         in: body
  *         required: true
  *         description: Order
  *         schema:
  *           $ref: "#/definitions/Order"
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: Successfully updated
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
  updateOrderByOrderId(req, res, next) {
    if (!req.params.orderId) {
      throw new Error("Missing Parameters");
    }

    if (!req.body) {
      throw new Error("Missing Body Parameters");
    }

    self.orderService
      .updateOrderByOrderId(req.params.orderId, req.body)
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
}

/**
  * @swagger
  * definitions:
  *  Order:
  *     properties:
  *       email:
  *         type: string
  *       items:
  *         type: array
  */
