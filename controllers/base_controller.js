const commentModel = require("../models/comment_model");

class BaseController {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.createItem = this.createItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async getAll(req, res) {
    const filter = req.query;
    const data =
      Object.keys(filter).length === 0
        ? await this.model.find()
        : await this.model.find(filter);
    if (Object.keys(data).length === 0) {
      res.status(404).send("No data found");
    } else {
      res.send(data);
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const data = await this.model.findById(id);
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send("item not found");
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  async createItem(req, res) {
    try {
      const data = await this.model.create(req.body);
      res.status(201).send(data);
    } catch (err) {
      console.error("Error:", err);
      res.status(400).send(err);
    }
  }

  async updateItem(req, res) {
    const id = req.params.id;
    try {
      const data = await this.model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send("item not found");
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  async deleteItem(req, res) {
    const id = req.params.id;
    try {
      if(this.model.modelName === 'Post'){
        await commentModel.deleteMany({PostId:id});
      }
      await this.model.findByIdAndDelete(id);
      return res.send("item deleted");
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}

module.exports = BaseController;