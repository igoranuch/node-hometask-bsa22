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
      if (!user.hasOwnProperty(key)) {
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
    res.notFound = true;
    res.message = error.message;
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  try {
    if (req.body === {}) {
      throw new Error("No data to update");
    }
    if (!!req.body?.id) {
      throw new Error("Id must be absent");
    }
    const errorMsg = "Invalid value";

    const phoneNumberTemplate = /\+380[0-9]{9}$/;
    const emailTemplate = /^\w+([.-]?\w+)*@gmail.com/;

    Object.keys(req.body).forEach((key) => {
      if (!Object.keys(user).includes(key)) throw new Error("Mismatching property");
      switch (key) {
        case "email":
          if (!req.body.email.match(emailTemplate)) {
            throw new Error(errorMsg);
          }
          break;
        case "phoneNumber":
          if (!req.body.phoneNumber.match(phoneNumberTemplate)) {
            throw new Error(errorMsg);
          }
          break;
        case "password":
          if (req.body.password.length < 3) {
            throw new Error(errorMsg);
          }
          break;
        case "firstName":
          if (!req.body.firstName) {
            throw new Error(errorMsg);
          }
          break;
        case "lastName":
          if (!req.body.lastName) {
            throw new Error(errorMsg);
          }
          break;
      }
    });
  } catch (err) {
    res.notFound = true;
    res.message = error.message;
  }
  next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
