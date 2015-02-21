var ScoreModel = require("../models/ScoreModel");

var Scores = Backbone.Collection.extend({
    model: ScoreModel
});

module.exports = Scores;
