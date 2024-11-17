const express = require("express");
const router = express.Router();

const postController = require("../controllers/post_controller");

router.post("/", postController.createPost);

router.get("/", postController.getAllPosts);


module.exports = router;