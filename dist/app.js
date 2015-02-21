(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\App.js":[function(require,module,exports){
/* @jsx React.DOM */

var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link

var Games = require("./collections/Games");
var Game = require("./models/GameModel");

var App = React.createClass({displayName: "App",
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
            React.createElement("div", {className: "header-container"}, 
                React.createElement("div", {className: "header-content"}, 
                    React.createElement("div", {className: "ui segment"}, 
                        React.createElement("h2", null, 
                            React.createElement(Link, {to: "home"}, "Scorekeeper")
                        )
                    )
                ), 
                React.createElement("div", {className: "menu-container"}, 
                    React.createElement("div", {className: "ui blue menu"}, 
                        React.createElement("div", {className: "item"}, 
                            React.createElement(Link, {to: "newGame"}, React.createElement("i", {className: "plus icon"}), "New Game")
                        ), 
                        React.createElement("div", {className: "item"}, 
                            React.createElement(Link, {to: "savedGames"}, React.createElement("i", {className: "list icon"}), "Load Game")
                        )
                    )
                ), 
                React.createElement("div", {className: "ui segment"}, 
                    React.createElement(RouteHandler, {model: games})
                )
            )
        );
    }
});

module.exports = App;

},{"./collections/Games":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\collections\\Games.js","./models/GameModel":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\models\\GameModel.js"}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\Game.js":[function(require,module,exports){
/* @jsx React.DOM */

var PlayerRow = require("./PlayerRow");

var Game = React.createClass({displayName: "Game",
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
            React.createElement("div", null, 
            game &&
                React.createElement("div", {className: "ui grid"}, 
                    
                        game.players.map(function(player, index) {
                            return (
                                React.createElement(PlayerRow, {
                                    key: "playerRow_" + index, 
                                    model: player}
                                )
                            );
                        })
                    
                ), 
            
            !game &&
                React.createElement("div", null, "No game found with the specified ID.")
            
            )
        );
    }
});

module.exports = Game;

},{"./PlayerRow":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\PlayerRow.js"}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\Games.js":[function(require,module,exports){
var RouteHandler = ReactRouter.RouteHandler;

var Games = React.createClass({displayName: "Games",
    render: function() {
        return (
            React.createElement(RouteHandler, React.__spread({},  this.props))
        );
    }

});

module.exports = Games;

},{}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\Home.js":[function(require,module,exports){
/* @jsx React.DOM */

var Link = ReactRouter.Link;
var NewGame = require("./NewGame");

var Home = React.createClass({displayName: "Home",
    componentDidMount: function() {
        console.log(this.props, this.state);
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", null, "Home"), 
                React.createElement(Link, {to: "newGame"}, "New Game")
            )
        );
    }
});

module.exports = Home;

},{"./NewGame":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\NewGame.js"}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\NewGame.js":[function(require,module,exports){
/* @jsx React.DOM */

var NewGame = React.createClass({displayName: "NewGame",
    mixins: [ReactRouter.Navigation],
    componentDidMount: function() {
        var games = this.props.model;

        var newGame = new games.model({});

        console.log("Game: ", newGame, games);
        this.setState({
            newGame: newGame
        });
    },
    handleAddGame: function() {
        var that = this;
        var newGame = this.state.newGame;
        var games = this.props.model;

        if (newGame.isValid()) {
            games.add(newGame);
            newGame.save().done(function(){
                alert("new game created");
                that.navigateToGameScreen(newGame);
            }).fail(function(err) {
                console.log(err);
            });
        } else {
            console.log(newGame.validationError);
        }
    },
    handleNameChanged: function(event) {
        var newValue = event.target.value;

        this.state.newGame.set("name", newValue);
    },
    handlePlayerCountChanged: function(event) {
        var newValue = event.target.value;

        this.state.newGame.set("numPlayers", newValue);
    },
    navigateToGameScreen: function(newGame) {
        console.log("New game screen");
        this.transitionTo('game', {gameId: newGame.get("id")});
    },
    getInitialState: function() {
        return {
            newGame: null
        };
    },
    render: function() {
        return (
            React.createElement("div", {className: "ui form"}, 
                React.createElement("h4", {className: "ui dividing header"}, "New Game"), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("label", null, "Game Name:"), 
                    React.createElement("input", {type: "text", placeholder: "New Game", onChange: this.handleNameChanged})
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("label", null, "Number of Players"), 
                    React.createElement("select", {onChange: this.handlePlayerCountChanged}, 
                        
                            _(9).times(function(index) {
                                return (
                                    React.createElement("option", {value: index}, index)
                                );
                            })
                        
                    )
                ), 
                React.createElement("div", {className: "ui submit button", onClick: this.handleAddGame}, "Add Game")
            )
        );
    }
});

module.exports = NewGame;

},{}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\NotFound.js":[function(require,module,exports){
/* @jsx React.DOM */

var NotFound = React.createClass({displayName: "NotFound",
    render: function() {
        return (
            React.createElement("div", null, 
                "Page Not Found!"
            )
        );
    }

});

module.exports = NotFound;

},{}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\PlayerRow.js":[function(require,module,exports){
/* @jsx React.DOM */

var ScoreContainer = require("./ScoreContainer");

var styles = {
    playerNameLabel: {
        display: "inline-block",
        margin: "0 0.5em 0 0",
        fontWeight: "bold"
    },
    playerRow: {
        borderBottom: "1px solid #cecece",
        padding: "0",
        paddingBottom: "0.5rem"
    }
}

var PlayerRow = React.createClass({displayName: "PlayerRow",
    toggleAddScore: function() {
        this.setState({
            showAddScore: !this.state.showAddScore
        });
    },
    getInitialState: function() {
        var player = this.props.model;
        player.scores.add([{}, {}]);
        return {};
    },
    render: function() {
        var player = this.props.model;
        var scores = player.scores;
        return (
            React.createElement("div", {className: "middle aligned row"}, 
                React.createElement("div", {className: "column"}, 
                    React.createElement("div", {className: "ui grid", style: {padding: "0", margin: "0"}}, 
                        React.createElement("div", {className: "row", style: styles.playerRow}, 
                            React.createElement("div", {className: "sixteen wide column"}, 
                                React.createElement("h3", {style: styles.playerNameLabel}, "Player"), 
                                React.createElement("div", {className: "ui mini circular blue icon button"}, 
                                    React.createElement("i", {className: "write icon"})
                                ), 
                                React.createElement("div", {className: "ui mini circular blue icon button", onClick: this.toggleAddScore}, 
                                    React.createElement("i", {className: "plus icon"})
                                ), 
                                this.state.showAddScore &&
                                    React.createElement("form", {className: "ui form", style: {display: "inline-block"}}, 
                                        React.createElement("div", {className: "ui mini action input"}, 
                                            React.createElement("input", {type: "text", ref: "addScore", placeholder: "Add Score"}), 
                                            React.createElement("div", {className: "ui mini icon button", onClick: this.addScore}, React.createElement("i", {className: "plus icon"}))
                                        )
                                    )
                                
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "sixteen wide column"}, 
                                React.createElement("div", {style: {width: "100%", overflowX: "auto"}}, 
                                    
                                        _.map(scores, function(score) {
                                            return (
                                                React.createElement(ScoreContainer, {model: score})
                                            );
                                        })
                                    
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

module.exports = PlayerRow;

},{"./ScoreContainer":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\ScoreContainer.js"}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\SavedGames.js":[function(require,module,exports){
/* @jsx React.DOM */

var Link = ReactRouter.Link;

var SavedGames = React.createClass({displayName: "SavedGames",
    render: function() {
        var games = this.props.model;
        return (
            React.createElement("div", {className: "saved-games-container"}, 
                React.createElement("h4", null, "Saved Games"), 
                React.createElement("div", {className: "ui very relaxed divided list"}, 
                
                    games.map(function(game) {
                        return (
                            React.createElement("div", {className: "item", key: "game_" + game.cid}, 
                                React.createElement(Link, {to: "game", params: {gameId: game.get("id")}}, game.get("name"))
                            )
                        );
                    })
                
                )
            )
        );
    }
});

module.exports = SavedGames;

},{}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\ScoreContainer.js":[function(require,module,exports){
/* @jsx React.DOM */

var ScoreContainer = React.createClass({displayName: "ScoreContainer",
    render: function() {
        var score = this.props.model;
        return (
            React.createElement("div", {style: {fontWeight: "bold", display: "inline-block", margin: "0.5em 0.5em"}}, 
                "0"
            )
        );
    }

});

module.exports = ScoreContainer;

},{}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\collections\\Games.js":[function(require,module,exports){
var GameModel = require("../models/GameModel");

var Games = Backbone.Collection.extend({
    model: GameModel,
    localStorage: new Backbone.LocalStorage("Score.GamesCollection")
});

module.exports = Games;

},{"../models/GameModel":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\models\\GameModel.js"}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\collections\\Players.js":[function(require,module,exports){
var PlayerModel = require("../models/PlayerModel");

var Players = Backbone.Collection.extend({
    model: PlayerModel
});

module.exports = Players;

},{"../models/PlayerModel":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\models\\PlayerModel.js"}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\collections\\Scores.js":[function(require,module,exports){
var ScoreModel = require("../models/ScoreModel");

var Scores = Backbone.Collection.extend({
    model: ScoreModel
});

module.exports = Scores;

},{"../models/ScoreModel":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\models\\ScoreModel.js"}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\index.js":[function(require,module,exports){
window.React = React;

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var RouteHandler = ReactRouter.RouteHandler;
var App = require("./App");
var Home = require("./Home");
var NotFound = require("./NotFound");
var NewGame = require("./NewGame");
var SavedGames = require("./SavedGames");
var Games = require("./Games");
var Game = require("./Game");

var routes = (
    React.createElement(Route, {name: "home", path: "/score/", handler: App}, 
        React.createElement(Route, {name: "games", path: "games/", handler: Games}, 
            React.createElement(Route, {name: "newGame", path: "new/", handler: NewGame}), 
            React.createElement(Route, {name: "savedGames", path: "saved/", handler: SavedGames})
        ), 
        React.createElement(Route, {name: "game", path: "game/:gameId/", handler: Game}), 
        React.createElement(DefaultRoute, {handler: Home}), 
        React.createElement(NotFoundRoute, {handler: NotFound})
    )
);

$(document).ready(function(){
    ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
        console.log(arguments);
        React.render( React.createElement(Handler, null), document.getElementById('react-container'));
    });
});

console.log("React loaded.");

},{"./App":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\App.js","./Game":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\Game.js","./Games":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\Games.js","./Home":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\Home.js","./NewGame":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\NewGame.js","./NotFound":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\NotFound.js","./SavedGames":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\SavedGames.js"}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\models\\GameModel.js":[function(require,module,exports){
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

},{"../collections/Players":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\collections\\Players.js"}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\models\\PlayerModel.js":[function(require,module,exports){
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

},{"../collections/Scores":"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\collections\\Scores.js"}],"C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\models\\ScoreModel.js":[function(require,module,exports){
var ScoreModel = Backbone.Model.extend({

});

module.exports = ScoreModel;

},{}]},{},["C:\\Users\\Matt\\Desktop\\grunttest\\score\\js\\index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcZ3J1bnQtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJqcy9BcHAuanMiLCJqcy9HYW1lLmpzIiwianMvR2FtZXMuanMiLCJqcy9Ib21lLmpzIiwianMvTmV3R2FtZS5qcyIsImpzL05vdEZvdW5kLmpzIiwianMvUGxheWVyUm93LmpzIiwianMvU2F2ZWRHYW1lcy5qcyIsImpzL1Njb3JlQ29udGFpbmVyLmpzIiwianMvY29sbGVjdGlvbnMvR2FtZXMuanMiLCJqcy9jb2xsZWN0aW9ucy9QbGF5ZXJzLmpzIiwianMvY29sbGVjdGlvbnMvU2NvcmVzLmpzIiwianMvaW5kZXguanMiLCJqcy9tb2RlbHMvR2FtZU1vZGVsLmpzIiwianMvbW9kZWxzL1BsYXllck1vZGVsLmpzIiwianMvbW9kZWxzL1Njb3JlTW9kZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFJvdXRlSGFuZGxlciA9IFJlYWN0Um91dGVyLlJvdXRlSGFuZGxlcjtcbnZhciBMaW5rID0gUmVhY3RSb3V0ZXIuTGlua1xuXG52YXIgR2FtZXMgPSByZXF1aXJlKFwiLi9jb2xsZWN0aW9ucy9HYW1lc1wiKTtcbnZhciBHYW1lID0gcmVxdWlyZShcIi4vbW9kZWxzL0dhbWVNb2RlbFwiKTtcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJBcHBcIixcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciBnYW1lcyA9IG5ldyBHYW1lcygpO1xuXG4gICAgICAgIGdhbWVzLmZldGNoKCkuZG9uZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lcyBkb25lIGZldGNoaW5nLlwiKTtcbiAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGdhbWVzOiBnYW1lc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGdhbWVzID0gdGhpcy5zdGF0ZS5nYW1lcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJoZWFkZXItY29udGFpbmVyXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiaGVhZGVyLWNvbnRlbnRcIn0sIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwidWkgc2VnbWVudFwifSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCB7dG86IFwiaG9tZVwifSwgXCJTY29yZWtlZXBlclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIm1lbnUtY29udGFpbmVyXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInVpIGJsdWUgbWVudVwifSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiaXRlbVwifSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCB7dG86IFwibmV3R2FtZVwifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge2NsYXNzTmFtZTogXCJwbHVzIGljb25cIn0pLCBcIk5ldyBHYW1lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJpdGVtXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmssIHt0bzogXCJzYXZlZEdhbWVzXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7Y2xhc3NOYW1lOiBcImxpc3QgaWNvblwifSksIFwiTG9hZCBHYW1lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwidWkgc2VnbWVudFwifSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVIYW5kbGVyLCB7bW9kZWw6IGdhbWVzfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIiwiLyogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFBsYXllclJvdyA9IHJlcXVpcmUoXCIuL1BsYXllclJvd1wiKTtcblxudmFyIEdhbWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiR2FtZVwiLFxuICAgIG1peGluczogW1JlYWN0Um91dGVyLlN0YXRlXSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2FtZUlkID0gdGhpcy5nZXRQYXJhbXMoKS5nYW1lSWQ7XG4gICAgICAgIHZhciBnYW1lcyA9IHRoaXMucHJvcHMubW9kZWw7XG5cbiAgICAgICAgdmFyIGdhbWUgPSBudWxsO1xuICAgICAgICBpZiAoIWdhbWVzLmdldChnYW1lSWQpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgbm90IGZvdW5kLi4uXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZSA9IGdhbWVzLmdldChnYW1lSWQpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2FtZTogZ2FtZVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGdhbWUgPSB0aGlzLnN0YXRlLmdhbWU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuICAgICAgICAgICAgZ2FtZSAmJlxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJ1aSBncmlkXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnBsYXllcnMubWFwKGZ1bmN0aW9uKHBsYXllciwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFBsYXllclJvdywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInBsYXllclJvd19cIiArIGluZGV4LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBwbGF5ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICFnYW1lICYmXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcIk5vIGdhbWUgZm91bmQgd2l0aCB0aGUgc3BlY2lmaWVkIElELlwiKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcbiIsInZhciBSb3V0ZUhhbmRsZXIgPSBSZWFjdFJvdXRlci5Sb3V0ZUhhbmRsZXI7XG5cbnZhciBHYW1lcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJHYW1lc1wiLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlSGFuZGxlciwgUmVhY3QuX19zcHJlYWQoe30sICB0aGlzLnByb3BzKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVzO1xuIiwiLyogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIExpbmsgPSBSZWFjdFJvdXRlci5MaW5rO1xudmFyIE5ld0dhbWUgPSByZXF1aXJlKFwiLi9OZXdHYW1lXCIpO1xuXG52YXIgSG9tZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJIb21lXCIsXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLCB0aGlzLnN0YXRlKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJIb21lXCIpLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmssIHt0bzogXCJuZXdHYW1lXCJ9LCBcIk5ldyBHYW1lXCIpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZTtcbiIsIi8qIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBOZXdHYW1lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIk5ld0dhbWVcIixcbiAgICBtaXhpbnM6IFtSZWFjdFJvdXRlci5OYXZpZ2F0aW9uXSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBnYW1lcyA9IHRoaXMucHJvcHMubW9kZWw7XG5cbiAgICAgICAgdmFyIG5ld0dhbWUgPSBuZXcgZ2FtZXMubW9kZWwoe30pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZTogXCIsIG5ld0dhbWUsIGdhbWVzKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBuZXdHYW1lOiBuZXdHYW1lXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaGFuZGxlQWRkR2FtZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIG5ld0dhbWUgPSB0aGlzLnN0YXRlLm5ld0dhbWU7XG4gICAgICAgIHZhciBnYW1lcyA9IHRoaXMucHJvcHMubW9kZWw7XG5cbiAgICAgICAgaWYgKG5ld0dhbWUuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICBnYW1lcy5hZGQobmV3R2FtZSk7XG4gICAgICAgICAgICBuZXdHYW1lLnNhdmUoKS5kb25lKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJuZXcgZ2FtZSBjcmVhdGVkXCIpO1xuICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGVUb0dhbWVTY3JlZW4obmV3R2FtZSk7XG4gICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0dhbWUudmFsaWRhdGlvbkVycm9yKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlTmFtZUNoYW5nZWQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLm5ld0dhbWUuc2V0KFwibmFtZVwiLCBuZXdWYWx1ZSk7XG4gICAgfSxcbiAgICBoYW5kbGVQbGF5ZXJDb3VudENoYW5nZWQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLm5ld0dhbWUuc2V0KFwibnVtUGxheWVyc1wiLCBuZXdWYWx1ZSk7XG4gICAgfSxcbiAgICBuYXZpZ2F0ZVRvR2FtZVNjcmVlbjogZnVuY3Rpb24obmV3R2FtZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5ldyBnYW1lIHNjcmVlblwiKTtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uVG8oJ2dhbWUnLCB7Z2FtZUlkOiBuZXdHYW1lLmdldChcImlkXCIpfSk7XG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV3R2FtZTogbnVsbFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJ1aSBmb3JtXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDRcIiwge2NsYXNzTmFtZTogXCJ1aSBkaXZpZGluZyBoZWFkZXJcIn0sIFwiTmV3IEdhbWVcIiksIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmaWVsZFwifSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBcIkdhbWUgTmFtZTpcIiksIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJOZXcgR2FtZVwiLCBvbkNoYW5nZTogdGhpcy5oYW5kbGVOYW1lQ2hhbmdlZH0pXG4gICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZpZWxkXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiTnVtYmVyIG9mIFBsYXllcnNcIiksIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtvbkNoYW5nZTogdGhpcy5oYW5kbGVQbGF5ZXJDb3VudENoYW5nZWR9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8oOSkudGltZXMoZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBpbmRleH0sIGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJ1aSBzdWJtaXQgYnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQWRkR2FtZX0sIFwiQWRkIEdhbWVcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOZXdHYW1lO1xuIiwiLyogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIE5vdEZvdW5kID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIk5vdEZvdW5kXCIsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICAgICAgXCJQYWdlIE5vdCBGb3VuZCFcIlxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm90Rm91bmQ7XG4iLCIvKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgU2NvcmVDb250YWluZXIgPSByZXF1aXJlKFwiLi9TY29yZUNvbnRhaW5lclwiKTtcblxudmFyIHN0eWxlcyA9IHtcbiAgICBwbGF5ZXJOYW1lTGFiZWw6IHtcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgbWFyZ2luOiBcIjAgMC41ZW0gMCAwXCIsXG4gICAgICAgIGZvbnRXZWlnaHQ6IFwiYm9sZFwiXG4gICAgfSxcbiAgICBwbGF5ZXJSb3c6IHtcbiAgICAgICAgYm9yZGVyQm90dG9tOiBcIjFweCBzb2xpZCAjY2VjZWNlXCIsXG4gICAgICAgIHBhZGRpbmc6IFwiMFwiLFxuICAgICAgICBwYWRkaW5nQm90dG9tOiBcIjAuNXJlbVwiXG4gICAgfVxufVxuXG52YXIgUGxheWVyUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlBsYXllclJvd1wiLFxuICAgIHRvZ2dsZUFkZFNjb3JlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzaG93QWRkU2NvcmU6ICF0aGlzLnN0YXRlLnNob3dBZGRTY29yZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLnByb3BzLm1vZGVsO1xuICAgICAgICBwbGF5ZXIuc2NvcmVzLmFkZChbe30sIHt9XSk7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLnByb3BzLm1vZGVsO1xuICAgICAgICB2YXIgc2NvcmVzID0gcGxheWVyLnNjb3JlcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtaWRkbGUgYWxpZ25lZCByb3dcIn0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJjb2x1bW5cIn0sIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwidWkgZ3JpZFwiLCBzdHlsZToge3BhZGRpbmc6IFwiMFwiLCBtYXJnaW46IFwiMFwifX0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInJvd1wiLCBzdHlsZTogc3R5bGVzLnBsYXllclJvd30sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJzaXh0ZWVuIHdpZGUgY29sdW1uXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIHtzdHlsZTogc3R5bGVzLnBsYXllck5hbWVMYWJlbH0sIFwiUGxheWVyXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInVpIG1pbmkgY2lyY3VsYXIgYmx1ZSBpY29uIGJ1dHRvblwifSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7Y2xhc3NOYW1lOiBcIndyaXRlIGljb25cIn0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwidWkgbWluaSBjaXJjdWxhciBibHVlIGljb24gYnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMudG9nZ2xlQWRkU2NvcmV9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtjbGFzc05hbWU6IFwicGx1cyBpY29uXCJ9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zaG93QWRkU2NvcmUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIsIHtjbGFzc05hbWU6IFwidWkgZm9ybVwiLCBzdHlsZToge2Rpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJ9fSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInVpIG1pbmkgYWN0aW9uIGlucHV0XCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgcmVmOiBcImFkZFNjb3JlXCIsIHBsYWNlaG9sZGVyOiBcIkFkZCBTY29yZVwifSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwidWkgbWluaSBpY29uIGJ1dHRvblwiLCBvbkNsaWNrOiB0aGlzLmFkZFNjb3JlfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge2NsYXNzTmFtZTogXCJwbHVzIGljb25cIn0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicm93XCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic2l4dGVlbiB3aWRlIGNvbHVtblwifSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7d2lkdGg6IFwiMTAwJVwiLCBvdmVyZmxvd1g6IFwiYXV0b1wifX0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5tYXAoc2NvcmVzLCBmdW5jdGlvbihzY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTY29yZUNvbnRhaW5lciwge21vZGVsOiBzY29yZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclJvdztcbiIsIi8qIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBMaW5rID0gUmVhY3RSb3V0ZXIuTGluaztcblxudmFyIFNhdmVkR2FtZXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU2F2ZWRHYW1lc1wiLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBnYW1lcyA9IHRoaXMucHJvcHMubW9kZWw7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic2F2ZWQtZ2FtZXMtY29udGFpbmVyXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDRcIiwgbnVsbCwgXCJTYXZlZCBHYW1lc1wiKSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInVpIHZlcnkgcmVsYXhlZCBkaXZpZGVkIGxpc3RcIn0sIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBnYW1lcy5tYXAoZnVuY3Rpb24oZ2FtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiaXRlbVwiLCBrZXk6IFwiZ2FtZV9cIiArIGdhbWUuY2lkfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGluaywge3RvOiBcImdhbWVcIiwgcGFyYW1zOiB7Z2FtZUlkOiBnYW1lLmdldChcImlkXCIpfX0sIGdhbWUuZ2V0KFwibmFtZVwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTYXZlZEdhbWVzO1xuIiwiLyogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFNjb3JlQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNjb3JlQ29udGFpbmVyXCIsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNjb3JlID0gdGhpcy5wcm9wcy5tb2RlbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7Zm9udFdlaWdodDogXCJib2xkXCIsIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsIG1hcmdpbjogXCIwLjVlbSAwLjVlbVwifX0sIFxuICAgICAgICAgICAgICAgIFwiMFwiXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY29yZUNvbnRhaW5lcjtcbiIsInZhciBHYW1lTW9kZWwgPSByZXF1aXJlKFwiLi4vbW9kZWxzL0dhbWVNb2RlbFwiKTtcblxudmFyIEdhbWVzID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmQoe1xuICAgIG1vZGVsOiBHYW1lTW9kZWwsXG4gICAgbG9jYWxTdG9yYWdlOiBuZXcgQmFja2JvbmUuTG9jYWxTdG9yYWdlKFwiU2NvcmUuR2FtZXNDb2xsZWN0aW9uXCIpXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lcztcbiIsInZhciBQbGF5ZXJNb2RlbCA9IHJlcXVpcmUoXCIuLi9tb2RlbHMvUGxheWVyTW9kZWxcIik7XG5cbnZhciBQbGF5ZXJzID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmQoe1xuICAgIG1vZGVsOiBQbGF5ZXJNb2RlbFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVycztcbiIsInZhciBTY29yZU1vZGVsID0gcmVxdWlyZShcIi4uL21vZGVscy9TY29yZU1vZGVsXCIpO1xuXG52YXIgU2NvcmVzID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmQoe1xuICAgIG1vZGVsOiBTY29yZU1vZGVsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY29yZXM7XG4iLCJ3aW5kb3cuUmVhY3QgPSBSZWFjdDtcblxudmFyIFJvdXRlID0gUmVhY3RSb3V0ZXIuUm91dGU7XG52YXIgRGVmYXVsdFJvdXRlID0gUmVhY3RSb3V0ZXIuRGVmYXVsdFJvdXRlO1xudmFyIE5vdEZvdW5kUm91dGUgPSBSZWFjdFJvdXRlci5Ob3RGb3VuZFJvdXRlO1xudmFyIFJvdXRlSGFuZGxlciA9IFJlYWN0Um91dGVyLlJvdXRlSGFuZGxlcjtcbnZhciBBcHAgPSByZXF1aXJlKFwiLi9BcHBcIik7XG52YXIgSG9tZSA9IHJlcXVpcmUoXCIuL0hvbWVcIik7XG52YXIgTm90Rm91bmQgPSByZXF1aXJlKFwiLi9Ob3RGb3VuZFwiKTtcbnZhciBOZXdHYW1lID0gcmVxdWlyZShcIi4vTmV3R2FtZVwiKTtcbnZhciBTYXZlZEdhbWVzID0gcmVxdWlyZShcIi4vU2F2ZWRHYW1lc1wiKTtcbnZhciBHYW1lcyA9IHJlcXVpcmUoXCIuL0dhbWVzXCIpO1xudmFyIEdhbWUgPSByZXF1aXJlKFwiLi9HYW1lXCIpO1xuXG52YXIgcm91dGVzID0gKFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHtuYW1lOiBcImhvbWVcIiwgcGF0aDogXCIvc2NvcmUvXCIsIGhhbmRsZXI6IEFwcH0sIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7bmFtZTogXCJnYW1lc1wiLCBwYXRoOiBcImdhbWVzL1wiLCBoYW5kbGVyOiBHYW1lc30sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZSwge25hbWU6IFwibmV3R2FtZVwiLCBwYXRoOiBcIm5ldy9cIiwgaGFuZGxlcjogTmV3R2FtZX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHtuYW1lOiBcInNhdmVkR2FtZXNcIiwgcGF0aDogXCJzYXZlZC9cIiwgaGFuZGxlcjogU2F2ZWRHYW1lc30pXG4gICAgICAgICksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7bmFtZTogXCJnYW1lXCIsIHBhdGg6IFwiZ2FtZS86Z2FtZUlkL1wiLCBoYW5kbGVyOiBHYW1lfSksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERlZmF1bHRSb3V0ZSwge2hhbmRsZXI6IEhvbWV9KSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTm90Rm91bmRSb3V0ZSwge2hhbmRsZXI6IE5vdEZvdW5kfSlcbiAgICApXG4pO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgIFJlYWN0Um91dGVyLnJ1bihyb3V0ZXMsIFJlYWN0Um91dGVyLkhpc3RvcnlMb2NhdGlvbiwgZnVuY3Rpb24gKEhhbmRsZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJndW1lbnRzKTtcbiAgICAgICAgUmVhY3QucmVuZGVyKCBSZWFjdC5jcmVhdGVFbGVtZW50KEhhbmRsZXIsIG51bGwpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVhY3QtY29udGFpbmVyJykpO1xuICAgIH0pO1xufSk7XG5cbmNvbnNvbGUubG9nKFwiUmVhY3QgbG9hZGVkLlwiKTtcbiIsInZhciBQbGF5ZXJzID0gcmVxdWlyZShcIi4uL2NvbGxlY3Rpb25zL1BsYXllcnNcIik7XG5cbnZhciBHYW1lTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuICAgIGRlZmF1bHRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG51bVBsYXllcnM6IDBcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XG4gICAgICAgIGdhbWUucGxheWVycyA9IG5ldyBQbGF5ZXJzKCk7XG4gICAgICAgIHRoaXMucmVzZXRQbGF5ZXJDb2xsZWN0aW9uKCk7XG5cbiAgICAgICAgZ2FtZS5vbihcImNoYW5nZTpudW1QbGF5ZXJzXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZ2FtZS5oYXNTdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb25maXJtKFwiR2FtZSBoYXMgYWxyZWFkeSBzdGFydGVkLiBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSBudW1iZXIgb2YgcGxheWVycz9cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5zZXQoXCJudW1QbGF5ZXJzXCIsIGdhbWUucHJldmlvdXMoXCJudW1QbGF5ZXJzXCIpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBnYW1lLnJlc2V0UGxheWVyQ29sbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZ2FtZSk7XG5cbiAgICAgICAgZ2FtZS5oYXNTdGFydGVkID0gZmFsc2U7XG4gICAgfSxcbiAgICByZXNldFBsYXllckNvbGxlY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XG4gICAgICAgIGdhbWUucGxheWVycy5yZXNldCgpO1xuICAgICAgICBfKGdhbWUuZ2V0KFwibnVtUGxheWVyc1wiKSkudGltZXMoZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgIGdhbWUucGxheWVycy5hZGQoe30pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoXy5pc0VtcHR5KHRoaXMuZ2V0KFwibmFtZVwiKSkgfHwgIXRoaXMuZ2V0KFwibnVtUGxheWVyc1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBHYW1lLlwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0R2FtZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGdhbWUuaXNTdGFydGVkID0gdHJ1ZTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lTW9kZWw7XG4iLCJ2YXIgU2NvcmVzID0gcmVxdWlyZShcIi4uL2NvbGxlY3Rpb25zL1Njb3Jlc1wiKVxuXG52YXIgUGxheWVyTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNjb3JlcyA9IG5ldyBTY29yZXMoKTtcbiAgICAgICAgdGhpcy5yZXNldFNjb3JlcygpO1xuICAgIH0sXG4gICAgcmVzZXRTY29yZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNjb3Jlcy5yZXNldCgpO1xuICAgIH0sXG4gICAgYWRkU2NvcmU6IGZ1bmN0aW9uKG5ld1Njb3JlKSB7XG4gICAgICAgIHRoaXMuc2NvcmVzLmFkZChuZXcgU2NvcmVNb2RlbCh7dmFsdWU6IG5ld1Njb3JlfSkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllck1vZGVsO1xuIiwidmFyIFNjb3JlTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY29yZU1vZGVsO1xuIl19
