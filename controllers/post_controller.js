const BaseController = require("./base_controller");
const Post = require("../models/post_model");

class PostController extends BaseController {
  constructor() {
    super(Post); 
  }
}

module.exports = new PostController();
