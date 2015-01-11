var React = require('react/addons');
var Router = require('react-router');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Storage = require('./mixins/storage');
var window = require('./utils/window');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

Storage.attr('activeSidebar', function() { return ''; });
Storage.attr('doNotDisturb', function() { return false; });
Storage.attr('inputHasFocus', function() { return false; });
Storage.attr('notificationsOpen', function() { return false; });
Storage.attr('nNotifications', function() { return 0; });
Storage.attr('rightNavOpen', function() { return false; }, true);
Storage.attr('scrolledToBottom', function() { return false; });
Storage.attr('searchOpen', function() { return false; });
Storage.attr('wideScreen', function() { return false; });

var routes = (
  <Route name="index" path="/" handler={require('./layouts/chat')}>
    <Route name="conversation" path=":connection_id/:conversation_id" handler={require('./controller/conversation')}/>
    <DefaultRoute handler={require('./controller/conversation')}/>
  </Route>
);

// Can go away when react 1.0 release
injectTapEventPlugin();

Router.run(
  routes,
  Router.HistoryLocation,
  function(Handler, state) {
    React.render(<Handler/>, document.body);
  }
);
