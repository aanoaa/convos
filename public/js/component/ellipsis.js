var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return { component: React.DOM.div };
  },
  truncateText: function() {
    var el = this.getDOMNode();
    while ((el.scrollHeight - el.offsetHeight) >= 1) {
      if (el.textContent === '...') break;
      el.textContent = el.textContent.replace(/.(\.\.\.)?$/, '...');
    }
  },
  componentDidMount: function() { this.truncateText(); },
  componentDidUpdate: function() { this.truncateText(); },
  render: function () {
    return this.transferPropsTo(this.props.component(null, this.props.children));
  }
});
