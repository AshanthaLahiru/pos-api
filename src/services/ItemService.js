let self;

export default class ItemService {
  constructor(constants, userRepository, orderRepository, itemRepository) {
    self = this;
    self.constants = constants;
    self.orderRepository = orderRepository;
    self.itemRepository = itemRepository;
  }

  createItem(order) {
    return self.itemRepository
      .createItem(order)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  removeItemById(orderId) {
    return self.itemRepository
      .removeItemById(orderId)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  updateItemById(orderId, order) {
    return self.itemRepository
      .updateItemById(orderId, order)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  getItemById(email) {
    return self.itemRepository
      .getItemById(email)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
