const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  // TODO: Implement methods to work with fighters

  create(fighterParams) {
    const { name } = fighterParams;

    if (name) {
      throw new Error("Fighter with such name already exists");
    }

    const fighter = FighterRepository.create(fighterParams);
    return fighter;
  }

  getAll() {
    const fighters = FighterRepository.getAll();
    return fighters;
  }

  getById(id) {
    const fighter = this.search({ id });
    if (!fighter) {
      throw new Error("Fighter not found");
    }
    return fighter;
  }

  update(id, newData) {
    if (!this.search({ id })) {
      throw new Error("Fighter to update not found");
    }
    if (this.search({ name: newData?.name })) {
      throw new Error("Fighter with such name already exists");
    }
    const fighter = FighterRepository.update(id, newData);
    if (!fighter) {
      throw new Error("Fighter to update not found");
    }
    return fighter;
  }

  delete(id) {
    if (!this.search({ id })) {
      throw new Error("Fighter to delete not found");
    }
    const fighter = FighterRepository.delete(id);
    return fighter;
  }

  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new FighterService();
