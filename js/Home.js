/* @jsx React.DOM */

var Link = ReactRouter.Link;
var NewGame = require("./NewGame");

var Home = React.createClass({
    componentDidMount: function() {
        console.log(this.props, this.state);
    },
    render: function() {
        return (
            <div>
                <div>Home</div>
                <Link to="newGame">New Game</Link>
            </div>
        );
    }
});

module.exports = Home;
