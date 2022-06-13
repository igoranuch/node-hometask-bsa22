const { use } = require("chai");
const { last } = require("lodash");
const { user } = require("../models/user.js");
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  try {
    if (!Object.keys(req.body).length) throw new Error("Empty object");

    if (req.body.id) {
      throw new Error("Id must be absent");
    }

    const errorMsg = "Invalid value";

    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      throw new Error(errorMsg);
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
    res.badRequest = true;
    res.message = error.message;
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  try {
    console.log(req);
    if (!Object.keys(req.body).length) throw new Error("Empty object");

    if (req.body.id) {
      throw new Error("Id must be absent");
    }

    const errorMsg = "Invalid value";

    const phoneNumberTemplate = /\+380[0-9]{9}$/;
    const emailTemplate = /^\w+([.-]?\w+)*@gmail.com/;

    Object.keys(req.body).forEach((key) => {
      if (!user.hasOwnProperty(key)) {
        throw new Error("Excessive property");
      }
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
      }
    });
  } catch (error) {
    res.badRequest = true;
    res.message = error.message;
  }
  next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
