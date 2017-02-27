const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const fanfictionController = require("../controllers/fanfictionController");

router.route("/")
    .get(indexController.showIndex);

router.route("/favorites")
    .get(fanfictionController.getFavorites);

module.exports = router;