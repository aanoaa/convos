var Events = require('../utils/events.js');
var Dom = require('../utils/dom.js');

module.exports = {
  componentDidMount: function() {
    if (!this.manualBind) this._bindClickAway();
  },
  componentWillUnmount: function() {
    if (!this.manualBind) this._unbindClickAway();
  },
  _checkClickAway: function(e) {
    var el = this.getDOMNode();
    if (!this.isMounted()) return;
    if (e.target == el) return;
    if (Dom.isNodeDescendantOf(e.target, el)) return;
    if (this.componentClickAway) return this.componentClickAway(e);
    if (!this.state.open) return;
    this.open(false);
  },
  _bindClickAway: function() {
    Events.on(document, 'click', this._checkClickAway);
    Events.on(document, 'touchstart', this._checkClickAway);
  },
  _unbindClickAway: function() {
    Events.off(document, 'click', this._checkClickAway);
    Events.off(document, 'touchstart', this._checkClickAway);
  }
};
