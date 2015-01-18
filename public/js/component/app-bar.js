var React = require('react');
var Storage = require('../mixins/storage');
var Notifications = require('../component/notifications');
var RightNav = require('../component/right-nav');
var Search = require('../component/search');
var mui = require('material-ui');

var AppBar = mui.AppBar;

module.exports = React.createClass({
  mixins: [ Storage.mixin({ inputHasFocus: 'inputHasFocus' }) ],
  render: function() {
    var title = "#mojo - 🐯 hear me roar";
    var hide = window.isApple && this.state.inputHasFocus;

    return (
      <AppBar
        onMenuIconButtonTouchTap={this.props.toggleAppMenu}
        title={title}
        className={hide ? 'off' : ''}
        zDepth={0}
      >
        <div className="right">
          <Search />
          <Notifications />
          <RightNav />
        </div>
      </AppBar>
    );
  }
});
