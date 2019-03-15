import express from "express";
import UserController from "./user/UserController";

let self,
  router = new express.Router();

export default class Router {
  constructor(userController, orderController, itemController) {
    self = this;
    self.userController = userController;
    self.orderController = orderController;
    self.itemController = itemController;

    // const path = `/base`;
    // // console.log("http://{hostname}" + path);

    router.use(`/user`, self.userController.expressRouter);
    router.use(`/order`, self.orderController.expressRouter);
    router.use(`/item`, self.itemController.expressRouter);

    return router;
  }
}
