var GameModel = require("../models/GameModel");

var Games = Backbone.Collection.extend({
    model: GameModel,
    localStorage: new Backbone.LocalStorage("Score.GamesCollection")
});

module.exports = Games;
