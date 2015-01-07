var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var Storage = require('../mixins/storage');

var Menu = mui.Menu;

module.exports = React.createClass({
  mixins: [
    Router.Navigation,
    require('../mixins/click-awayable'),
    Storage.mixin({ docked: 'wideScreen' })
  ],
  componentClickAway: function(e) {
    if ((e.target.className || '').indexOf('activate-right-nav') >= 0) return;
    if (this.state.open) this.open(false);
    e.preventDefault();
  },
  onChange: function(e, i, payload) {
    console.log(payload);
  },
  getInitialState: function() {
    return {
      open: false,
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
    if (arguments.length) return this.setState({ open: state });
    return this.setState({ open: !this.state.open });
  },
  render: function() {
    var visible = this.state.docked || this.state.open;

    return (
      <Menu
        className={"right-nav " + (visible ? "visible" : "hidden")}
        menuItems={this.state.menuItems}
      />
    );
  }
});
