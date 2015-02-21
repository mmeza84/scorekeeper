/* @jsx React.DOM */

var PlayerRow = require("./PlayerRow");

var Game = React.createClass({
    mixins: [ReactRouter.State],
    getInitialState: function() {
        var gameId = this.getParams().gameId;
        var games = this.props.model;

        var game = null;
        if (!games.get(gameId)) {
            console.log("Game not found...");
        } else {
            game = games.get(gameId)
        }

        return {
            game: game
        };
    },
    getDefaultProps: function() {
        return {};
    },
    render: function() {
        var game = this.state.game;
        return (
            <div>
            {game &&
                <div className="ui grid">
                    {
                        game.players.map(function(player, index) {
                            return (
                                <PlayerRow
                                    key={"playerRow_" + index}
                                    model={player}
                                />
                            );
                        })
                    }
                </div>
            }
            {!game &&
                <div>No game found with the specified ID.</div>
            }
            </div>
        );
    }
});

module.exports = Game;
