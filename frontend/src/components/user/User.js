import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUsers } from "./UserActions";

import {
  CommonButton,
  CommonTextField,
  CommonDataGrid,
  getTabTitle,
} from "../../libs/Common";
import { H_GetTranslation } from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";

import '../../libs/Common.css';
import './User.css';

const User = (props) => {
  const translation = H_GetTranslation();
  document.title = getTabTitle(translation.user.moduleTitle);

  const userColumns = [
    {
      field: 'username',
      headerName: translation.user.username,
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: 'email',
      headerName: translation.user.email,
      minWidth: 250,
      flex: 1,
      editable: false,
    },
    {
      field: 'first_name',
      headerName: translation.user.firstName,
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: 'last_name',
      headerName: translation.user.lastName,
      minWidth: 150,
      flex: 1,
      editable: false,
    },
  ];

  const handleFilterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleShowRefreshButtonClick();
    }
  };

  const handleShowRefreshButtonClick = () => {
    props.getUsers();
  };

  const [filter, setFilter] = React.useState("");
  const users = [];

  return( 
    <AppContainer title={translation.user.moduleTitle}>
    <div className="PageContent">
      <div className="FilterPanel">
        <CommonTextField
          className="FilterField"
          name="filter"
          label={translation.user.filterUserNameEmailFirstNameLastName}
          autoFocus
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyPress={(e) => handleFilterKeyPress(e)}
        />
        <div>
          <CommonButton
            className="ShowRefreshButton"
            onClick={handleShowRefreshButtonClick}
          >
            {translation.user.showRefresh}
          </CommonButton>
        </div>
      </div>
      <div className="ButtonPanel">
        <CommonButton>{translation.user.newUser}</CommonButton>
        <CommonButton>{translation.user.edit}</CommonButton>
      </div>
      <div className="DataPanel">
        <CommonDataGrid
          columns={userColumns}
          rows={users}
        />
      </div>
    </div>
  </AppContainer>
  );
}

User.propTypes = {
  getUsers: PropTypes.func.isRequired,
  // users: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, {
  getUsers
})(withRouter(User));
