import { isArray } from "util";

let self;

export default class OrderService {
  constructor(orderRepository, itemRepository) {
    self = this;
    self.orderRepository = orderRepository;
    self.itemRepository = itemRepository;
  }

  createOrder(order) {
    return self.orderRepository
      .createOrder(order)
      .then(result => {
        return result;
      })
  }

  deleteOrderByOrderId(orderId) {
    return self.orderRepository
      .deleteOrderByOrderId(orderId)
      .then(result => {
        return result;
      })
  }

  updateOrderByOrderId(orderId, order) {
    return self.orderRepository
      .updateOrderByOrderId(orderId, order)
      .then(result => {
        return result;
      })
  }

  getOrdersByEmail(email) {
    return self.orderRepository
      .getOrdersByEmail(email)
      .then(result => {
        return result;
      })
  }


  getOrderItemsByOrderId(orderId) {
    return self.orderRepository
      .getOrderByOrderId(orderId)
      .then(result => {
        if (result && isArray(result.items)) {
          return self.itemRepository.getAllItems()
            .then(itemArray => {
              if (itemArray && isArray(itemArray)) {
                let tempArray = [];
                result.items.forEach((item) => {
                  let tempObj = itemArray.find((arrayItem) => arrayItem.id == item.id);
                  if (tempObj) {
                    tempArray.push(Object.assign({}, item, tempObj));
                  }
                })
                result.items = tempArray;
                delete result._id;
                return result;
              } else {
                return null;
              }
            })
        } else {
          return null;
        }
      })
  }
}
