const { Router } = require("express");
const { commentsController } = require("../controllers/comments.controller");

const router = Router();

router.post("/comments", commentsController.addComment);
router.delete("/comments/:id", commentsController.deleteComment);
router.get("/comments/news/:id", commentsController.commentByNews);

module.exports = router;
