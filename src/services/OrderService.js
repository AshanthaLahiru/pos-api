let self;

export default class OrderService {
  constructor(constants, userRepository, orderRepository) {
    self = this;
    self.constants = constants;
    self.orderRepository = orderRepository;
  }

  createOrder(order) {
    return self.orderRepository
      .createOrder(order)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  deleteOrderByOrderId(orderId) {
    return self.orderRepository
      .deleteOrderByOrderId(orderId)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  updateOrderByOrderId(orderId, order) {
    return self.orderRepository
      .updateOrderByOrderId(orderId, order)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  getOrdersByEmail(email) {
    return self.orderRepository
      .getOrdersByEmail(email)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
