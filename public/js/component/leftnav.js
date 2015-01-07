var React = require('react');
var Storage = require('./storage');

var mui = require('material-ui');
var LeftNav = mui.LeftNav;
var Menu = mui.Menu;

module.exports = React.createClass({
  mixins: [ Storage.mixin({ docked: 'wideScreen' }) ],
  change: function(e) {
    console.log(e);
  },
  menuItems: function() {
    var items = [];

    items = [
      { text: 'Get topic' },
      { text: 'Close chat' },
      { text: 'Settings' },
      { text: 'Help' }
    ];

    return items;
  },
  render: function() {
    var docked = this.state.docked;

    if (docked) {
      return <Menu ref="menuItems" zDepth={0} menuItems={this.menuItems()} />
    }
    else {
      return <LeftNav docked={docked} menuItems={this.menuItems()} ref="leftNav" onChange={this.change} />
    }
  }
});
