var React = require('react');
var Tile = require('Tile');
var $ = require("jquery");

var previousNum = new Array(5);
require('../static/styles/bingo.css'); // add `link`
var exportedStyles = require('!!css-loader!../static/styles/bingo.css'); // just export

var Header = React.createClass({
    getInitialState: function() {
		return {
			latestNumber: 0
		}
	},
    request: function (_this) {
        $.get("http://localhost:3000/api/random_ball", function(data){
            if(data !== undefined) {
                 _this.setState({
				latestNumber: data
        });
                previousNum.push(data);
                _this.props.onChange(data);
            }
        });
        _this.latestTimer = setTimeout(this.request.bind(this,_this), 10000);
    },
    componentDidMount: function () { 
        var _this = this;
        this.request(_this);
    },
    getTile: function() {
        var _this = this;
        if(previousNum.length !== 0){
            if (previousNum.length > 5) {
               previousNum.shift(); // removes the first element from an array 
             }
        return (previousNum.map(function(option, i) {                                 
            return <Tile data={option} key={"cell-" + i} style={'cell previous-ball-tile'}/> 
               
        })
    )} else
            return null;
    },
    componentWillUnmount: function () {
		clearTimeout(this.latestTimer);
	},
    render: function() {
        return(
        <div className={'header'} >
                <label className={'last-ball'}> Last Ball </label>
                <Tile style={'cell last-ball-tile'} data={this.state.latestNumber}/>
                <label className={'previous-ball-label'}> Previous Ball</label>   
                {this.getTile()}
                
        </div>
        );
    }
});

module.exports = Header;