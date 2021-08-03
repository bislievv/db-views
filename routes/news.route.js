const { Router } = require("express");
const { newsController } = require("../controllers/news.controller");

const router = Router();

router.post("/news", newsController.postNews);
router.delete("/news/:id", newsController.deleteNews);
router.patch("/news/:id", newsController.patchNews);
router.get("/news/:id", newsController.certainNews);
router.get("/news", newsController.getNews);
router.get("/news/categories/:id", newsController.categoryNews);
router.post("/news/:id", newsController.addImage);

module.exports = router;
