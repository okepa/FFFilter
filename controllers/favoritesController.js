const Favorites = require('../models/favorites');
const Fanfiction = require('../models/fanfiction')

class FavoritesController {
    //Load the favorites page
    static getAddToFavorites(req, res) {
        Favorites.find({}, (err, favorites) => {
            if (err) {
                reject(err);
            } else {
                Fanfiction.find({}, (err, fanfiction) => {
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
                            fanfiction: fanfiction,
                            exists: null
                        });
                    }
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
                    console.log(req.body);
                    Favorites.create(req.body, (err, createFavorites) => {
                        if (err) {
                            res.status(400).send(err.message);
                        } else {
                            Favorites.find({}, (err, favorites) => {
                                if (err) {
                                    res.status(400).send(err.message);
                                } else {
                                    Fanfiction.find({}, (err, fanfiction) => {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            // create an empty post
                                            var newFavorite = {
                                                id: "",
                                                title: "",
                                                medium: ""
                                            }
                                            res.render("components/favorites", {
                                                newFavorite: newFavorite,
                                                favorites: favorites,
                                                fanfiction: fanfiction,
                                                exists: null
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    //if the fic is found then do the error
                    Favorites.find({}, (err, favorites) => {
                        if (err) {
                            reject(err);
                        } else {
                            Fanfiction.find({}, (err, fanfiction) => {
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
                                        fanfiction: fanfiction,
                                        exists: "This fic is already in you favorites"
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    }
}

module.exports = FavoritesController;