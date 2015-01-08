window.localStorage = window.localStorage || {};

var id = 0;
var accessor = {};
var storage = {};
var callbacks = {};

// window.__storage = storage;

module.exports.attr = function(name, builder, persistent) {
  if (!persistent) delete window.localStorage[name];
  accessor[name] = function(value) {
    if (!arguments.length) {
      return (
          storage.hasOwnProperty(name) ? storage[name]
        : window.localStorage.hasOwnProperty(name) ? window.localStorage[name]
        : builder()
      );
    }
    if (persistent) window.localStorage[name] = value;
    storage[name] = value;
    for (k in callbacks) callbacks[k](name, value);
    return this;
  };
};

module.exports.clear = function(name) {
  var value = accessor[name]();
  delete storage[name];
  return value;
};

module.exports.set = function(name, value) {
  accessor[name](value);
};

// mixin({ stateName: "accessorName", ... });
module.exports.mixin = function(state2accessor) {
  var accessor2state = {};

  for (k in state2accessor) accessor2state[state2accessor[k]] = k;

  var setState = function(name, value) {
    var state = {};
    if (!accessor2state[name]) return;
    state[accessor2state[name]] = value;
    this.setState(state);
  };

  return {
    componentDidMount: function() {
      this.storageId = id++;
      callbacks[this.storageId] = setState.bind(this);
    },
    componentWillUnmount: function() {
      delete callbacks[this.storageId];
    },
    getInitialState: function() {
      var state = {};
      for (k in state2accessor) state[k] = accessor[state2accessor[k]]();
      return state;
    },
    store: function(k, v) {
      var name = state2accessor[k];
      if (name) accessor[name](v);
    }
  };
};
