import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUsers } from "./UserActions";

import {
  CommonButton,
  CommonDataGrid,
  getTabTitle
} from "../../libs/Common";
import { H_GetTranslation } from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";
import UserFilter from "./UserFilter";
import UserEditor from "./UserEditor";

import './UserAccounts.css';

const UserAccounts = (props) => {
  const [state, setState] = useState({
    filter: "",
    buttonAndDataVisibility: "hidden",
    editUser: false,
  });

  const translation = H_GetTranslation();
  document.title = getTabTitle(translation.user.moduleTitle);
  
  const { users } = props.users;

  const columns = [
    { field: 'username', headerName: translation.user.username, minWidth: 150, flex: 2, editable: false },
    { field: 'email', headerName: translation.user.email, minWidth: 200, flex: 3, editable: false },
    { field: 'first_name', headerName: translation.user.first_name, minWidth: 200, flex: 3, editable: false },
    { field: 'last_name', headerName: translation.user.last_name, minWidth: 200, flex: 3, editable: false },
    { field: 'is_staff', headerName: translation.user.is_staff, type: "boolean", minWidth: 150, flex: 0, editable: false },
    { field: 'is_superuser', headerName: translation.user.is_superuser, type: "boolean", minWidth: 150, flex: 0, editable: false },
    { field: 'is_active', headerName: translation.user.is_active, type: "boolean", minWidth: 150, flex: 0, editable: false },
  ];
  
  const handleShowButtonClick = (filter) => {
    setState({ ...state, filter: filter, buttonAndDataVisibility: "visible" });
    props.getUsers(filter);
  }

  const handleNewUserButtonClick = () => {
    setState({ ...state, editUser: true });
  }

  const handleCloseUserEditor = () => {
    setState({ ...state, editUser: false });
  }

  return( 
    <AppContainer title={translation.user.moduleTitle}>
      <div className="PageContent">
        <UserFilter handleShowButtonClick={handleShowButtonClick} />
        <div className="ButtonPanel" style={{visibility: state.buttonAndDataVisibility}}>
          <CommonButton onClick={handleNewUserButtonClick}>{translation.user.newUser}</CommonButton>
          <CommonButton>{translation.user.edit}</CommonButton>
          <CommonButton>{translation.user.withSelected}</CommonButton>
        </div>
        <div className="DataPanel" style={{visibility: state.buttonAndDataVisibility}}>
          <CommonDataGrid columns={columns} rows={users} />
        </div>

        <UserEditor
          user={{}}
          open={state.editUser}
          onClose={handleCloseUserEditor}
        />

      </div>
    </AppContainer>
  );
}

UserAccounts.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { getUsers })(withRouter(UserAccounts));
