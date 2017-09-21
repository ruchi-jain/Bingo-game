var React = require('react');

require('../static/styles/button.css'); // add `link`
var exportedStyles = require('!!css-loader!../static/styles/button.css'); // just export

/* This component is for rendering a button.
 * @props onClick {Function} - The callback function when click this button
 */

var Button = React.createClass({
    render: function () {
        return (
                <div 
                     className="button"
                     onClick={this.props.onClick}>
                    {this.props.children}
                </div>
                );
    }
});

module.exports = Button;
