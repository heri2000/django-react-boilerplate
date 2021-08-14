import { useState } from 'react'
import { H_GetTranslation } from "../../libs/Libs";
import { CommonTextField, CommonButton } from "../../libs/Common";

const UserFilter = ({ handleShowClick }) => {
  const [filter, setFilter] = useState("");
  
  const handleFilterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleShowClick(filter);
    }
  }

  const handleClick = () => {
    handleShowClick(filter);
  }

  const translation = H_GetTranslation();

  return(
    <div className="FilterPanel">
      <CommonTextField
        className="FilterField"
        name="filter"
        label={translation.userAccounts.filterUserNameEmailFirstNameLastName}
        autoFocus
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onKeyPress={(e) => handleFilterKeyPress(e)}
      />
      <div>
        <CommonButton
          className="ShowButton"
          onClick={handleClick}
          color="primary"
        >
          {translation.userAccounts.show}
        </CommonButton>
      </div>
    </div>
  );
}

export default UserFilter;