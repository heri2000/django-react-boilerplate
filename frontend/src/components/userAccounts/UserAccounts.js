import { useState } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Menu,
  MenuItem,
} from "@material-ui/core";

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

  const [showMessage1, setShowMessage1] = useState(false);
  const [message1, setMessage1] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [gridSelectionModel, setGridSelectionModel] = useState([]);
  const [user, setUser] = useState(defaultUser);

  const handleShowClick = (filter) => {
    props.getUsers(filter);
  }

  const handleNewUserClick = () => {
    setUser(defaultUser);
    props.setEditNewUser(true);
  }

  const handleWithSelectedClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleWithSelectedClose = () => {
    setAnchorEl(null);
  }

  const handleEditUserClick = () => {
    handleWithSelectedClose();
    if (gridSelectionModel.length === 0) {
      setMessage1(translation.global.pleaseSelectOneRowToEdit);
      setShowMessage1(true);
    } else if (gridSelectionModel.length > 1) {
      setMessage1(translation.global.cannotEditMoreThanOneRow);
      setShowMessage1(true);
    }  else {
      let id = gridSelectionModel[0];
      if (id === 1) {
        setMessage1(translation.global.editingAdminNotAllowed);
        setShowMessage1(true);
      } else {
        let user = users.find(user => user.id === id);
        user.password = "";
        setUser(user);
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
    setUser({...user, [event.target.name]: value});
  }

  const handleSelectionModelChange = (model) => {
    setGridSelectionModel(model);
  }

  const handleCloseMessageDialog1 = () => {
    setShowMessage1(false);
  }

  return( 
    <AppContainer title={translation.user.moduleTitle}>
      <div className="PageContent">
        <UserFilter handleShowClick={handleShowClick} />
        <div className="ButtonPanel" style={{visibility: buttonAndDataVisibility}}>
          <CommonButton onClick={handleNewUserClick}>{translation.user.newUser}</CommonButton>
          <CommonButton
            aria-label={translation.global.withSelected}
            aria-controls={"with-selected-menu"}
            onClick={handleWithSelectedClick}
          >
            {translation.global.withSelected}
          </CommonButton>
          <Menu
            id="with-selected-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleWithSelectedClose}
          >
            <MenuItem id="with-selected-menu-edit-user" onClick={() => {handleEditUserClick();}}>
              {translation.user.editUser}
            </MenuItem>
          </Menu>
        </div>
        <div className="DataPanel" style={{visibility: buttonAndDataVisibility}}>
          <CommonDataGrid
            columns={columns}
            rows={users}
            selectionModel={gridSelectionModel}
            onSelectionModelChange={handleSelectionModelChange}
          />
        </div>

        {editNewUser || editExistingUser ? (
          <UserEditor
            user={user}
            editExistingUser={editExistingUser}
            onChange={handleUserEditorChange}
            onClose={handleCloseUserEditor}
            isSavingUser={isSavingUser}
            handleSaveUser={handleSaveUser}
          />
        ) : ""}
        
        {showMessage1 ? (
          <MessageDialog1 message={message1} onClose={handleCloseMessageDialog1} />
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
