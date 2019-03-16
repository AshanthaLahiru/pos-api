let self

import BaseRepository from "./BaseRepository";

export default class UserRepository extends BaseRepository {
  constructor(constants, mongoClient) {
    super(constants, mongoClient, "user");
    self = this;
    self.constants = constants;
  }

  insertUser(user) {
    return self
      ._insert(user)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  findUser(email) {
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

  updateUser(email, updateUser) {
    let query = {
      email: email
    };

    return self
      ._update(query, updateUser)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  removeUser(name) {
    let deleteUser = {
      name: name
    };

    return self
      ._remove(deleteUser, schema)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
