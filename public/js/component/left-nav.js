var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var Storage = require('../mixins/storage');

var LeftNav = mui.LeftNav;

module.exports = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
    Storage.mixin({ docked: 'wideScreen' })
  ],
  getSelectedIndex: function() {
    var items = this.state.menuItems;

    for (var i = 0; i< items.length; i++) {
      if (items[i].route && this.isActive(items[i].route)) return i;
    };

    return false;
  },
  onChange: function(e, i, payload) {
    if (payload.connection) {
      this.transitionTo("connection", { id: payload.connection });
    }
    else if (payload.route) {
      this.transitionTo(payload.route);
    }
    else {
      console.log(payload);
    }
  },
  getInitialState: function() {
    return {
      open: false,
      menuItems: [
        { text: "Edit profile", route: "profile", icon: "action-account-circle" },
        { text: "Help", icon: "action-help" },
        { text: "Logout", icon: "action-exit-to-app" },
        { type: mui.MenuItem.Types.SUBHEADER, text: 'Connections' },
        { text: "Freenode", connection: "freenode", icon: "action-settings" },
        { text: "Magnet", connection: "magnet", icon: "action-settings" },
        { text: "Add...", route: "connection.add", icon: "content-add-circle" }
      ]
    };
  },
  open: function(state) {
    if (state === false) {
      this.setState({ open: state });
      this.refs.nav.close();
    }
    else if (state === true) {
      this.setState({ open: state });
      this.refs.nav.open();
    }
    else {
      this.setState({ open: !this.state.open });
      this.refs.nav.toggle();
    }
  },
  render: function() {
    var docked = this.state.docked;
    var header = (<h1 onTouchTap={this.open}>Convos</h1>);

    return (
      <LeftNav
        docked={docked && this.state.open}
        header={header}
        isInitiallyOpen={false}
        menuItems={this.state.menuItems}
        onChange={this.onChange}
        ref="nav"
        selectedIndex={this.getSelectedIndex()}
      />
    );
  }
});
