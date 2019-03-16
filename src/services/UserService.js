let self;

export default class UserService {
  constructor(constants, userRepository) {
    self = this;
    self.constants = constants;
    self.userRepository = userRepository;
  }

  insertUser(user) {
    return self.userRepository
      .insertUser(user)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  findUser(email) {
    return self.userRepository
      .findUser(email)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  updateUser(name, user) {
    return self.userRepository
      .updateUser(name, user)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  removeUser(name) {
    return self.userRepository
      .removeUser(name)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  loginUser(user) {
    console.log(user)
    return self.userRepository.findUser(user.email).then(result => {
      if (user && result && user.password && result.password && result.password == user.password) {
        return result;
      } else {
        return null;
      }
    });
  }
}
