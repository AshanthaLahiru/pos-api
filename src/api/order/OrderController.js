let self;

export default class OrderController {
  constructor(express, orderService, constants) {
    self = this;
    self.expressRouter = new express.Router();
    self.orderService = orderService;
    self.constants = constants;

    self.expressRouter.post("/", self.createOrder);
    self.expressRouter.put("/:email", self.updateOrderByOrderId);
    self.expressRouter.get("/:email", self.getOrdersByEmail);
    self.expressRouter.delete("/:email", self.removeOrderByOrderId);
  }

  createOrder(req, res, next) {
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

  getOrdersByEmail(req, res, next) {
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

  updateOrderByOrderId(req, res, next) {
    self.orderService
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

  removeOrderByOrderId(req, res, next) {
    self.orderService
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
}
