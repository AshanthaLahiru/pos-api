import { isArray } from "util";

let self;

export default class OrderService {
  constructor(constants, userRepository, orderRepository, itemRepository) {
    self = this;
    self.constants = constants;
    self.orderRepository = orderRepository;
    self.itemRepository = itemRepository;
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


  getOrderItemsByOrderId(orderId) {
    return self.orderRepository
      .getOrderByOrderId(orderId)
      .then(result => {
        if (result && isArray(result.items)) {
          return self.itemRepository.getAllItems()
            .then(itemArray => {
              if (itemArray && isArray(itemArray)) {
                result.items.map((item) => {
                  let tempObj = itemArray.find((arrayItem) => arrayItem.id == item.id);
                  if (tempObj) {
                    Object.assign(item, tempObj);
                  }
                })
                delete result._id;
                return result;
              }
            })
        }
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
