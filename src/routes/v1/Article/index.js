import express from "express";
import { asyncHandler } from "../../../core/asyncHandler.js";
import { BadRequestError, NotFoundError } from "../../../core/apiErrors.js";
//import models from "../../../database/postgres/models/index.js";
//const Article = require("../../../database/postgres/models/index.js").Article;
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    // const article = await Article.findAll();
    // if (!article) next(new NotFoundError("Articles not found"));
    res.status(200).send("ok");
  })
);
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const article = await Article.findByPk(req.params.id);
    if (!article) next(new NotFoundError("Article not found"));
    res.status(200).send(article);
  })
);
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const article = await Article.create(req.body);
    if (!article) next(new BadRequestError("Bad request try again"));
    res.status(200).send(article);
  })
);
router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const updatingArticle = await Article.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (!updatingArticle) next(new NotFoundError("Article not found"));
    res.status(200).send(updatingArticle);
  })
);
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const deletingArticle = await Article.destroy(req.body, {
      where: { id: req.params.id },
    });

    if (!deletingArticle) next(new NotFoundError("Article not found"));
    res.status(200).send("Killed");
  })
);
export default router;
