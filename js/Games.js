var RouteHandler = ReactRouter.RouteHandler;

var Games = React.createClass({
    render: function() {
        return (
            <RouteHandler {...this.props} />
        );
    }

});

module.exports = Games;
