import express from "express";
import UserController from "./user/UserController";

let self,
  router = new express.Router();

export default class Router {
  constructor(userController, orderController, itemController, swaggerSpec) {
    self = this;
    self.userController = userController;
    self.orderController = orderController;
    self.itemController = itemController;
    self.swaggerSpec = swaggerSpec;

    // const path = `/base`;
    // // console.log("http://{hostname}" + path);
    function loadSwagger(req, res) {
      res.setHeader('Content-Type', "application/json");
      res.send(swaggerSpec);
    }

    router.use(`/swagger`, loadSwagger);
    router.use(`/user`, self.userController.expressRouter);
    router.use(`/order`, self.orderController.expressRouter);
    router.use(`/item`, self.itemController.expressRouter);

    return router;
  }
}
