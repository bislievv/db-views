const Category = require("../models/Category.model");

module.exports.categoriesController = {
  postCategories: async (req, res) => {
    try {
      await Category.create({
        name: req.body.name,
      });
      res.json("Категория добавлена");
    } catch (err) {
      res.json(err);
    }
  },
  deleteCategories: async (req, res) => {
    try {
      await Category.findByIdAndRemove(req.params.id);
      res.json("Категория удалена");
    } catch (err) {
      res.json(err);
    }
  },
  getCategories: async (req, res) => {
    try {
      const category = await Category.find({}).lean();
      res.render("category-news", {
        category,
      });
    } catch (err) {
      res.json(err);
    }
  },
};
