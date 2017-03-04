const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const fanfictionController = require("../controllers/fanfictionController");

router.route("/")
    .get(indexController.showIndex);

router.route("/fanfiction")
    .get(fanfictionController.getFanfiction);

router.route("/favorites")
    .get(fanfictionController.getFavorites);

router.route("/addtofavorites")
    .get(fanfictionController.getAddToFavorites) 
    .post(fanfictionController.addToFavorites)
    

module.exports = router;