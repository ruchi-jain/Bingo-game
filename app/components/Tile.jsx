var React = require('react');

var Tile = React.createClass({
    getInitialState: function() {
		return {
        cellCss: this.props.style
    }
},
onClick: function() {
    if(this.props.drawVal === this.props.data || this.props.previousBallArr.indexOf(this.props.data)!=-1 ) {
        var style = this.props.style + ' tile-selected'
        this.setState({
            cellCss: style
        }); 
        this.props.callbackSelectedList(this.props.data);
    }        
},
    render: function() {
        return(
        <div className={this.state.cellCss} onClick={this.onClick}>{this.props.data}</div>
        );
    }
});

module.exports = Tile;