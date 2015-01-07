var React = require('react/addons');
var Router = require('react-router');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Storage = require('./component/storage');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

Storage.attr('nNotifications', function() { return 0; });
Storage.attr('activeSidebar', function() { return ''; });

var routes = (
  <Route name="index" path="/" handler={require('./component/app')}>
    <Route name="conversation" path=":connection_id/:conversation_id" handler={require('./controller/conversation')}/>
    <DefaultRoute handler={require('./controller/index')}/>
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
