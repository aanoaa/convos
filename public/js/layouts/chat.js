var React = require('react');
var AppBar = require('../component/app-bar');
var RouteHandler = require('react-router').RouteHandler;
var LeftNav = require('../component/left-nav');
var RightNav = require('../component/right-nav');
var Storage = require('../mixins/storage');
var mui = require('material-ui');

var AppCanvas = mui.AppCanvas;

module.exports = React.createClass({
  mixins: [ Storage.mixin({ wideScreen: 'wideScreen' }) ],
  toggleAppMenu: function(e) { this.refs.leftNav.open(); },
  toggleRightMenu: function(e) { this.refs.rightNav.open(); },
  render: function() {
    return (
      <AppCanvas predefinedLayout={1}>
        <div className="mui-app-content-canvas">
          <RouteHandler />
        </div>
        <AppBar
          toggleAppMenu={this.toggleAppMenu}
          toggleNotifications={this.toggleNotifications}
          toggleRightMenu={this.toggleRightMenu}
          toggleSearch={this.toggleSearch}
        />
        <LeftNav ref="leftNav" />
        <RightNav ref="rightNav" />
      </AppCanvas>
    );
  }
});
