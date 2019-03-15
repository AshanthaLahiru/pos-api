let self;

export default class UserController {
  constructor(express, userService, constants) {
    self = this;
    self.expressRouter = new express.Router();
    self.userService = userService;
    self.constants = constants;

    self.expressRouter.post("/", self.insertUser);
    self.expressRouter.put("/:email", self.updateUser);
    self.expressRouter.get("/:email", self.findUser);
    self.expressRouter.delete("/:email", self.removeUser);
    self.expressRouter.post("/login", self.loginUser);
  }

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

  findUser(req, res, next) {
    self.userService
      .findUser(req.params.email)
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(403).json({ status: "Fined Failed" });
        }
      })
      .catch(err => {
        return next(err);
      });
  }

  updateUser(req, res, next) {
    self.userService
      .updateUser(req.params.name, req.body)
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

  loginUser(req, res, next) {
    self.userService
      .loginUser(req.body)
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(403).json({ status: "Authentication Failed" });
        }
      })
      .catch(err => {
        return next(err);
      });
  }
}
