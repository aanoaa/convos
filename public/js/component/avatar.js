var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <span className="avatar">
        <img src={this.props.image} title={this.props.title} alt="" onClick={this.props.onClick} />
      </span>
    );
  }
});
