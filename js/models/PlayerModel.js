var Scores = require("../collections/Scores")

var PlayerModel = Backbone.Model.extend({
    initialize: function() {
        this.scores = new Scores();
        this.resetScores();
    },
    resetScores: function() {
        this.scores.reset();
    },
    addScore: function(newScore) {
        this.scores.add(new ScoreModel({value: newScore}));
    }
});

module.exports = PlayerModel;
