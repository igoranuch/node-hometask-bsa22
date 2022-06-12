const { use } = require("chai");
const { last } = require("lodash");
const { user } = require("../models/user");
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const errorMsg = "Invalid value";

    if (!(firstName || lastName || email || phoneNumber || password)) {
      throw new Error(errorMsg);
    }

    if (req.body?.id) {
      throw new Error("Id must be absent");
    }

    Object.keys(req.body).forEach((key) => {
      if (!user.hasOwnPropert(key)) {
        throw new Error("Excessive property");
      }
    });

    const phoneNumberTemplate = /\+380[0-9]{9}$/;
    const emailTemplate = /^\w+([.-]?\w+)*@gmail.com/;

    if (!email.match(emailTemplate)) {
      throw new Error(errorMsg);
    }

    if (!phoneNumber.match(phoneNumberTemplate)) {
      throw new Error(errorMsg);
    }

    if (password.length < 3) {
      throw new Error(errorMsg);
    }
  } catch (error) {
    res.message = error.message;
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  try {
  } catch {}
  next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
