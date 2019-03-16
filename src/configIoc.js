//General
import * as awilix from "awilix";
import constants from "./utils/constants";
import express from "express";
import router from "./api/router";
import mongodb from "mongodb";
import swaggerJSDoc from "swagger-jsdoc"

//Controllers
import UserController from "./api/user/UserController";
import OrderController from "./api/order/OrderController";
import ItemController from "./api/item/ItemController";

//Services
import UserService from "./services/UserService";
import OrderService from "./services/OrderService";
import ItemService from "./services/ItemService";

//Repositoryconstructorconstructorconstructor
import UserRepository from "./repository/UserRepository";
import OrderRepository from "./repository/OrderRepository";
import ItemRepository from "./repository/ItemRepository";

let swaggerDefinition = {
  info: {
    description: "POS System",
    version: "1.0.0",
    title: "POS RESTful API Documentation",
  }
}

let options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['dist/api/**/*.js']
}

let swaggerSpec = swaggerJSDoc(options);

let container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC
});

container.register({
  // Register libraries
  express: awilix.asValue(express),
  router: awilix.asClass(router).singleton(),
  constants: awilix.asValue(constants),
  mongoClient: awilix.asValue(mongodb.MongoClient),
  swaggerSpec: awilix.asValue(swaggerSpec),

  // Register controllers
  userController: awilix.asClass(UserController).singleton(),
  orderController: awilix.asClass(OrderController).singleton(),
  itemController: awilix.asClass(ItemController).singleton(),

  // Register services
  userService: awilix.asClass(UserService).singleton(),
  orderService: awilix.asClass(OrderService).singleton(),
  itemService: awilix.asClass(ItemService).singleton(),

  // Register repository
  userRepository: awilix.asClass(UserRepository).singleton(),
  orderRepository: awilix.asClass(OrderRepository).singleton(),
  itemRepository: awilix.asClass(ItemRepository).singleton()
});

export default container;
