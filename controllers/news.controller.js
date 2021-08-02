const News = require("../models/News.model");
const Comment = require("../models/Comment.model");

module.exports.newsController = {
  postNews: async (req, res) => {
    try {
      await News.create({
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
        image: req.body.image,
      });
      res.json("Новость добавлена");
    } catch (err) {
      res.json(err);
    }
  },
  deleteNews: async (req, res) => {
    try {
      await News.findByIdAndRemove(req.params.id);
      res.json("Новость удалена");
    } catch (err) {
      res.json(err);
    }
  },
  patchNews: async (req, res) => {
    try {
      await News.findByIdAndUpdate(req.params.id, req.body);
      res.json("Новость изменена");
    } catch (err) {
      res.json(err);
    }
  },
  certainNews: async (req, res) => {
    try {
      const com = await Comment.find({ news: req.params.id }).lean();
      const only = await News.findById(req.params.id).lean();
      res.render("singleNews", {
        only,
        com,
      });
    } catch (err) {
      res.json(err);
    }
  },
  getNews: async (req, res) => {
    try {
      const data = await News.find({}).lean();
      const threeNews = data.slice(data.length - 3);
      res.render("news", {
        threeNews,
      });
    } catch (err) {
      res.json(err);
    }
  },
  categoryNews: async (req, res) => {
    try {
      const data = await News.find({ category: req.params.id }).lean();
      res.render("category-news", {
        data,
      });
    } catch (err) {
      res.json(err);
    }
  },
};
