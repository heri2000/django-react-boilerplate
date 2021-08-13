import { useState } from 'react'
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Switch,
} from '@material-ui/core';

import {
  CommonButton,
  CommonTextField,
  CommonDraggableDialog,
} from "../../libs/Common";
import { H_GetTranslation } from "../../libs/Libs";

const UserEditor = ({
    user,
    editExistingUser,
    onChange,
    onClose,
    isSavingUser,
    handleSaveUser
  }) => {
  const translation = H_GetTranslation();

  const [state, setState] = useState({
    changePassword: !editExistingUser
  });

  const onChangeLocal = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  }

  const style1 = { marginBottom: "0.75em" };

  const content = (
    <div className="UserEditorContentPanel_1">
      <div className="UserEditorContentPanel_2">
        <CommonTextField
          name="username"
          value={user.username}
          onChange={onChange}
          label={translation.user.username}
          fullWidth={true}
          style={style1}
          disabled={isSavingUser}
          autoFocus
        />
        <CommonTextField
          name="email"
          value={user.email}
          onChange={onChange}
          label={translation.user.email}
          fullWidth={true}
          style={style1}
          disabled={isSavingUser}
        />
        <CommonTextField
          name="first_name"
          value={user.first_name}
          onChange={onChange}
          label={translation.user.first_name}
          fullWidth={true}
          style={style1}
          disabled={isSavingUser}
        />
        <CommonTextField
          name="last_name"
          value={user.last_name}
          onChange={onChange}
          label={translation.user.last_name}
          fullWidth={true}
          style={style1}
          disabled={isSavingUser}
        />
      </div>

      <div className="UserEditorContentPanel_3">
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                name="is_staff"
                color="primary"
                checked={user.is_staff}
                onChange={onChange}
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
                checked={user.is_superuser}
                onChange={onChange}
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
                checked={user.is_active}
                onChange={onChange}
              />
            }
            label={translation.user.is_active}
            disabled={isSavingUser}
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                name="changePassword"
                color="primary"
                checked={state.changePassword}
                onChange={onChangeLocal}
              />
            }
            label={translation.user.changePassword}
            disabled={isSavingUser || !editExistingUser}
          />
        </FormGroup>
        {state.changePassword ?
          <div>
            <CommonTextField
              name="password"
              type="password"
              value={user.password}
              onChange={onChange}
              label={translation.user.password}
              fullWidth={true}
              style={style1}
              disabled={isSavingUser}
            />
          </div>
        : "" }
      </div>
    </div>
  );

  const actions = (
    <div>
      <CommonButton onClick={onClose} variant="text" disabled={isSavingUser}>{translation.user.cancel}</CommonButton>
      <CommonButton onClick={() => {handleSaveUser(user)}} color="primary" disabled={isSavingUser}>{translation.user.save}</CommonButton>
    </div>
  );

  return(
    <div>
      <CommonDraggableDialog
        open={true}
        title={editExistingUser ? translation.user.editUser : translation.user.newUser}
        content={content}
        actions={actions}
        maxWidth="md"
      />
    </div>
  );
}

export default UserEditor;