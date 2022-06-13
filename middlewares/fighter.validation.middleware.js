const { fighter } = require("../models/fighter.js");

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  try {
    if (!Object.keys(req.body).length) throw new Error("Empty object");

    if (req.body.id) {
      throw new Error("Id must be absent");
    }

    const errorMsg = "Invalid value";

    const { defense, power, name } = req.body;

    Object.keys(req.body).forEach((key) => {
      if (!fighter.hasOwnProperty(key)) {
        throw new Error("Excessive property");
      }
    });

    if (!defense || !power || !name) {
      throw new Error(errorMsg);
    }

    if (power < 1 || power > 100 || typeof power != "number") {
      throw new Error(errorMsg);
    }

    if (defense < 1 || defense > 10 || typeof defense != "number") {
      throw new Error(errorMsg);
    }

    if (req.body.health < 80 || req.body.health > 120 || typeof req.body.health != "number") {
      throw new Error(errorMsg);
    }

    if (!req.body.health) req.body.health = 100;
  } catch (err) {
    res.badRequest = true;
    res.message = err.message;
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  try {
    if (!Object.keys(req.body).length) throw new Error("Empty object");

    if (req.body.id) {
      throw new Error("Id must be absent");
    }

    const errorMsg = "Invalid value";

    Object.keys(req.body).forEach((key) => {
      if (!fighter.hasOwnProperty(key)) {
        throw new Error("Excessive property");
      }
      switch (key) {
        case "power":
          if (req.body.power < 1 || req.body.power > 100 || typeof req.body.power != "number") {
            throw new Error(errorMsg);
          }
          break;
        case "defense":
          if (req.body.defense < 1 || req.body.defense > 10 || typeof req.body.defense != "number") {
            throw new Error(errorMsg);
          }
          break;
        case "health":
          if (req.body.health < 80 || req.body.health > 120 || typeof req.body.health != "number") {
            throw new Error(errorMsg);
          }
          break;
      }
    });
  } catch (err) {
    res.badRequest = true;
    res.message = err.message;
  }
  next();
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
