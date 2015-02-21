/* @jsx React.DOM */

var NewGame = React.createClass({
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
            <div className="ui form">
                <h4 className="ui dividing header">New Game</h4>
                <div className="field">
                    <label>Game Name:</label>
                    <input type="text" placeholder="New Game" onChange={this.handleNameChanged}/>
                </div>
                <div className="field">
                    <label>Number of Players</label>
                    <select onChange={this.handlePlayerCountChanged}>
                        {
                            _(9).times(function(index) {
                                return (
                                    <option value={index}>{index}</option>
                                );
                            })
                        }
                    </select>
                </div>
                <div className="ui submit button" onClick={this.handleAddGame}>Add Game</div>
            </div>
        );
    }
});

module.exports = NewGame;
