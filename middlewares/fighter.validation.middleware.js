const { fighter } = require("../models/fighter");

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  try {
    const { defense, power, name, health = 100 } = req.body;

    const errorMsg = "Invalid value";

    if (!(defense || power || name)) {
      throw new Error(errorMsg);
    }

    if (req.body?.id) {
      throw new Error("Id must be absent");
    }

    Object.keys(req.body).forEach((key) => {
      if (!fighter.hasOwnProperty(key)) {
        throw new Error("Excessive property");
      }
    });

    if (power < 1 || power > 100) {
      throw new Error(errorMsg);
    }

    if (defense < 1 || defense > 10) {
      throw new Error(errorMsg);
    }

    if (health < 80 || health > 120) {
      throw new Error(errorMsg);
    }
  } catch (err) {
    res.notFound = true;
    res.message = err.message;
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  try {
    if (req.body === {}) {
      throw new Error("No data to update");
    }

    if (!!req.body?.id) {
      throw new Error("Id must be absent");
    }

    const errorMsg = "Invalid value";

    Object.keys(req.body).forEach((key) => {
      if (!Object.keys(fighter).includes(key)) throw new Error("Mismatching property");
      switch (key) {
        case "power":
          if (req.body.power < 1 || req.body.power > 100) {
            throw new Error(errorMsg);
          }
          break;
        case "defense":
          if (req.body.defense < 1 || req.body.defense > 10) {
            throw new Error(errorMsg);
          }
          break;
        case "health":
          if (req.body.health < 80 || req.body.health > 120) {
            throw new Error(errorMsg);
          }
          break;
      }
    });
  } catch (err) {
    res.notFound = true;
    res.message = err.message;
  }
  next();
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
