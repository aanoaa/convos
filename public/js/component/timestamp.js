var React = require('react');

var i = 2;
module.exports = React.createClass({
  render: function() {
    return (<span className="timestamp">{"17:" + (++i < 10 ? '0' + i : i)}</span>);
  }
});
