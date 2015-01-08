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
    this.componentClickAway(e);
  },
  _bindClickAway: function() {
    Events.on(document, 'click', this._checkClickAway);
  },
  _unbindClickAway: function() {
    Events.off(document, 'click', this._checkClickAway);
  }
};
