const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment_controller");

router.post("/", commentController.createItem);

router.get("/", commentController.getAll);

router.get("/:id", commentController.getById);

router.put("/:id", commentController.updateItem);

router.delete("/:id", commentController.deleteItem);

module.exports = router;