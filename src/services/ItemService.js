let self;

export default class ItemService {
  constructor(itemRepository) {
    self = this;
    self.itemRepository = itemRepository;
  }

  createItem(order) {
    return self.itemRepository
      .createItem(order)
      .then(result => {
        return result;
      })
  }

  removeItemById(orderId) {
    return self.itemRepository
      .removeItemById(orderId)
      .then(result => {
        return result;
      })
  }

  updateItemById(orderId, order) {
    return self.itemRepository
      .updateItemById(orderId, order)
      .then(result => {
        return result;
      })
  }

  getItemById(email) {
    return self.itemRepository
      .getItemById(email)
      .then(result => {
        return result;
      })
  }

  getAllItems() {
    return self.itemRepository
      .getAllItems()
      .then(result => {
        return result;
      })
  }
}
