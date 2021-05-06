import express from "express";
import { asyncHandler } from "../../../core/asyncHandler.js";
import { BadRequestError, NotFoundError } from "../../../core/apiErrors.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const category = await Category.findAll();
    if (!category) next(new NotFoundError("Categories not found"));
    res.status(200).send(category);
  })
);
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) next(new NotFoundError("Category not found"));
    res.status(200).send(category);
  })
);
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const category = await Category.create(req.body);
    if (!category) next(new BadRequestError("Bad request try again"));
    res.status(200).send(category);
  })
);
router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const updatingCategory = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (!updatingCategory) next(new NotFoundError("Category not found"));
    res.status(200).send(updatingCategory);
  })
);
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const deletingCategory = await Category.destroy(req.body, {
      where: { id: req.params.id },
    });

    if (!deletingCategory) next(new NotFoundError("Category not found"));
    res.status(200).send("Killed");
  })
);

export default router;
