import {
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import { CommonButton, CommonDraggableDialog, CommonTextField } from "../../libs/Common";

import { H_GetTranslation } from "../../libs/Libs";

const BulkEditor1 = ({ field, onChange, onClose, isSavingUser, handleSave }) => {
  const translation = H_GetTranslation();
  let content = "";
  if (field.type === "textfield") {
      content = (
        <CommonTextField
        name={field.name}
        value={field.value}
        onChange={onChange}
        label={translation.userAccounts[field.name]}
        fullWidth={true}
        disabled={isSavingUser}
        autoFocus
      />
    );
  } else if (field.type === "switch") {
    content = (
      <div style={{display: "flex", justifyContent: "center"}}>
        <FormControlLabel
          control={
            <Switch
              name={field.name}
              color="primary"
              checked={field.value}
              onChange={onChange}
            />
          }
          label={translation.userAccounts[field.name]}
          disabled={isSavingUser}
        />
      </div>
    );
  }
  return(
    <div>
      <CommonDraggableDialog
        open={true}
        content={content}
        actions={(
          <div>
            <CommonButton variant="text" disabled={isSavingUser} onClick={onClose}>{translation.global.cancel}</CommonButton>
            <CommonButton onClick={handleSave} color="primary" disabled={isSavingUser}>{translation.global.save}</CommonButton>
          </div>
        )}
        maxWidth="xs"
      />
    </div>
  );
}

export default BulkEditor1;