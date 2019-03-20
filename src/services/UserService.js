let self;

export default class UserService {
  constructor(constants, userRepository, jwt, hash) {
    self = this;
    self.constants = constants;
    self.userRepository = userRepository;
    self.jwt = jwt;
    self.hash = hash;
  }

  insertUser(user) {
    return self.userRepository
      .findUser(user.email)
      .then(result_user => {
        if (!result_user) {
          let password = user.password;
          user['password'] = self.hash.generate(password);
          return self.userRepository
            .insertUser(user)
            .then(result => {
              return result;
            })
        } else {
          return null;
        }
      })
      .catch(err => {
        return err;
      })
  }

  findUser(email) {
    return self.userRepository
      .findUser(email)
      .then(result => {
        return result;
      })
      .catch(err => {
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
        return err;
      });
  }

  loginUser(user) {
    return self.userRepository.findUser(user.email).then(result => {
      if (user && result && user.password && result.password && self.hash.verify(user.password, result.password)) {
        let claims = {
          sub: user.email,
          iss: 'pos',
          permissions: 'user'
        }

        let jwtToken = self.jwt.create(claims, self.constants.jwtSecretKey).compact();
        result['auth-token'] = jwtToken;

        return result;
      } else {
        return null;
      }
    }).catch(err => {
      return err;
    });
  }
}
