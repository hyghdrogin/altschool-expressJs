const { Router } = require("express");
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemsController.js");

const router = Router();

router.post("/", createItem);

router.get("/", getItems);
router.get("/:id", getItemById);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

module.exports = router;
