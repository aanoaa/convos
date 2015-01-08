module.exports = {
  isNodeDescendantOf: function(node, parent) {
    while (node != null) {
      if (node == parent) return true;
      node = node.parentNode;
    }
    return false;
  },
};
