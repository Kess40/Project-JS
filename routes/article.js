const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const Article = require("../models/Article");
const router = express.Router();

router.get("/articles", (req, res) => {
  const criteria = req.query;
  Article.findAll({
    where: criteria,
  }).then((users) => res.json(users));
});

router.post("/articles", verifyJWT, (req, res) => {
  Article.create(req.body).then((user) => res.status(201).json(user));
});

router.get("/articles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Article.findByPk(id).then((user) => {
    if (!user) res.sendStatus(404);
    else res.json(user);
  });
});

router.delete("/articles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Article.destroy({
    where: {
      id: id,
    },
  }).then((nbDeleted) => {
    if (!nbDeleted) res.sendStatus(404);
    else res.sendStatus(204);
  });
});

router.put("/articles/:id", verifyJWT, (req, res) => {
  const id = parseInt(req.params.id);
  Article.update(req.body, {
    where: {
      id: id,
    },
  }).then(([nbUpdated]) => {
    if (!nbUpdated) res.sendStatus(404);
    else Article.findByPk(id).then((user) => res.json(user));
  });
});

module.exports = router;
