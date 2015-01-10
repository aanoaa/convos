var React = require('react');
var AutoupdateTime = require('react-autoupdate-time');
var Avatar = require('../component/avatar');
var Input = require('../component/input');
var loremIpsum = require('lorem-ipsum')

var Message = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <li>
        <Avatar image="https://secure.gravatar.com/avatar/4a49eb49e0b98ed1a1fb30b7d39baac3?s=40" />
        <div className="content">
          <h4>{data.sender}</h4>
          <AutoupdateTime value={data.timestamp} interval={10000} />
          <p>{data.message}</p>
        </div>
      </li>
    );
  }
});

module.exports = React.createClass({
  componentDidMount: function() {
    window.scrollToBottom();
  },
  getInitialState: function() {
    return {
      messages: ["Joe","Sarah","Joe","Joe","Bill","Sarah","Bill"].map(function(i) {
        return { sender: i, message: loremIpsum(), timestamp: new Date() };
      })
    };
  },
  render: function() {
    var messages = this.state.messages.map(function(m) { return <Message data={m} />; });
    return (
      <div className="content-wrapper">
        <ul className="conversation">{messages}</ul>
        <Input />
      </div>
    );
  }
});
