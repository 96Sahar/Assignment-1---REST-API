const express = require("express");
const router = express.Router();

const postController = require("../controllers/post_controller");

router.post("/", postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

router.post("/:postId/comments", postController.addComment);

router.get("/:postId/comments", postController.getAllCommentsInAPost);

router.get("/:postId/comments/:commentId", postController.getCommentById);

router.put("/:postId/comments/:commentId", postController.updateComment);

router.delete("/:postId/comments/:commentId", postController.deleteComment);

module.exports = router;
