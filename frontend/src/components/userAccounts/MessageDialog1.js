import { CommonButton, CommonDraggableDialog } from "../../libs/Common";

import { H_GetTranslation } from "../../libs/Libs";

const MessageDialog1 = ({ message, onClose }) => {
  const translation = H_GetTranslation();
  return(
    <div>
      <CommonDraggableDialog
        open={true}
        title="Dialog"
        content={message}
        actions={(
          <CommonButton onClick={onClose} color="primary">{translation.global.ok}</CommonButton>
        )}
        maxWidth="xs"
        onClose={onClose}
      />
    </div>
  );
}

export default MessageDialog1;
