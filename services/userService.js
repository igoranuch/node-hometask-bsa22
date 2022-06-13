const { UserRepository } = require("../repositories/userRepository");

class UserService {
  // TODO: Implement methods to work with user

  create(userParams) {
    const { email, phoneNumber } = userParams;

    if (!!this.search({ email }) || !!this.search({ phoneNumber })) {
      throw new Error("User with such phone number or email already exists");
    }
    const user = UserRepository.create(userParams);
    return user;
  }

  getAll() {
    const users = UserRepository.getAll();
    return users;
  }

  getById(id) {
    const user = this.search({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  update(id, newData) {
    if (!this.search({ id })) {
      throw new Error("User to update not found");
    }
    if (this.search({ phoneNumber: newData?.phoneNumber }) || this.search({ email: newData?.email })) {
      throw new Error("Such phone number or email already used");
    }

    const user = UserRepository.update(id, newData);

    if (!user) {
      throw new Error("User to update not found");
    }

    return user;
  }

  delete(id) {
    if (!this.search({ id })) {
      throw new Error("User to delete not found");
    }
    const user = UserRepository.delete(id);
    return user;
  }

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new UserService();
