const News = require("../models/News.model");
const Comment = require("../models/Comment.model");
const path = require("path");

module.exports.newsController = {
  postNews: async (req, res) => {
    try {
      await News.create({
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
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
      const { page = 1, limit = 5 } = req.query;
      const data = await News.find({})
        .lean()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      // const threeNews = data.slice(data.length - 3);
      res.render("news", {
        // threeNews,
        data,
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
  addImage: async (req, res) => {
    try {
      const image = req.files.image;
      const newFileName = `/newsImage/${Math.random() * 10000}${path.extname(
        image.name
      )}`;

      image.mv(`./public${newFileName}`, async (err) => {
        if (err) {
          console.log(error);
        } else {
          await News.findByIdAndUpdate(req.params.id, { image: newFileName });
          res.json("Файл загружен");
        }
      });
    } catch (err) {
      res.json(err);
    }
  },
};
