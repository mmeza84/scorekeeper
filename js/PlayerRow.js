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

var PlayerRow = React.createClass({
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
            <div className="middle aligned row">
                <div className="column">
                    <div className="ui grid" style={{padding: "0", margin: "0"}}>
                        <div className="row" style={styles.playerRow}>
                            <div className="sixteen wide column">
                                <h3 style={styles.playerNameLabel}>Player</h3>
                                <div className="ui mini circular blue icon button">
                                    <i className="write icon"></i>
                                </div>
                                <div className="ui mini circular blue icon button" onClick={this.toggleAddScore}>
                                    <i className="plus icon"></i>
                                </div>
                                {this.state.showAddScore &&
                                    <form className="ui form" style={{display: "inline-block"}}>
                                        <div className="ui mini action input">
                                            <input type="text" ref="addScore" placeholder="Add Score"/>
                                            <div className="ui mini icon button" onClick={this.addScore}><i className="plus icon"></i></div>
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="sixteen wide column">
                                <div style={{width: "100%", overflowX: "auto"}}>
                                    {
                                        _.map(scores, function(score) {
                                            return (
                                                <ScoreContainer model={score} />
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = PlayerRow;
