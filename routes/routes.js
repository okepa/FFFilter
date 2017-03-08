const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const fanfictionController = require("../controllers/fanfictionController");
const favoritesController = require("../controllers/favoritesController");
const crossoverController = require("../controllers/crossoverController");

router.route("/")
    .get(indexController.showIndex);

router.route("/fanfiction")
    .get(fanfictionController.getFanfiction);

router.route("/crossoverfanfiction")
    .get(crossoverController.getCrossoverFanfiction);

router.route("/fics")
    .get(fanfictionController.getFics);

router.route("/crossovers")
    .get(crossoverController.getCrossovers);

router.route("/favorites")
    .get(favoritesController.getAddToFavorites) 
    .post(favoritesController.addToFavorites)
    

module.exports = router;