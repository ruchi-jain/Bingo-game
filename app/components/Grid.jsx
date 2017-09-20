var React = require('react');
var Tile = require('Tile');
var TicketData = require('TicketData').getTicketData;
var Immutable = require('immutable');
require('../static/styles/bingo.css'); // add `link`
var exportedStyles = require('!!css-loader!../static/styles/bingo.css'); // just export
var lastId = 0;
var Grid = React.createClass({
    getInitialState() {
        return {
            list: Immutable.List(TicketData())
        };
    },
    sendItem: function(item) {
        this.props.updateGridList(item);
    },
    getTile: function() {
        var _this = this;
        return (this.state.list.map(function(option, i) {              
                   return <Tile data={option} key={option + "-" + i} style={'cell'} drawVal={_this.props.drawVal} previousBallArr={_this.props.previousBallArr} callbackSelectedList={_this.sendItem}/>                 
        }
            ))},
    render: function() {
        return(
            <div key={this.props.key} className={this.props.style}> 
                {this.getTile()}
            </div>
        );
    
    }
});
    
module.exports = Grid;