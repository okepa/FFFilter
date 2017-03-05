const mongoose = require('mongoose');

var FavoritesSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    }   
});

module.exports = mongoose.model('Favorites', FavoritesSchema);