const mongoose = require('mongoose');

var FavoritesSchema = mongoose.Schema({
    Title: String
});

module.exports = mongoose.model('Favorites', FavoritesSchema);