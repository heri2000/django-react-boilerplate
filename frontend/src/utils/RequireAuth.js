import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";

import { H_GetLangFromUrl } from "../libs/Libs";

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.checkAuth();
    }

    componentDidUpdate(prevProps, prevState) {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        const redirectAfterLogin = this.props.location.pathname;
        const lang = H_GetLangFromUrl();
        this.props.dispatch(push(`/` + lang + `/login?next=${redirectAfterLogin}`));
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true ? (
            <Component {...this.props} />
          ) : null}
        </div>
      );
    }
  }
  
  AuthenticatedComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      token: state.auth.token
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}