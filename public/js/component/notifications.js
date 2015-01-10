var React = require('react');
var Ellipsis = require('./ellipsis');
var Storage = require('../mixins/storage');
var loremIpsum = require('lorem-ipsum')
var mui = require('material-ui');

var IconButton = mui.IconButton;
var Paper = mui.Paper;

var Notification = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <li>
        <div className="content">
          <h4>{data.sender}</h4>
          <Ellipsis component={React.DOM.p}>{data.message}</Ellipsis>
        </div>
      </li>
    );
  }
});

module.exports = React.createClass({
  mixins: [
    require('../mixins/click-awayable'),
    Storage.mixin({ doNotDisturb: 'doNotDisturb', open: 'notificationsOpen' })
  ],
  componentClickAway: function(e) {
    if (!this.state.open) return;
    this.open(false);
    e.preventDefault();
  },
  getInitialState: function() {
    return {
      notifications: ["Joe","Joe","Bill","Joe","Joe","Bill","Joe","Sarah","Sarah","Bill"].map(function(i) {
        return { sender: i, message: loremIpsum() };
      })
    };
  },
  markAllAsRead: function() {
    TODO("Mark all as read");
  },
  open: function(state) {
    this.refs.scrollable.getDOMNode().style.maxHeight = (window.innerHeight - 80) + 'px';
    if (arguments.length) return this.store('open', state);
    return this.store('open', !this.state.open);
  },
  toggleDoNotDisturb: function() {
    this.store('doNotDisturb', !this.state.doNotDisturb);
  },
  render: function() {
    var notifications = this.state.notifications.map(function(i) { return <Notification data={i} /> });
    var dnd = this.state.doNotDisturb;

    return (
      <div className="notifications">
        <IconButton className="activate-notifications" icon="social-notifications" onTouchTap={this.open} />
        <Paper ref="inner" className={this.state.open ? '' : 'off'}>
          <h3>
            Notifications
            <IconButton tooltip={"Turn notifications " + (dnd ? "on" : "off")} icon={"social-notifications-" + (dnd ? "off" : "on")} onTouchTap={this.toggleDoNotDisturb} />
            <IconButton tooltip="Mark all as read" icon="action-done" onTouchTap={this.markAllAsRead} />
          </h3>
          <div ref="scrollable" className="scrollable">
            <ul>{notifications}</ul>
          </div>
        </Paper>
      </div>
    );
  }
});
