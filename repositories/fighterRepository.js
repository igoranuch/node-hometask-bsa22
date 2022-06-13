const { BaseRepository } = require("./baseRepository");

class FighterRepository extends BaseRepository {
  constructor() {
    super("fighters");
  }

  getFighterByName(search) {
    return this.dbContext.find((fighter) => fighter.name.toLowerCase() === search.name.toLowerCase()).value();
  }
}

exports.FighterRepository = new FighterRepository();
