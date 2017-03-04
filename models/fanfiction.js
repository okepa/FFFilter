const mongoose = require('mongoose');

var FanfictionSchema = mongoose.Schema({
    fanfiction: String,
    medium: String
});

module.exports = mongoose.model('Fanfiction', FanfictionSchema);