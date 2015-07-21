let React = require("react");
let { LeftNav, Styles } = require("material-ui");
let { Colors, Spacing, Typography } = Styles;

var menuItems = [
	<% for(var i in routers) { %>{ route: "<%= routers[i] %>", text: "<%= routers[i]%>" }<% if (i!=routers.length-1) { %>,
    <% }} %>
];


class LeftNavBar extends React.Component {

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onHeaderClick = this._onHeaderClick.bind(this);
  }

  getStyles() {
    return {
      cursor: "pointer",
      //.mui-font-style-headline
      fontSize: "24px",
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + "px",
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: "0px",
      marginBottom: "8px"
    };
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  }

  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  }

  _onHeaderClick() {
    this.context.router.transitionTo("<%= routers[0]%>");
    this.refs.leftNav.close();
  }

  render() {
    let header = (
      <div style={this.getStyles()} onTouchTap={this._onHeaderClick}>
        NCTU-<%= title%>
      </div>
    );

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  }

}

LeftNavBar.contextTypes = {
  router: React.PropTypes.func
};

module.exports = LeftNavBar;
