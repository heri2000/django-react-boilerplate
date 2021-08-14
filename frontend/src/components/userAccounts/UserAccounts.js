import { useState } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Menu,
  MenuItem,
  Divider,
} from "@material-ui/core";

import {
  getUsers,
  addUser,
  updateUser,
  setButtonAndDataVisibility,
  setEditNewUser,
  setEditExistingUser,
  setBatchEditUser,
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
import BatchEditor1 from "./BatchEditor1";

import './UserAccounts.css';

const UserAccounts = (props) => {
  const translation = H_GetTranslation();
  document.title = getTabTitle(translation.userAccounts.moduleTitle);

  const columns = [
    { field: 'username', headerName: translation.userAccounts.username, minWidth: 150, flex: 2, editable: false },
    { field: 'email', headerName: translation.userAccounts.email, minWidth: 200, flex: 3, editable: false },
    { field: 'first_name', headerName: translation.userAccounts.first_name, minWidth: 200, flex: 3, editable: false },
    { field: 'last_name', headerName: translation.userAccounts.last_name, minWidth: 200, flex: 3, editable: false },
    { field: 'is_staff', headerName: translation.userAccounts.is_staff, type: "boolean", minWidth: 150, flex: 0, editable: false },
    { field: 'is_superuser', headerName: translation.userAccounts.is_superuser, type: "boolean", minWidth: 150, flex: 0, editable: false },
    { field: 'is_active', headerName: translation.userAccounts.is_active, type: "boolean", minWidth: 150, flex: 0, editable: false },
  ];
  
  const { buttonAndDataVisibility } = props.users;
  const { editNewUser } = props.users;
  const { editExistingUser } = props.users;
  const { batchEditUser } = props.users;
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
  const [batchEditorField, setBatchEditorField] = useState({name: "", type: "", value: ""});
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

  const handleUserEditorChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setUser({...user, [event.target.name]: value});
  }

  const handleCloseUserEditor = () => {
    props.setEditNewUser(false);
    props.setEditExistingUser(false);
  }

  const handleSaveUser = () => {
    if (editExistingUser) {
      props.updateUser(user.id, user);
    } else {
      props.addUser(user);
    }
  }

  const handleCloseMessageDialog1 = () => {
    setShowMessage1(false);
  }

  const handleSelectionModelChange = (model) => {
    setGridSelectionModel(model);
  }

  const handleShowBatchEditor = (fieldName) => {
    let type = "";
    let value = "";
    if (fieldName === "first_name" || fieldName === "last_name") {
      type = "textfield";
      value = "";
    } else if (fieldName === "is_staff" || fieldName === "is_superuser" || fieldName === "is_active") {
      type = "switch";
      value = false;
    }
    setBatchEditorField({name: fieldName, type: type, value: value});
    handleWithSelectedClose();
    props.setBatchEditUser(true);
  }

  const handleBatchEditorChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setBatchEditorField({...batchEditorField, value: value});
  }

  const handleCloseBatchEditor = () => {
    props.setBatchEditUser(false);
  }

  const handleBatchEditorSave = () => {
    console.log(batchEditorField, gridSelectionModel);
  }

  return(
    <AppContainer title={translation.userAccounts.moduleTitle}>
      <div className="PageContent">
        <UserFilter handleShowClick={handleShowClick} />
        <div className="ButtonPanel" style={{visibility: buttonAndDataVisibility}}>
          <CommonButton onClick={handleNewUserClick}>{translation.userAccounts.newUser}</CommonButton>
          <CommonButton
            aria-label={translation.global.withSelected}
            aria-controls={"withSelectedMenu"}
            onClick={handleWithSelectedClick}
          >
            {translation.global.withSelected}
          </CommonButton>
          <Menu
            id="withSelectedMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleWithSelectedClose}
          >
            <MenuItem id="withSelectedMenuEditUser" onClick={handleEditUserClick}>
              {translation.userAccounts.editUser}
            </MenuItem>
            <Divider />
            <MenuItem id="withSelectedMenuChangeFirstNameAtOnce" onClick={() => handleShowBatchEditor("first_name")}>
              {translation.userAccounts.changeFirstNameAtOnce}
            </MenuItem>
            <MenuItem id="withSelectedMenuChangeLasttNameAtOnce" onClick={() => handleShowBatchEditor("last_name")}>
              {translation.userAccounts.changeLastNameAtOnce}
            </MenuItem>
            <MenuItem id="withSelectedMenuChangeStaffAtOnce" onClick={() => handleShowBatchEditor("is_staff")}>
              {translation.userAccounts.changeStaffAtOnce}
            </MenuItem>
            <MenuItem id="withSelectedMenuChangeSuperUserAtOnce" onClick={() => handleShowBatchEditor("is_superuser")}>
              {translation.userAccounts.changeSuperUserAtOnce}
            </MenuItem>
            <MenuItem id="withSelectedMenuChangeActiveAtOnce" onClick={() => handleShowBatchEditor("is_active")}>
              {translation.userAccounts.changeActiveAtOnce}
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

        {batchEditUser ? (
          <BatchEditor1
            field={batchEditorField}
            onChange={handleBatchEditorChange}
            onClose={handleCloseBatchEditor}
            handleSave={handleBatchEditorSave}
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
  getUsers, addUser, updateUser, setButtonAndDataVisibility, setEditNewUser, setEditExistingUser, setBatchEditUser, setSavingUser
})(withRouter(UserAccounts));
