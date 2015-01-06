var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Navbar = require('./navbar');

module.exports = React.createClass({
  render: function() {
    return (
      <div id="app">
        <Navbar/>
        <RouteHandler/>
      </div>
    );
  }
});
