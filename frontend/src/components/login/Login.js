import React from "react";
import {
  Container,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Input,
  InputLabel,
  FilledInput,
  OutlinedInput,
  Button,
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import {
  Link,
  withRouter
} from "react-router-dom";
import {
  connect
} from "react-redux";
import PropTypes from "prop-types";

import {
  getTabTitle,
  APP_DEFAULT_LANG,
} from "../../utils/Common";
import {
  H_GetLangFromUrl,
  H_GetTranslation,
} from "../../libs/Libs";
import { login } from "./LoginActions.js";
import AppContainer from "../appContainer/AppContainer";

import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showPassword: false,
    };

    this.handleClickShowPassword = () => {
      this.setState({ showPassword: !this.state.showPassword });
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onLoginClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    // console.log("Login " + userData.username + " :: " + userData.password);
    let lang = H_GetLangFromUrl();
    if (lang === "") lang = APP_DEFAULT_LANG;
    this.props.login(userData, "/" + lang + "/mainmenu");
  }

  render() {
    let translation = H_GetTranslation();
    document.title = getTabTitle(translation.login.moduleTitle);

    let lang = H_GetLangFromUrl();
    if (lang === "") lang = APP_DEFAULT_LANG;
    const linkToSignup = "/" + lang + "/signup";

    return (
      <AppContainer>
        <Container className="LoginFormContainer" maxWidth="xs">
          <form id="LoginForm" className="LoginForm" noValidate autoComplete="off">
            <Container className="LoginFormItemContainer">
              <h1>{translation.login.moduleTitle}</h1>
            </Container>
            <Container className="LoginFormItemContainer">
              <TextField
                name="username"
                label={translation.login.userName}
                variant="outlined"
                size="small"
                fullWidth={true}
                value={this.state.username}
                onChange={this.onChange}
              />
            </Container>
            <Container className="LoginFormItemContainer">
              <PasswordInputField
                type={this.state.showPassword ? "text" : "password"}
                name="password"
                variant="outlined"
                size="small"
                fullWidth={true}
                labelText={translation.login.password}
                labelWidth={80}
                value={this.state.password}
                onChange={this.onChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={translation.login.togglePasswordVisibility}
                      onClick={this.handleClickShowPassword}
                      edge="end"
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Container>
          </form>
          <Container className="LoginFormItemContainer">
            <Button
              variant="contained"
              color="primary"
              className="LoginButton"
              onClick={this.onLoginClick}>
                {translation.login.login}
            </Button>
            <p className="SignupText">
              {translation.login.dontHaveAccount} <Link to={linkToSignup}>{translation.login.signup}</Link>
            </p>
          </Container>
        </Container>
      </AppContainer>
    );
  }
}

function PasswordInputField(props) {
  if (props.variant == null || props.variant === "") {
    return(
      <FormControl size={props.size} fullWidth={props.fullWidth}>
        <InputLabel className="PasswordLabel" htmlFor={props.id}>{props.labelText}</InputLabel>
        <Input
          type={props.type}
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          endAdornment={props.endAdornment}
        />
      </FormControl>
    );
  } else if (props.variant === "filled") {
    return(
      <FormControl size={props.size} fullWidth={props.fullWidth}>
        <InputLabel className="PasswordLabel" htmlFor={props.id}>{props.labelText}</InputLabel>
        <FilledInput
          type={props.type}
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          endAdornment={props.endAdornment}
        />
      </FormControl>
    );
  }
  return(
    <FormControl size={props.size} fullWidth={props.fullWidth}>
      <InputLabel className="PasswordLabel" htmlFor={props.id}>{props.labelText}</InputLabel>
      <OutlinedInput
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        endAdornment={props.endAdornment}
        labelWidth={props.labelWidth}
      />
    </FormControl>
  );
}

// connect action and store and component
Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login
})(withRouter(Login));
