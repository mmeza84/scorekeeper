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
    <Route name="home" path="/score/" handler={App} >
        <Route name="games" path="games/" handler={Games}>
            <Route name="newGame" path="new/" handler={NewGame} />
            <Route name="savedGames" path="saved/" handler={SavedGames} />
        </Route>
        <Route name="game" path="game/:gameId/" handler={Game} />
        <DefaultRoute handler={Home} />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

$(document).ready(function(){
    ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
        console.log(arguments);
        React.render( <Handler/>, document.getElementById('react-container'));
    });
});

console.log("React loaded.");
