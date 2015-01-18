var React = require('react');
var Storage = require('../mixins/storage');
var mui = require('material-ui');

var Menu = mui.Menu;
var IconButton = mui.IconButton;

module.exports = React.createClass({
  mixins: [
    require('../mixins/click-awayable'),
    Storage.mixin({ open: 'rightNavOpen', docked: 'wideScreen' })
  ],
  onSelect: function(e, i, payload) {
    console.log(payload);
  },
  getInitialState: function() {
    return {
      menuItems: [
        { text: "jberger", route: "conversation" },
        { text: "batman", route: "conversation" },
        { text: "marcus", route: "conversation" },
        { text: "sri", route: "conversation" },
        { text: "tempire", route: "conversation" }
      ]
    };
  },
  open: function(state) {
    if (typeof state === 'boolean' && this.state.docked) return;
    this.store('open', typeof state === 'boolean' ? state : !this.state.open);
  },
  render: function() {
    var docked = this.state.docked && this.state.open;

    document.body.classList[docked ? "add" : "remove"]("got-right-sidebar");

    return (
      <div className="right-nav">
        <IconButton className="activate-right-nav" icon="navigation-more-vert" onTouchTap={this.open} />
        <Menu
          className="right-nav scrollable"
          hideable={true}
          visible={this.state.open}
          menuItems={this.state.menuItems}
          onItemClick={this.onSelect}
        />
      </div>
    );
  }
});
