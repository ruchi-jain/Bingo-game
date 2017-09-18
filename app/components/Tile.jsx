var React = require('react');

var Tile = React.createClass({
    render: function() {
        return(
        <div className={this.props.style} > {this.props.data} </div>
        );
    }
});

module.exports = Tile;