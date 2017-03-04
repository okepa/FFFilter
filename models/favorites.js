const mongoose = require('mongoose');

var FavoritesSchema = mongoose.Schema({
    title: String
});

module.exports = mongoose.model('Favorites', FavoritesSchema);