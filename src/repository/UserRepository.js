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
        if (result.result.ok == 1) {
          let res = {
            status: "success"
          }
          return res;
        }
        else {
          return null;
        }
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  findUser(email) {
    let query = {
      email: email
    };

    return self
      ._find(query)
      .then(result => {
        if (result) {
          return result;
        } else {
          return null;
        }
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  updateUser(email, updateUser) {
    let query = {
      email: email
    };

    return self
      ._update(query, updateUser)
      .then(result => {
        if (result.result.ok == 1) {
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
        return null;
      });
  }

  removeUser(email) {
    let deleteUser = {
      name: email
    };

    return self
      ._remove(deleteUser)
      .then(result => {
        if (result.result.ok == 1) {
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
        return null;
      });
  }
}
