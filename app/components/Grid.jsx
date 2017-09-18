var React = require('react');
var Tile = require('Tile');
var TicketData = require('TicketData').getTicketData;
var Immutable = require('immutable');

require('../static/styles/bingo.css'); // add `link`
var exportedStyles = require('!!css-loader!../static/styles/bingo.css'); // just export
var selectedList = [];

var Grid = React.createClass({
    getInitialState() {
        return {
            list: Immutable.List(TicketData())
        };
    },
    getTile: function() {
        var _this = this;
        //var data = TicketData();
        //console.log(data);
        return (this.state.list.map(function(option, i) {                 
                if(_this.props.drawVal && _this.props.drawVal === option) {
                   selectedList.push(option);
                    console.log(selectedList);
                   return <Tile data={option} key={"cell-" + i} style={'cell tile-selected'}/> 
                } else if (selectedList.indexOf(option) !== -1) {
                    return <Tile data={option} key={"cell-" + i} style={'cell tile-selected'}/> 
                } else {
                   return <Tile data={option} key={i} style={'cell'}/> 
                } 
        }
            ))},
    render: function() {
        return(
            <div className={this.props.style}> 
                {this.getTile()}
            </div>
        );
    
    }
});
    
module.exports = Grid;