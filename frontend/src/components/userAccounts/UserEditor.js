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

const UserEditor = ({user, onChange, onClose, isSavingUser, handleSaveUser}) => {
  const translation = H_GetTranslation();

  const style1 = { marginBottom: "0.75em" };

  const content = (
    <div>
      <div>
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
      </div>
      <div>
        <CommonTextField
          name="email"
          value={user.email}
          onChange={onChange}
          label={translation.user.email}
          fullWidth={true}
          style={style1}
          disabled={isSavingUser}
        />
      </div>
      <div>
        <CommonTextField
          name="first_name"
          value={user.first_name}
          onChange={onChange}
          label={translation.user.first_name}
          fullWidth={true}
          style={style1}
          disabled={isSavingUser}
        />
      </div>
      <div>
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
        title={translation.user.newUser}
        content={content}
        actions={actions}
        maxWidth="xs"
      />
    </div>
  );
}

export default UserEditor;