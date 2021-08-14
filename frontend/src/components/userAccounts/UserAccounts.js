import { useState } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getUsers,
  addUser,
  updateUser,
  setButtonAndDataVisibility,
  setEditNewUser,
  setEditExistingUser,
  setSavingUser
} from "./UserActions";
import MessageDialog1 from "./MessageDialog1";

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
  const { editNewUser } = props.users;
  const { editExistingUser } = props.users;
  const { isSavingUser } = props.users;
  const { users } = props.users;
  
  const defaultUser = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    is_staff: true,
    is_superuser: false,
    is_active: true
  };
  
  const [state, setState] = useState({
    showMessage1: false,
    message1: "",
    gridSelectionModel: [],
    user: defaultUser
  });

  const handleShowClick = (filter) => {
    props.getUsers(filter);
  }

  const handleNewUserClick = () => {
    setState({...state, user: defaultUser});
    props.setEditNewUser(true);
  }

  const handleEditUserClick = () => {
    if (state.gridSelectionModel.length === 0) {
      setState({
        ...state,
        message1: translation.global.pleaseSelectOneRowToEdit,
        showMessage1: true
      });
    } else if (state.gridSelectionModel.length > 1) {
      setState({
        ...state,
        message1: translation.global.cannotEditMoreThanOneRow,
        showMessage1: true
      });
    }  else {
      let id = state.gridSelectionModel[0];
      if (id === 1) {
          setState({
            ...state,
            message1: translation.user.editingAdminNotAllowed,
            showMessage1: true
          });
      } else {
        let user = users.find(user => user.id === id);
        user.password = "";
        setState({...state, user: user});
        props.setEditExistingUser(true);
      }
    }
  }

  const handleCloseUserEditor = () => {
    props.setEditNewUser(false);
    props.setEditExistingUser(false);
  }

  const handleSaveUser = (user) => {
    if (editExistingUser) {
      props.updateUser(user.id, user);
    } else {
      props.addUser(user);
    }
  }

  const handleUserEditorChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    const user = state.user;
    setState({
      ...state,
      user: {
        ...user,
        [event.target.name]: value,
      }
    });
  }

  const handleSelectionModelChange = (model) => {
    setState({...state, gridSelectionModel: model});
  }

  const handleCloseMessageDialog1 = () => {
    setState({...state, showMessage1: false});
  }

  return( 
    <AppContainer title={translation.user.moduleTitle}>
      <div className="PageContent">
        <UserFilter handleShowClick={handleShowClick} />
        <div className="ButtonPanel" style={{visibility: buttonAndDataVisibility}}>
          <CommonButton onClick={handleNewUserClick}>{translation.user.newUser}</CommonButton>
          <CommonButton onClick={handleEditUserClick}>{translation.user.editUser}</CommonButton>
          <CommonButton>{translation.global.withSelected}</CommonButton>
        </div>
        <div className="DataPanel" style={{visibility: buttonAndDataVisibility}}>
          <CommonDataGrid
            columns={columns}
            rows={users}
            selectionModel={state.gridSelectionModel}
            onSelectionModelChange={handleSelectionModelChange}
          />
        </div>

        {editNewUser || editExistingUser ? (
          <UserEditor
            user={state.user}
            editExistingUser={editExistingUser}
            onChange={handleUserEditorChange}
            onClose={handleCloseUserEditor}
            isSavingUser={isSavingUser}
            handleSaveUser={handleSaveUser}
          />
        ) : ""}
        
        {state.showMessage1 ? (
          <MessageDialog1 message={state.message1} onClose={handleCloseMessageDialog1} />
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
  editNewUser: state.editNewUser,
  editExistingUser: state.editExistingUser,
  isSavingUser: state.isSavingUser
});

export default connect(mapStateToProps, {
  getUsers, addUser, updateUser, setButtonAndDataVisibility, setEditNewUser, setEditExistingUser, setSavingUser
})(withRouter(UserAccounts));
