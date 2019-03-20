let self;

export default class ItemController {
  constructor(express, itemService, constants) {
    self = this;
    self.expressRouter = new express.Router();
    self.itemService = itemService;
    self.constants = constants;

    self.expressRouter.post("/", self.createItem);
    self.expressRouter.put("/:itemId", self.updateItemById);
    self.expressRouter.get("/:itemId", self.getItemById);
    self.expressRouter.get("/", self.getAllItems);
    self.expressRouter.delete("/:itemId", self.removeItemById);
  }

  /**
   * @swagger
   * /item/:
   *   post:
   *     tags:
   *       - Item
   *     security: 
   *       - Bearer: []
   *     description: Create an item
   *     parameters:
   *       - name: item
   *         in: body
   *         required: true
   *         description: Order
   *         schema:
   *           $ref: "#/definitions/Item"
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
  createItem(req, res, next) {
    self.itemService
      .createItem(req.body)
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
   * /item/{itemId}:
   *   get:
   *     tags:
   *       - Item
   *     security: 
   *       - Bearer: []
   *     description: Get the item by itemId
   *     parameters:
   *       - name: itemId
   *         in: path
   *         required: true
   *         description: Item ID
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Retrieve Successful
   *         schema:
   *           $ref: "#/definitions/Item"
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: An unknown issue occurred
   */
  getItemById(req, res, next) {
    self.itemService
      .getItemById(req.params.id)
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
   * /item/{itemId}:
   *   put:
   *     tags:
   *       - Item
   *     security: 
   *       - Bearer: []
   *     description: Update the item by itemId
   *     parameters:
   *       - name: itemId
   *         in: path
   *         required: true
   *         description: Item ID
   *         type: string
   *       - name: item
   *         in: body
   *         required: true
   *         description: Item 
   *         schema:
   *           $ref: "#/definitions/Item"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Update Successful
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
  updateItemById(req, res, next) {
    self.itemService
      .updateOrderByOrderId(req.params.name, req.body)
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
 * /item/{itemId}:
 *   delete:
 *     tags:
 *       - Item
 *     security: 
 *       - Bearer: []
 *     description: Delete the item by itemId
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: Item ID
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Delete Successful
 *         schema:
 *           $ref: "#/definitions/Item"
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: An unknown issue occurred
 */
  removeItemById(req, res, next) {
    self.itemService
      .removeOrderByOrderId(req.params.name)
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
   * /item/:
   *   get:
   *     tags:
   *       - Item
   *     security: 
   *       - Bearer: []
   *     description: Get all items
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Retrieve Successful
   *         schema:
   *           type: array
   *           items:
   *            $ref: "#/definitions/Item"
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: An unknown issue occurred
   */
  getAllItems(req, res, next) {
    self.itemService
      .getAllItems(req.params.id)
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
}

/**
  * @swagger
  * definitions:
  *  Item:
  *     properties:
  *       id:
  *         type: string
  *       name:
  *         type: string
  *       description:
  *         type: string
  *       price:
  *         type: string
  */
