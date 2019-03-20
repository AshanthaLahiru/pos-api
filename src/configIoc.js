//General
import * as awilix from "awilix";
import constants from "./utils/constants";
import express from "express";
import router from "./api/router";
import swaggerJSDoc from "swagger-jsdoc"
import njwt from "njwt"
import passwordHash from "password-hash"
import MongoClient from "./utils/MongoClient"

//Middlewares
import AuthorizationMW from "./middleware/AuthorizationMW"

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
    title: "POS RESTful API Documentation"
  },
  host: 'localhost:3000',
  schemes: ['http'],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
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
  mongoClient: awilix.asClass(MongoClient).singleton(),
  swaggerSpec: awilix.asValue(swaggerSpec),
  jwt: awilix.asValue(njwt),
  hash: awilix.asValue(passwordHash),

  //Middleware
  auth: awilix.asClass(AuthorizationMW).singleton(),

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
