var React = require('react');
var Grid = require('Grid');
var Header = require('Header');

require('../static/styles/bingo.css'); // add `link`
var exportedStyles = require('!!css-loader!../static/styles/bingo.css'); // just export

var Board = React.createClass({
    getInitialState() {
        return {
            changeVal: 0,
        };
    },
    handleChange: function(val) {
        this.setState({changeVal: val});
    },
    render: function() {
        return(
            <div className="board">
                <Header onChange={this.handleChange}  />
                <div className={'row'}>
                    <Grid style={'col'} drawVal={this.state.changeVal} />
                    <Grid style={'col'} drawVal={this.state.changeVal} />     
                </div>
                <div className={'row'}>
                    <Grid style={'col'} drawVal={this.state.changeVal} />
                    <Grid style={'col'} drawVal={this.state.changeVal}/>
                </div>
            </div>
        );
    }
});
        
module.exports = Board;
