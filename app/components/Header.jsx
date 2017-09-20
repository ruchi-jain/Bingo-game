var React = require('react');
var Tile = require('Tile');
var $ = require("jquery");
//var Modal = require('Modal');

var previousBallArr = new Array(5);
require('../static/styles/bingo.css'); // add `link`
var exportedStyles = require('!!css-loader!../static/styles/bingo.css'); // just export

var Header = React.createClass({
    getInitialState: function() {
		return {
			latestNumber: 0
		}
	},
    request: function (_this) {
        $.get("http://localhost:3000/api/random_ball", function(result){
            if(result['response_code'] === 1 && result.number !== undefined) {
                 //_this.props.visible(true);
                 //setTimeout(function() { _this.props.visible(false); }, 10000);
                 _this.setState({
				latestNumber: result.number
                });
                previousBallArr.push(result.number);
                _this.props.onChange(result.number, previousBallArr);
            } else if (!!result['error_msg']) {
                alert('You are not winner because: ' + result['error_msg']);
                clearTimeout(this.latestTimer);
                return;
            } else {
                alert('unknown reason');
                clearTimeout(this.latestTimer);
                return;
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
        if(previousBallArr.length !== 0){
            if (previousBallArr.length > 5) {
               previousBallArr.shift(); // removes the first element from an array 
             }
        return (previousBallArr.map(function(option, i) {                                 
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
                <label className={'previous-ball-label'}> Previous Ball</label> 
                <Tile style={'cell last-ball-tile'} data={this.state.latestNumber}/>                  
                {this.getTile()}                
        </div>
        );
    }
});

module.exports = Header;