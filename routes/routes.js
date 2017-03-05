const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const fanfictionController = require("../controllers/fanfictionController");
const favoritesController = require("../controllers/favoritesController");

router.route("/")
    .get(indexController.showIndex);

router.route("/fanfiction")
    .get(fanfictionController.getFanfiction);

router.route("/fics")
    .get(fanfictionController.getFics);

router.route("/favorites")
    .get(favoritesController.getAddToFavorites) 
    .post(favoritesController.addToFavorites)
    

module.exports = router;