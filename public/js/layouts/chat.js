var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var LeftNav = require('../component/left-nav');
var RightNav = require('../component/right-nav');
var Storage = require('../mixins/storage');
var mui = require('material-ui');

var AppCanvas = mui.AppCanvas;
var AppBar = mui.AppBar;
var IconButton = mui.IconButton;

module.exports = React.createClass({
  mixins: [ Storage.mixin({ wideScreen: 'wideScreen' }) ],
  toggleAppMenu: function(e) {
    this.refs.leftNav.open();
  },
  toggleNotifications: function(e) {
    alert("notifications");
  },
  toggleRightMenu: function(e) {
    this.refs.rightNav.open();
  },
  render: function() {
    var title = "#mojo - 🐯 hear me roar";
    var icons = [<IconButton icon="social-notifications" onTouchTap={this.toggleNotifications} />];

    if (!this.state.wideScreen) {
      icons.push(<IconButton className="activate-right-nav" icon="navigation-more-vert" onTouchTap={this.toggleRightMenu} />);
    }

    return (
      <AppCanvas predefinedLayout={1}>
        <AppBar
        onMenuIconButtonTouchTap={this.toggleAppMenu}
        onClick={this.onMenuIconButtonTouchTap}
        title={title}
        zDepth={0}
        >
          <div className="right">{icons}</div>
        </AppBar>
        <LeftNav ref="leftNav" />
        <RightNav ref="rightNav" />
        <RouteHandler/>
      </AppCanvas>
    );
  }
});
