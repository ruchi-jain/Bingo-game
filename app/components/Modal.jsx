var React = require('react');

require('../static/styles/modal.css'); // add `link`
var exportedStyles = require('!!css-loader!../static/styles/modal.css'); // just export

/* This component is for rendering Modal. It expects one prop:
 * 1. A prop indicating children (this.props.children)
 * 2. A prop indicating modal will show or hide (this.props.visible)
 * closeModal prop state in parent component should be set either true or false to display or close the modal.
 */

var Modal = React.createClass({
	
	getInitialState: function() {
		return{
			visible: this.props.visible || false
		}		
	},
  
	componentWillReceiveProps: function(nextProps){
			this.setState({
				visible: nextProps.visible
			}) 
    },
	
    // Clicking outside the modal will cause nothing 
	render: function () {
		if(this.state.visible) {
			return (	
					<div>
						<div className="modal-container">
							{this.props.children}    		  
						</div>
					</div>
		  		)
		}
		else {
			return null;
			}
		}
});
module.exports= Modal;
