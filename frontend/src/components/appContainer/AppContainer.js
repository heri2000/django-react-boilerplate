import React from "react";
import {
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import {
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  H_GetLangFromUrl,
  H_GetTranslation,
  H_GetRouteStringFromUrl,
} from "../../libs/Libs";
import { logout } from "../login/LoginActions";

import "./AppContainer.css";

import flagEn from "../../assets/flag-en.png";
import flagId from "../../assets/flag-id.png";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    AppContainer.defaultProps = {
      title: "",
    };

    this.state = {
      appHeaderHeight : 35,
    };
  }

  onLogout = () => {
    this.props.logout();
  };

  render() {
    const appHeaderStyle = { height: this.state.appHeaderHeight + "px", };
    return(
      <div className="AppContainer" onClick={this.appContainerClicked}>
        <div className="AppHeader" style={appHeaderStyle}>
          <div className="AppHeaderItemLeft">
            <MainMenuButton />
          </div>
          <div className="AppHeaderItemCenter">
            <AppTitle title={this.props.title} />
          </div>
          <div className="AppHeaderItemRight">
            <LanguageAndLogout
              appContainerState={this.state}
              onLogout={this.onLogout}
            />
          </div>
        </div>
        <div className="AppWorkspace">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function MainMenuButton() {
  const translation = H_GetTranslation();
  const lang = H_GetLangFromUrl();
  const mainMenuTo = "/" + lang + "/mainmenu";
  return(
    <Switch>
      <Route path="/" exact />
      <Route path="/:lang" exact />
      <Route path="/:lang/login" exact />
      <Route path="/:lang/signup" exact />
      <Route path="/:lang/mainmenu" exact />
      <Route path="*">
        <Link to={mainMenuTo} className="MainMenuButton1" target="_blank">
          <div className="AppHeaderItem MainMenuButton2">
            <div className="MainMenuButton3">{translation.global.mainMenu}</div>
          </div>
        </Link>
      </Route>
    </Switch>
  );
}

function AppTitle(props) {
  return(
    <div className="AppTitle">{props.title}</div>
  );
}

function LanguageAndLogout(props) {
  const lang = H_GetLangFromUrl();
  const translation = H_GetTranslation();
  let flagImg = flagEn;
  if (lang === "id") flagImg = flagId;
  const user = JSON.parse(localStorage.getItem('user'));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLanguageButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  }

  const handleLanguageMenuClick = (event) => {
    handleLanguageMenuClose();
  }

  const routeString = H_GetRouteStringFromUrl();
  const routeStringEn = "/en" + routeString;
  const routeStringId = "/id" + routeString;

  return(
    <div className="LanguageAndLogoutItem">
      <div className="LanguageButton1">
        <Button
          className="LanguageButton2"
          variant="outlined"
          color="primary"
          aria-label="Language"
          title="Language"
          aria-controls="language-selection-menu"
          onClick={handleLanguageButtonClick}
        >
          <img src={flagImg} alt={translation.global.language} title={translation.global.language} />
        </Button>
        <Menu
          id="language-selection-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleLanguageMenuClose}
        >
          <MenuItem id="language-menu-en" onClick={handleLanguageMenuClick}>
            <Link to={routeStringEn} className="LanguageMenuLink"><img src={flagEn} alt="Flag icon" />&nbsp;{H_GetTranslation("en").global.languageTitle}</Link>
          </MenuItem>
          <MenuItem id="language-menu-id" onClick={handleLanguageMenuClick}>
            <Link to={routeStringId} className="LanguageMenuLink"><img src={flagId} alt="Flag icon" />&nbsp;{H_GetTranslation("id").global.languageTitle}</Link>
          </MenuItem>
        </Menu>
      </div>
      <div className="LogoutButton1">
        <Switch>
          <Route path="/" exact />
          <Route path="/:lang" exact />
          <Route path="/:lang/login" exact />
          <Route path="/:lang/signup" exact />
          <Route path="*">
            <div className="DisplayUserName">
              [ {user ? user.username : ''} ]
            </div>
            <Button
              variant="outlined"
              color="primary"
              className="LogoutButton2"
              onClick={props.onLogout}
            >
              {translation.global.logout}
            </Button>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

AppContainer.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(AppContainer));
