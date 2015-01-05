var React = require('react');
var Icon = require('./helpers').Icon;
var SidebarLink = require('./helpers').SidebarLink;
var Storage = require('./storage');

module.exports = React.createClass({
  mixins: [ Storage.mixin({ notifications: 'nNotifications' }) ],
  render: function() {
    return (
      <nav className="bar">
        <div className="right">
          <SidebarLink to="goto-anything" title="Goto anything"><Icon name="bars"/></SidebarLink>
          <SidebarLink to="notifications-list" title="Show notifications">
            <Icon name="bell-o"/>
            <b>{this.state.notifications}</b>
          </SidebarLink>
          <SidebarLink to="settings" title="Conversation settings"><Icon name="cog"/></SidebarLink>
        </div>
      </nav>
    );
  },
});
