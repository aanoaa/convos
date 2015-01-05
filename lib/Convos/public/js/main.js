var React = require('react');
var Router = require('react-router');
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

Router.run(
  routes,
  Router.HistoryLocation,
  function(Handler, state) {
    React.render(<Handler/>, document.getElementById('app'));
  }
);
