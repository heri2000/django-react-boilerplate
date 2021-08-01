// import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUsers } from "./UserActions";

import { H_GetTranslation } from "../../libs/Libs";
import { CommonButton } from "../../libs/Common";
import React from "react";

class UserList extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props.users;

    const items = users.map(user => {
      return(<li key={user.username}>{user.username}, {user.email}<br /></li>);
    });

    const translation = H_GetTranslation();

    return(
      <div>
        <div className="ButtonPanel">
          <CommonButton>{translation.user.newUser}</CommonButton>
          <CommonButton>{translation.user.edit}</CommonButton>
        </div>
        <div className="DataPanel">
          <ul>{items}</ul>
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, {
  getUsers
})(withRouter(UserList));