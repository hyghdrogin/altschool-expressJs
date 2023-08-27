const { Router } = require("express");
const itemRouter = require("./itemRoute.js");
const userRouter = require("./userRoute.js");

const router = Router();

router.use("/items", itemRouter);
router.use("/users", userRouter);

module.exports = router;
