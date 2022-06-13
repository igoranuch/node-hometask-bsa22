const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const { createFighterValid, updateFighterValid } = require("../middlewares/fighter.validation.middleware");

const router = Router();

// TODO: Implement route controllers for fighter
router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    if (!res.badRequest) {
      try {
        const fighter = FighterService.create(req.body);
        res.data = fighter;
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
      const fighterById = FighterService.getById(req.params.id);
      res.data = fighterById;
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
      const fighters = FighterService.getAll();
      res.data = fighters;
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
  updateFighterValid,
  (req, res, next) => {
    if (!res.badRequest) {
      try {
        const fighter = FighterService.update(req.params.id, req.body);
        res.data = fighter;
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
      const fighter = FighterService.delete(req.params.id);
      res.data = fighter;
    } catch (err) {
      res.notFound = true;
      res.message = err.message;
    }
    next();
  },
  responseMiddleware
);

module.exports = router;
