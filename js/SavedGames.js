/* @jsx React.DOM */

var Link = ReactRouter.Link;

var SavedGames = React.createClass({
    render: function() {
        var games = this.props.model;
        return (
            <div className="saved-games-container">
                <h4>Saved Games</h4>
                <div className="ui very relaxed divided list">
                {
                    games.map(function(game) {
                        return (
                            <div className="item" key={"game_" + game.cid}>
                                <Link to="game" params={{gameId: game.get("id")}}>{game.get("name")}</Link>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        );
    }
});

module.exports = SavedGames;
