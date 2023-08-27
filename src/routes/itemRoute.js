const { Router } = require("express");
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemsController.js");
const authMiddleware = require("../middleware/authentication.js");

const router = Router();

router.post("/", authMiddleware, createItem);

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, getItemById);

router.patch("/:id", authMiddleware, updateItem);
router.patch("/:id", authMiddleware, updateItem);

router.delete("/:id", authMiddleware, deleteItem);

module.exports = router;