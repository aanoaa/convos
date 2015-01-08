var React = require('react');
var Timestamp = require('../component/timestamp');
var Input = require('../component/input');

var mui = require('material-ui');
var IconButton = mui.IconButton;
var Paper = mui.Paper;

var loremIpsum = require('lorem-ipsum')

var Message = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <li>
        <IconButton icon="social-person" />
        <div className="content">
          <h4>{data.sender}</h4>
          <p>{loremIpsum()}</p>
        </div>
        <Timestamp />
      </li>
    );
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      messages: ["Joe","Sarah","Bill"].map(function(i) { return { sender: i }; })
    };
  },
  render: function() {
    var messages = this.state.messages.map(function(m) { return <Message data={m} />; });
    return (
      <div className="content-wrapper">
        <ul className="message-list">{messages}</ul>
        <Input />
      </div>
    );
  }
});
