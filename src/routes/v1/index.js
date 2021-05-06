import express from "express";
import authorRoutes from "./Author/index.js";
import articleRoutes from "./Article/index.js";
import reviewsRoutes from "./Reviews/index.js";
import categoryRoutes from "./Category/index.js";
const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
// router.use('/', apikey);
/*-------------------------------------------------------------------------*/

router.use("/author", authorRoutes);
router.use("/article", articleRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/category", categoryRoutes);

export default router;
