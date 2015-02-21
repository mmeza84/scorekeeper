var PlayerModel = require("../models/PlayerModel");

var Players = Backbone.Collection.extend({
    model: PlayerModel
});

module.exports = Players;
