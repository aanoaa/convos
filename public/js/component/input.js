var React = require('react');
var Storage = require('../mixins/storage');
var Avatar = require('../component/avatar');

module.exports = React.createClass({
  mixins: [ Storage.mixin({ scrolledToBottom: 'scrolledToBottom' }) ],
  componentDidMount: function() {
    var node = this.getDOMNode();
    this.lastScrollTop = document.body.scrollTop;
    window.addEventListener('scroll', this.onScroll);
  },
  componentDidUnMount: function() {
    window.addEventListener('scroll', this.onScroll);
  },
  focus: function() {
    this.refs.field.getDOMNode().focus();
  },
  onBlur: function() {
    this.store('inputHasFocus', false);
  },
  onChange: function(e) {}, // required, or the input field will be read-only
  onFocus: function() {
    this.store('inputHasFocus', true);
  },
  onKeyDown: function(e) {
    console.log(e.keyCode);
  },
  onScroll: function(e) {
    var scrollTop = document.body.scrollTop;
    if (this.state.hidden && scrollTop > this.lastScrollTop) { // scrolling down
      this.setState({ hidden: false });
    }
    else if(!this.state.hidden && scrollTop < this.lastScrollTop) {
      this.setState({ hidden: true });
    }
    else if(Math.abs(this.lastScrollTop - scrollTop) > 60) {
      this.lastScrollTop = scrollTop;
    }
  },
  render: function() {
    var classNames = ['message-input-wrapper'];

    if (!this.state.scrolledToBottom) {
      classNames.push('not-at-bottom');
      if (this.state.hidden) classNames.push('off');
    }

    return (
      <div className={classNames.join(' ')}>
        <Avatar image="http://s.gravatar.com/avatar/806800a3aeddbad6af673dade958933b?s=40" onClick={this.focus} />
        <div className="mui-input mui-text">
          <input
            name="input_field"
            placeholder="What's on your mind?"
            ref="field"
            type="text"
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onKeyDown={this.onKeyDown}
          />
          <span className="mui-input-bar"/>
        </div>
      </div>
    );
  }
});
