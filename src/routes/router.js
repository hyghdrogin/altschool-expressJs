const { Router } = require("express");
const itemRouter = require("./itemRoute.js");

const router = Router();

router.use("/items", itemRouter);

module.exports = router;
