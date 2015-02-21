var Players = require("../collections/Players");

var GameModel = Backbone.Model.extend({
    defaults: function() {
        return {
            numPlayers: 0
        };
    },
    initialize: function() {
        var game = this;
        game.players = new Players();
        this.resetPlayerCollection();

        game.on("change:numPlayers", function(event) {
            if (game.hasStarted) {
                if (!confirm("Game has already started. Are you sure you want to change the number of players?")) {
                    game.set("numPlayers", game.previous("numPlayers"));
                } else {
                    game.resetPlayerCollection();
                }
            }
        }, game);

        game.hasStarted = false;
    },
    resetPlayerCollection: function() {
        var game = this;
        game.players.reset();
        _(game.get("numPlayers")).times(function(index) {
            game.players.add({});
        });
    },
    validate: function() {
        if(_.isEmpty(this.get("name")) || !this.get("numPlayers")) {
            return "Invalid Game."
        }
    },
    startGame: function() {
        game.isStarted = true;
    }
});

module.exports = GameModel;
