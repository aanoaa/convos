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
  toggleSearch: function(e) {
    alert("search");
  },
  toggleRightMenu: function(e) {
    this.refs.rightNav.open();
  },
  render: function() {
    var title = "#mojo";

    return (
      <AppCanvas predefinedLayout={1}>
        <AppBar
        onMenuIconButtonTouchTap={this.toggleAppMenu}
        onClick={this.onMenuIconButtonTouchTap}
        title={title}
        zDepth={0}
        >
          <div className="right">
            <IconButton icon="action-search" onTouchTap={this.toggleSearch} />
            <IconButton icon="social-notifications" onTouchTap={this.toggleNotifications} />
            <IconButton className="activate-right-nav" icon="navigation-more-vert" onTouchTap={this.toggleRightMenu} />
          </div>
        </AppBar>

        <div className="mui-app-content-canvas">
          <RouteHandler />
        </div>

        <LeftNav ref="leftNav" />
        <RightNav ref="rightNav" />
      </AppCanvas>
    );
  }
});
