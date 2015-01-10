var React = require('react');
var Router = require('react-router');
var Storage = require('../mixins/storage');
var mui = require('material-ui');

var Menu = mui.Menu;

Storage.attr('rightNavOpen', function() { return false; }, true);

module.exports = React.createClass({
  mixins: [
    Router.Navigation,
    require('../mixins/click-awayable'),
    Storage.mixin({ open: 'rightNavOpen', docked: 'wideScreen' })
  ],
  componentClickAway: function(e) {
    if ((e.target.parentNode.className || '').indexOf('activate-right-nav') >= 0) return;
    if (!this.state.open) return;
    this.open(false);
    e.preventDefault();
  },
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
    if (arguments.length) return this.store('open', state);
    return this.store('open', !this.state.open);
  },
  render: function() {
    var docked = this.state.docked && this.state.open;

    document.body.classList[docked ? "add" : "remove"]("got-right-sidebar");

    return (
      <Menu
        className="right-nav scrollable"
        hideable={true}
        visible={this.state.open}
        menuItems={this.state.menuItems}
        onItemClick={this.onSelect}
      />
    );
  }
});
