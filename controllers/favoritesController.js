const Favorites = require('../models/favorites');

class FavoritesController {
    //Load the favorites page
    static getAddToFavorites(req, res) {
        Favorites.find({}, (err, favorites) => {
            if (err) {
                reject(err);
            } else {
                // create an empty post
                var newFavorite = {
                    id: "",
                    title: ""
                }
                res.render("components/favorites", {
                    newFavorite: newFavorite,
                    favorites: favorites,
                    exists: null
                });
            }
        })
    }
    //Activate when the add to favorites button is pressed
    static addToFavorites(req, res) {
        Favorites.findOne({ "title": req.body.title }, (err, findFavorites) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                if (findFavorites == null && req.body.title != "") {
                    //if the fic is not found then add it to the database
                    Favorites.create(req.body, (err, createFavorites) => {
                        if (err) {
                            res.status(400).send(err.message);
                        } else {
                            Favorites.find({}, (err, favorites) => {
                                if (err) {
                                    res.status(400).send(err.message);
                                } else {
                                    // create an empty post
                                    var newFavorite = {
                                        id: "",
                                        title: ""
                                    }
                                    res.render("components/favorites", {
                                        newFavorite: newFavorite,
                                        favorites: favorites,
                                        exists: null
                                    });
                                }
                            });
                        }
                    });
                } else {
                    //if the fic is found then do the error
                    Favorites.find({}, (err, favorites) => {
                        // create an empty post
                        var newFavorite = {
                            id: "",
                            title: ""
                        }
                        res.render("components/favorites", {
                            newFavorite: newFavorite,
                            favorites: favorites,
                            exists: "This fic is already in you favorites"
                        });
                    });
                }
            }
        });
    }
}

module.exports = FavoritesController;