"use strict";
/**
 * Master Component
 * the root component
 */
let React = require("react");
let { RouteHandler } = require("react-router");
let mui = require("material-ui");
let LeftNavBar = require("./components/LeftNavBar.jsx");
let { AppCanvas, AppBar, Styles } = mui;
let ThemeManager = new Styles.ThemeManager();

class Master extends React.Component {

    constructor(props) {
        super(props);
        this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);

        this.state = {
            isThemeDark: false
        };
    }

    getChildContext() {
        return {
          muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    _onLeftIconButtonTouchTap() {
        this.refs.leftNav.toggle();
    }

    onChange(state) {
        this.setState(state);
    }

    changeTheme(){
        if (this.state.isThemeDark) {
          ThemeManager.setTheme(ThemeManager.types.LIGHT);
            }
        else {
          ThemeManager.setTheme(ThemeManager.types.DARK);
        }
        this.setState({ isThemeDark: !this.state.isThemeDark });
    }

    render() {
        return (
            <AppCanvas>
              <AppBar
                onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
                title="NCTU-CSCC"
                zDepth={0} />
              <LeftNavBar ref="leftNav" />
              <RouteHandler {...this.props} />
            </AppCanvas>
        );
    }
}

Master.propTypes = {
    params: React.PropTypes.object.isRequired,
    query: React.PropTypes.object.isRequired
};

Master.contextTypes = {
    router: React.PropTypes.func.isRequired
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;
