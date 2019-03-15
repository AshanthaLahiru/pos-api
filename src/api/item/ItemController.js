let self;

export default class ItemController {
  constructor(express, itemService, constants) {
    self = this;
    self.expressRouter = new express.Router();
    self.itemService = itemService;
    self.constants = constants;

    self.expressRouter.post("/", self.createItem);
    self.expressRouter.put("/:id", self.updateItemById);
    self.expressRouter.get("/:id", self.getItemById);
    self.expressRouter.delete("/:email", self.removeItemById);
  }

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
}
