var React = require('react');
var Storage = require('./storage');

module.exports.Icon = React.createClass({
  render: function() {
    return <i className={'fa fa-' + this.props.name}/>;
  }
});

module.exports.SidebarLink = React.createClass({
  mixins: [ Storage.mixin({ active: 'activeSidebar' }) ],
  onClick: function(e) {
    e.preventDefault();
    this.store('active', this.state.active == this.props.to ? '' : this.props.to);
  },
  render: function() {
    var className = ['btn-sidebar']

    if (this.state.active == this.props.to) className.push('active');

    return (
      <a href={'sidebar://' + this.props.to} title={this.props.title} className={className.join(' ')} onClick={this.onClick}>
        {this.props.children}
      </a>
    );
  }
});
