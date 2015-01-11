var React = require('react');
var AppBar = require('../component/app-bar');
var RouteHandler = require('react-router').RouteHandler;
var LeftNav = require('../component/left-nav');
var mui = require('material-ui');

var AppCanvas = mui.AppCanvas;

module.exports = React.createClass({
  toggleAppMenu: function(e) { this.refs.leftNav.open(); },
  render: function() {
    return (
      <AppCanvas predefinedLayout={1}>
        <div className="mui-app-content-canvas">
          <RouteHandler />
        </div>
        <AppBar toggleAppMenu={this.toggleAppMenu} />
        <LeftNav ref="leftNav" />
      </AppCanvas>
    );
  }
});
