var React = require('react');
var Storage = require('../mixins/storage');
var mui = require('material-ui');

var AppBar = mui.AppBar;
var IconButton = mui.IconButton;

module.exports = React.createClass({
  mixins: [ Storage.mixin({ inputHasFocus: 'inputHasFocus' }) ],
  render: function() {
    var title = "#mojo";
    var hide = window.isApple && this.state.inputHasFocus;

    return (
      <AppBar
        onMenuIconButtonTouchTap={this.props.toggleAppMenu}
        title={title}
        className={hide ? 'hidden' : ''}
        zDepth={0}
      >
        <div className="right">
          <IconButton icon="action-search" onTouchTap={this.props.toggleSearch} />
          <IconButton icon="social-notifications" onTouchTap={this.props.toggleNotifications} />
          <IconButton className="activate-right-nav" icon="navigation-more-vert" onTouchTap={this.props.toggleRightMenu} />
        </div>
      </AppBar>
    );
  }
});
