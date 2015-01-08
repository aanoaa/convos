var React = require('react');

var i = 2;
module.exports = React.createClass({
  render: function() {
    return (<span className="timestamp">{"17:0" + (i++)}</span>);
  }
});
