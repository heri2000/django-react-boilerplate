import {
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import { CommonButton, CommonDraggableDialog, CommonTextField } from "../../libs/Common";

import { H_GetTranslation } from "../../libs/Libs";

const BatchEditor1 = ({ field, onChange, onClose, handleSave }) => {
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
            <CommonButton variant="text" onClick={onClose}>{translation.global.cancel}</CommonButton>
            <CommonButton onClick={handleSave} color="primary">{translation.global.save}</CommonButton>
          </div>
        )}
        maxWidth="xs"
      />
    </div>
  );
}

export default BatchEditor1;