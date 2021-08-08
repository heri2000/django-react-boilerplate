import { useState } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteUser, updateUser } from "./UserActions";

import {
  CommonButton,
  CommonTextField,
  CommonDraggableDialog,
} from "../../libs/Common";
import { H_GetTranslation } from "../../libs/Libs";

const UserEditor = ({open, onClose}) => {
  const translation = H_GetTranslation();
  const [isSavingData, updateSavingData] = useState(false);

  const handleSaveData = () => {
    updateSavingData(true);
    setTimeout(() => { updateSavingData(false); onClose(); }, 3000);
  }

  const style1 = { marginBottom: 5 };

  const content = (
    <>
      <CommonTextField
        name="username"
        label={translation.user.username}
        fullWidth={true}
        style={style1}
        disabled={isSavingData}
        autoFocus
      />
      <CommonTextField
        name="email"
        label={translation.user.email}
        fullWidth={true}
        style={style1}
        disabled={isSavingData}
      />
      <CommonTextField
        name="first_name"
        label={translation.user.first_name}
        fullWidth={true}
        style={style1}
        disabled={isSavingData}
      />
      <CommonTextField
        name="last_name"
        label={translation.user.last_name}
        fullWidth={true}
        style={style1}
        disabled={isSavingData}
      />
    </>
  );

  const actions = (
    <>
      <CommonButton onClick={onClose} variant="text" disabled={isSavingData}>{translation.user.cancel}</CommonButton>
      <CommonButton onClick={handleSaveData} color="primary" disabled={isSavingData}>{translation.user.save}</CommonButton>
    </>
  );

  return(
    <>
      <CommonDraggableDialog
        open={open}
        onClose={onClose}
        title={translation.user.newUser}
        content={content}
        actions={actions}
        maxWidth="xs"
      />
    </>
  );
}

UserEditor.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  deleteUser, updateUser
})(withRouter(UserEditor));
