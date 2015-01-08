var React = require('react');
var mui = require('material-ui');
var IconButton = mui.IconButton;

module.exports = React.createClass({
  onKeyDown: function(e) {
    console.log(e.keyCode);
  },
  render: function() {
    return (
      <div className="message-input-wrapper">
        <IconButton icon="social-person" />
        <div className="mui-input mui-text">
          <input name="inputField" type="text" placeholder="What's on your mind?" onKeyDown={this.onKeyDown} />
          <span className="mui-input-highlight"/>
          <span className="mui-input-bar"/>
        </div>
      </div>
    );
  }
});
