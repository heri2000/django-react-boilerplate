import { useState } from 'react'
import {
  FormControlLabel,
  FormGroup,
  Switch
} from '@material-ui/core';

import {
  CommonButton,
  CommonTextField,
  CommonDraggableDialog,
} from "../../libs/Common";
import { H_GetTranslation } from "../../libs/Libs";

const defaultUser = {
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  is_staff: true,
  is_superuser: false,
  is_active: true
};

const UserEditor = ({user, open, onClose, isSavingUser, handleSaveUser}) => {
  const translation = H_GetTranslation();

  const [state, setState] = useState({
    user: (user === null ? defaultUser : user),
  });

  const handleChange = (event) => {
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

  const style1 = { marginBottom: "0.75em" };

  const content = (
    <div>
      <div>
        <CommonTextField
          name="username"
          value={state.user.username}
          onChange={handleChange}
          label={translation.user.username}
          fullWidth={true}
          style={style1}
          disabled={isSavingUser}
          autoFocus
        />
      </div>
      <div>
        <CommonTextField
          name="email"
          value={state.user.email}
          onChange={handleChange}
          label={translation.user.email}
          fullWidth={true}
          style={style1}
          disabled={isSavingUser}
        />
      </div>
      <div>
        <CommonTextField
          name="first_name"
          value={state.user.first_name}
          onChange={handleChange}
          label={translation.user.first_name}
          fullWidth={true}
          style={style1}
          disabled={isSavingUser}
        />
      </div>
      <div>
        <CommonTextField
          name="last_name"
          value={state.user.last_name}
          onChange={handleChange}
          label={translation.user.last_name}
          fullWidth={true}
          style={style1}
          disabled={isSavingUser}
        />
      </div>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              name="is_staff"
              color="primary"
              checked={state.user.is_staff}
              onChange={handleChange}
            />
          }
          label={translation.user.is_staff}
          disabled={isSavingUser}
        />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              name="is_superuser"
              color="primary"
              checked={state.user.is_superuser}
              onChange={handleChange}
            />
          }
          label={translation.user.is_superuser}
          disabled={isSavingUser}
        />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              name="is_active"
              color="primary"
              checked={state.user.is_active}
              onChange={handleChange}
            />
          }
          label={translation.user.is_active}
          disabled={isSavingUser}
        />
      </FormGroup>
    </div>
  );

  const actions = (
    <div>
      <CommonButton onClick={onClose} variant="text" disabled={isSavingUser}>{translation.user.cancel}</CommonButton>
      <CommonButton onClick={() => {handleSaveUser(state.user)}} color="primary" disabled={isSavingUser}>{translation.user.save}</CommonButton>
    </div>
  );

  return(
    <div>
      <CommonDraggableDialog
        open={open}
        title={translation.user.newUser}
        content={content}
        actions={actions}
        maxWidth="xs"
      />
    </div>
  );
}

export default UserEditor;