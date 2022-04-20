const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const bodyParser = require("body-parser");

router.get("/", postsController.index);
router.get("/:id", postsController.show);
router.post("/", bodyParser.json(), postsController.create);

module.exports = router;
