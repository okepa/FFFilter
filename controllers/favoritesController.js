const Favorites = require('../models/favorites');

class FavoritesController {
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
                    favorites: favorites,
                    newFavorite: newFavorite

                });
            }
        })
    }

    static addToFavorites(req, res) {
        let favorite = req.body;
        console.log(favorite);
        Favorites.create(req.body, (err, favorites) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
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
                            favorites: favorites
                        });
                    }
                });
            }
        });
    }
}

module.exports = FavoritesController;