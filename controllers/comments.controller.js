const Comment = require("../models/Comment.model");

module.exports.commentsController = {
  addComment: async (req, res) => {
    try {
      await Comment.create({
        user: req.body.user,
        text: req.body.text,
        news: req.body.news,
      });
      res.json("Комментарий добавлен");
    } catch (err) {
      res.json(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.findByIdAndRemove(req.params.id);
      res.json("Комментарий удален");
    } catch (err) {
      res.json(err);
    }
  },
  commentByNews: async (req, res) => {
    try {
      const data = await Comment.find({ news: req.params.id });
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
};
