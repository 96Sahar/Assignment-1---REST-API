const Posts = require("../models/post_model");
const { ObjectId } = require("mongoose");

const getAllPosts = async (req, res) => {
  const filter = req.query;
  console.log(filter);
  try {
    if (filter.owner) {
      const posts = await Posts.find({ owner: filter.owner });
      return res.send(posts);
    } else {
      const posts = await Posts.find();
      return res.send(posts);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const createPost = async (req, res) => {
  console.log(req.body);
  try {
    const post = await Posts.create(req.body);
    if (post) {
      return res.send(post);
    } else {
      return res.status(404).send("Post not created");
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const post = await Posts.findById(id);
      return res.status(200).send(post);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } else {
    console.log("Get Post By Id Error");
  }
};
module.exports = {
  getAllPosts,
  createPost,
  getPostById,
};
