const express = require("express");
const router = express.Router();

const postController = require("../controllers/post_controller");

router.post("/", postController.createItem);

router.get("/", postController.getAll);

router.get("/:id", postController.getById);

router.put("/:id", postController.updateItem);

router.delete("/:id", postController.deleteItem);

module.exports = router;
