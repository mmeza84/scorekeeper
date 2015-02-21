/* @jsx React.DOM */

var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link

var Games = require("./collections/Games");
var Game = require("./models/GameModel");

var App = React.createClass({
    componentWillMount: function() {
        var that = this;
        var games = new Games();

        games.fetch().done(function(){
            console.log("Games done fetching.");
            that.setState({
                games: games
            });
        });
    },
    render: function() {
        var games = this.state.games;
        return (
            <div className="header-container">
                <div className="header-content">
                    <div className="ui segment">
                        <h2>
                            <Link to="home">Scorekeeper</Link>
                        </h2>
                    </div>
                </div>
                <div className="menu-container">
                    <div className="ui blue menu">
                        <div className="item">
                            <Link to="newGame"><i className="plus icon"></i>New Game</Link>
                        </div>
                        <div className="item">
                            <Link to="savedGames"><i className="list icon"></i>Load Game</Link>
                        </div>
                    </div>
                </div>
                <div className="ui segment">
                    <RouteHandler model={games}/>
                </div>
            </div>
        );
    }
});

module.exports = App;
