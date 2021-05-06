import express from "express";
import { asyncHandler } from "../../../core/asyncHandler.js";
import { BadRequestError, NotFoundError } from "../../../core/apiErrors.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const author = await Author.findAll();
    if (!author) next(new NotFoundError("Authors not found"));
    res.status(200).send(author);
  })
);
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const author = await Author.findByPk(req.params.id);
    if (!author) next(new NotFoundError("Author not found"));
    res.status(200).send(author);
  })
);
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const author = await Author.create(req.body);
    if (!author) next(new BadRequestError("Bad request try again"));
    res.status(200).send(author);
  })
);
router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const updatingAuthor = await Author.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (!updatingAuthor) next(new NotFoundError("Author not found"));
    res.status(200).send(updatingAuthor);
  })
);
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const deletingAuthor = await Author.destroy(req.body, {
      where: { id: req.params.id },
    });

    if (!deletingAuthor) next(new NotFoundError("Author not found"));
    res.status(200).send("Killed");
  })
);
export default router;
