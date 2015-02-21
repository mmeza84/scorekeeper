/* @jsx React.DOM */

var ScoreContainer = React.createClass({
    render: function() {
        var score = this.props.model;
        return (
            <div style={{fontWeight: "bold", display: "inline-block", margin: "0.5em 0.5em"}}>
                0
            </div>
        );
    }

});

module.exports = ScoreContainer;
