import BaseRepository from "./BaseRepository";

let self, schema;

export default class OrderRepository extends BaseRepository {
  constructor(constants, mongoClient) {
    super(constants, mongoClient, "order");
    self = this;
    self.constants = constants;
  }

  createOrder(order) {
    return self
      ._insert(order)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  getOrdersByEmail(email) {
    let query = {
      email: email
    };

    return self
      ._find(query)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  updateOrderByOrderId(email, updateOrder) {
    let query = {
      email: email
    };

    return self
      ._update(query, updateOrder)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  deleteOrderByOrderId(orderId) {
    let deleteOrder = {
      orderId
    };

    return self
      ._remove(deleteOrder)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
