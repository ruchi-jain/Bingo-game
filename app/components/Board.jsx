var React = require('react');
var Grid = require('Grid');
var Header = require('Header');
var Button = require('Button');
var $ = require("jquery");
var Modal = require('Modal');

require('../static/styles/bingo.css'); // add `link`
require('!!css-loader!../static/styles/bingo.css'); // just export
require('../static/styles/button.css'); // add `link`
require('!!css-loader!../static/styles/button.css'); // just export

var gridlist1 = [];
var gridlist2 = [];
var gridlist3 = [];
var gridlist4 = [];
var visible = false;

var Board = React.createClass({
    getInitialState: function() {
		return {
            changeVal: 0,
            showModal: false
        };
    },
    handleChange: function(val, previousBallArr) {
        this.previousBallArr = previousBallArr;
        this.setState({changeVal: val});
    },
    onClick: function() {
        var jsonData = {};
        if(gridlist1.length === 25) {
            jsonData = {"selectedItems": gridlist1};
        } else if(gridlist2.length === 25) {
            jsonData = {"selectedItems": gridlist2};
        } else if(gridlist3.length === 25) {
            jsonData = {"selectedItems": gridlist3};
        } else if(gridlist4.length === 25) {
            jsonData = {"selectedItems": gridlist4};
        } else{
            alert("You din't cross all numbers in any of your ticket");
            return;
        }
          $.post("http://localhost:3000/api/check_winner", {data:JSON.stringify(jsonData)},
                 function(result) {
            if(result['response_code'] === 1){
                alert(result['success_msg']);
            }  
            else if (!!result['error_msg']) {
                alert('You are not winner because: ' + result['error_msg']);
            } else {
                alert('unknown reason');
            }
        });  
        
        
    },
    updateGridList1: function(val) {
        gridlist1.push(val);
    },
    updateGridList2: function(val) {
        gridlist2.push(val);
    },
    updateGridList3: function(val) {
        gridlist3.push(val);
    },
    updateGridList4: function(val) {
        gridlist4.push(val);
    },
    showAction: function() {
        var _this= this;
        this.setState({
            showModal: true
        });
        var latestTimer = setTimeout(function() {
          _this.setState({
            showModal: false
        });  
        }, 1000);
        
    },
    render: function() {
        return(
            <div className="board">
                <Header onChange={this.handleChange} showAction={this.showAction} />
                <div className={'row'}>
                    <Grid key={1} style={'col'} drawVal={this.state.changeVal} updateGridList={this.updateGridList1} previousBallArr={this.previousBallArr} />
                    <Grid key={2} style={'col'} drawVal={this.state.changeVal} updateGridList={this.updateGridList2} previousBallArr={this.previousBallArr} />     
                </div>
                <div className={'row'}>
                    <Grid key={3} style={'col'} drawVal={this.state.changeVal} updateGridList={this.updateGridList3} previousBallArr={this.previousBallArr} />
                    <Grid key={4} style={'col'} drawVal={this.state.changeVal} updateGridList={this.updateGridList4} previousBallArr={this.previousBallArr} />
                </div>
                <div className={'row'}>
                    <Button onClick={this.onClick}> Bingo </Button>
                </div>
                <Modal visible={this.state.showModal}>
                    <div className='popup'>{this.state.changeVal}</div></Modal>
            </div>
        );
    }
});
        
module.exports = Board;
