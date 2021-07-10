import React from "react";
import {
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import {
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  APP_DEFAULT_LANG,
} from "../../Const";
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
      showLanguageSelectionDialog: false,
      appHeaderHeight : 34,
      windowHeight: 0,
      langButtonPositionX: 0,
      langButtonWidth: 0,
    };

    this.langButtonRef = null;
    this.assignLangButtonRef = element => {
      this.langButtonRef = element;
    }

    this.setLang = (lang) => {
      let sls = !this.state.showLanguageSelectionDialog;
      this.setState({showLanguageSelectionDialog: sls});
    }

    this.appContainerClicked = () => {
      if (this.state.showLanguageSelectionDialog) this.setState({showLanguageSelectionDialog: false});
    };
  }

  onLogout = () => {
    this.props.logout();
  };

  componentDidMount() {
    if (this.langButtonRef != null) {
      this.setState({langButtonPositionX: this.langButtonRef.getBoundingClientRect().left});
      this.setState({langButtonWidth: this.langButtonRef.getBoundingClientRect().width});
    }

    this.handleResize = () => {
      if (this.langButtonRef != null) {
        this.setState({
          langButtonPositionX: this.langButtonRef.getBoundingClientRect().left,
          windowHeight: window.innerHeight,
        });
      }
    }
    window.addEventListener("resize", this.handleResize);
  }

  render() {
    let appHeaderStyle = { height: this.state.appHeaderHeight + "px", };
    let appWorkspaceStyle = {
      paddingTop: this.state.appHeaderHeight + "px",
      height: (this.state.windowHeight - this.state.appHeaderHeight) + "px",
    };
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
              setLang={this.setLang}
              assignLangButtonRef={this.assignLangButtonRef}
              onLogout={this.onLogout}
            />
          </div>
        </div>
        <div className="AppWorkspace" style={appWorkspaceStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function MainMenuButton() {
  let translation = H_GetTranslation();
  let lang = H_GetLangFromUrl();
  if (lang === "") lang = APP_DEFAULT_LANG;
  let mainMenuTo = "/" + lang + "/mainmenu";
  return(
    <Switch>
      <Route path="/" exact />
      <Route path="/:lang" exact />
      <Route path="/:lang/login" exact />
      <Route path="/:lang/signup" exact />
      <Route path="/:lang/mainmenu" exact />
      <Route path="*">
        <div className="AppHeaderItem MainMenuButton1">
          <Link to={mainMenuTo} className="MainMenuButton2" target="_blank">{translation.global.mainMenu}</Link>
        </div>
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
  let lang = H_GetLangFromUrl();
  let translation = H_GetTranslation();
  let flagImg = flagEn;
  if (lang === "id") flagImg = flagId;
  let languageSelectionDialog = <></>;
  if (props.appContainerState.showLanguageSelectionDialog) {
    let languageSelectionDialogWidth = 180;
    let style = {
      left: (props.appContainerState.langButtonPositionX + props.appContainerState.langButtonWidth - languageSelectionDialogWidth) + "px",
      width: languageSelectionDialogWidth + "px",
    };
    let routeString = H_GetRouteStringFromUrl();
    let routeStringEn = "/en" + routeString;
    let routeStringId = "/id" + routeString;
    languageSelectionDialog = (
      <div className="LanguageSelectionDialog" style={style}>
        <div className="LanguageSelectionOption">
          <Link to={routeStringEn} onClick={props.setLang.bind(this, "en")}>
            <img src={flagEn} alt="Flag icon" />
            <span>{H_GetTranslation("en").global.languageTitle}</span>
          </Link>
        </div>
        <div className="LanguageSelectionOption">
          <Link to={routeStringId} onClick={props.setLang.bind(this, "id")}>
            <img src={flagId} alt="Flag icon" />
            <span>{H_GetTranslation("id").global.languageTitle}</span>
          </Link>
        </div>
      </div>
    );
  }
  const user = JSON.parse(localStorage.getItem('user'));;
  return(
    <div className="LanguageAndLogoutItem">
      <div className="LanguageButton1">
        <Button
          className="LanguageButton2"
          variant="outlined"
          color="primary"
          aria-label="Language"
          title="Language"
          onClick={props.setLang}
          ref={props.assignLangButtonRef}
        >
          <img src={flagImg} alt={translation.global.language} title={translation.global.language} />
        </Button>
        {languageSelectionDialog}
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
