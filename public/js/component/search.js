var React = require('react');
var Storage = require('../mixins/storage');
var mui = require('material-ui');

var IconButton = mui.IconButton;
var Input = mui.Input;
var Paper = mui.Paper;

var SearchResult = React.createClass({
  render: function() {
    return (
      <li>
        Result
      </li>
    );
  }
});

module.exports = React.createClass({
  mixins: [
    require('../mixins/click-awayable'),
    Storage.mixin({ open: 'searchOpen' })
  ],
  defaultSearchResults: function() {
    return [];
  },
  getInitialState: function() {
    return { searchResults: [] };
  },
  open: function(state) {
    this.store('open', typeof state === 'boolean' ? state : !this.state.open);
    if (this.state.open) this.refs.input.focus();
  },
  search: function() {
    TODO(this.refs.input.getValue());
  },
  render: function() {
    var classNames = ['search'];
    var searchResults = this.state.searchResults.map(function(i) { return <SearchResult data={i} />; });

    if (!searchResults.length) searchResults = this.defaultSearchResults();
    if (this.state.open) classNames.push('active');

    return (
      <div className={"app-bar-dropdown search " + (this.state.open ? "on" : "off")}>
        <IconButton icon="action-search" onTouchTap={this.open} />
        <Paper ref="inner" className={this.state.open ? "" : "off"}>
          <div className="header">
            <IconButton icon="action-search" onTouchTap={this.search} />
            <Input ref="input" type="text" name="search_field" />
          </div>
          <div ref="scrollable" className="scrollable">
            <ul>{searchResults}</ul>
          </div>
        </Paper>
      </div>
    );
  }
});
