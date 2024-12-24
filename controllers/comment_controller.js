const BaseController = require("./base_controller");
const Comment = require("../models/comment_model");

class commentController extends BaseController {
  constructor() {
    super(Comment); 
  }
}

module.exports = new commentController();

