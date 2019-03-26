let self;

import BaseRepository from "./BaseRepository";

export default class ItemRepository extends BaseRepository {
  constructor(constants, mongoClient) {
    super(constants, mongoClient, "item");
    self = this;
    self.constants = constants;
  }

  createItem(item) {
    return self
      ._insert(item)
      .then(result => {
        if (result && result.result.ok == 1) {
          let res = {
            status: "success"
          }
          return res;
        } else {
          return null;
        }
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  getItemById(id) {
    let query = {
      id
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

  getAllItems() {
    let query = {
    };

    return self
      ._findAll(query)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  updateItemById(id, updateItem) {
    let query = {
      id
    };

    return self
      ._update(query, updateItem)
      .then(result => {
        if (result && result.result.ok == 1) {
          let res = {
            status: "success"
          }
          return res;
        } else {
          return null;
        }
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  removeItemById(id) {
    let deleteOrder = {
      id
    };

    return self
      ._remove(deleteOrder)
      .then(result => {
        if (result && result.result.ok == 1) {
          let res = {
            status: "success"
          }
          return res;
        } else {
          return null;
        }
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
