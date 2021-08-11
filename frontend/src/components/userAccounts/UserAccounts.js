import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUsers,
  addUser,
  setButtonAndDataVisibility,
  setEditUser,
  setSavingUser
} from "./UserActions";

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
  const translation = H_GetTranslation();
  document.title = getTabTitle(translation.user.moduleTitle);

  const columns = [
    { field: 'username', headerName: translation.user.username, minWidth: 150, flex: 2, editable: false },
    { field: 'email', headerName: translation.user.email, minWidth: 200, flex: 3, editable: false },
    { field: 'first_name', headerName: translation.user.first_name, minWidth: 200, flex: 3, editable: false },
    { field: 'last_name', headerName: translation.user.last_name, minWidth: 200, flex: 3, editable: false },
    { field: 'is_staff', headerName: translation.user.is_staff, type: "boolean", minWidth: 150, flex: 0, editable: false },
    { field: 'is_superuser', headerName: translation.user.is_superuser, type: "boolean", minWidth: 150, flex: 0, editable: false },
    { field: 'is_active', headerName: translation.user.is_active, type: "boolean", minWidth: 150, flex: 0, editable: false },
  ];
  
  const { buttonAndDataVisibility } = props.users;
  const { editUser } = props.users;
  const { isSavingUser } = props.users;
  const { users } = props.users;
  let user = null;

  const handleShowButtonClick = (filter) => {
    props.getUsers(filter);
  }

  const handleNewUserButtonClick = () => {
    user = null;
    props.setEditUser(true);
  }

  const handleCloseUserEditor = () => {
    props.setEditUser(false);
  }

  const handleSaveUser = (user) => {
    props.addUser(user);
  }

  return( 
    <AppContainer title={translation.user.moduleTitle}>
      <div className="PageContent">
        <UserFilter handleShowButtonClick={handleShowButtonClick} />
        <div className="ButtonPanel" style={{visibility: buttonAndDataVisibility}}>
          <CommonButton onClick={handleNewUserButtonClick}>{translation.user.newUser}</CommonButton>
          <CommonButton>{translation.user.edit}</CommonButton>
          <CommonButton>{translation.user.withSelected}</CommonButton>
        </div>
        <div className="DataPanel" style={{visibility: buttonAndDataVisibility}}>
          <CommonDataGrid columns={columns} rows={users} />
        </div>

        {editUser ? (
          <UserEditor
            user={user}
            open={true}
            onClose={handleCloseUserEditor}
            isSavingUser={isSavingUser}
            handleSaveUser={handleSaveUser}
          />
        ) : ""}

      </div>
    </AppContainer>
  );
}

UserAccounts.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
  buttonAndDataVisibility: state.buttonAndDataVisibility,
  editUser: state.editUser,
  isSavingUser: state.isSavingUser
});

export default connect(mapStateToProps, {
  getUsers, addUser, setButtonAndDataVisibility, setEditUser, setSavingUser
})(withRouter(UserAccounts));
