const { Router } = require("express");
const UserService = require("../services/userService");
const { createUserValid, updateUserValid } = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");
const { UserRepository } = require("../repositories/userRepository");

const router = Router();

// TODO: Implement route controllers for user
router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    if (!res?.badRequest) {
      try {
        const user = UserService.create(req.body);
        res.data = user;
      } catch (err) {
        res.badRequest = true;
        res.message = err.message;
      }
    }
    next();
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const userById = UserService.getById(req.params.id);
      res.data = userById;
    } catch (err) {
      res.notFound = true;
      res.message = err.message;
    }
    next();
  },
  responseMiddleware
);

router.get(
  "/",
  (req, res, next) => {
    try {
      const users = UserRepository.getAll();
      res.data = users;
    } catch (err) {
      res.notFound = true;
      res.message = err.message;
    }
    next();
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    if (!res?.badRequest) {
      try {
        const user = UserService.update(req.params.id, req.body);
        res.data = user;
      } catch (err) {
        res.badRequest = true;
        res.message = err.message;
      }
    }
    next();
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const user = UserService.delete(req.params.id);
      res.data = user;
    } catch (err) {
      res.notFound = true;
      res.message = err.message;
    }
    next();
  },
  responseMiddleware
);

module.exports = router;
