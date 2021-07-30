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
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import {
  Link,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getTabTitle,
  APP_DEFAULT_LANG,
  CommonButton,
} from "../../utils/Common";
import {
  H_GetLangFromUrl,
  H_GetTranslation,
} from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";
import { signupNewUser } from "./SignupActions";

import './Signup.css';

class Signup extends React.Component {
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

  onSignupClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.signupNewUser(userData);
  }

  render() {
    const translation = H_GetTranslation();
    document.title = getTabTitle(translation.signup.moduleTitle);

    let lang = H_GetLangFromUrl();
    if (lang === "") lang = APP_DEFAULT_LANG;
    const linkToLogin = "/" + lang + "/login";

    return (
      <AppContainer>
        <Container className="SignupFormContainer" maxWidth="xs">
          <form id="SignupForm" className="SignupForm" noValidate autoComplete="off">
            <Container className="SignupFormItemContainer">
              <h1>{translation.signup.moduleTitle}</h1>
            </Container>
            <Container className="SignupFormItemContainer">
              <TextField
                name="username"
                label={translation.signup.userName}
                variant="outlined"
                size="small"
                fullWidth={true}
                value={this.state.username}
                onChange={this.onChange}
              />
            </Container>
            <Container className="SignupFormItemContainer">
              <PasswordInputField
                type={this.state.showPassword ? "text" : "password"}
                name="password"
                variant="outlined"
                size="small"
                fullWidth={true}
                labelText={translation.signup.password}
                labelWidth={80}
                value={this.state.password}
                onChange={this.onChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={translation.signup.togglePasswordVisibility}
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
          <Container className="SignupFormItemContainer">
            <CommonButton
              color="primary"
              className="SignupButton"
              size="medium"
              onClick={this.onSignupClick}
            >
                {translation.signup.signup}
            </CommonButton>
            <p className="SignupText">
              {translation.signup.alreadyHaveAccount} <Link to={linkToLogin}>{translation.signup.login}</Link>
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


Signup.propTypes = {
  signupNewUser: PropTypes.func.isRequired,
  createUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  createUser: state.createUser
});

export default connect(mapStateToProps, {
  signupNewUser
})(withRouter(Signup));
