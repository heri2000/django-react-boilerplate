import { useState } from 'react'
import { H_GetTranslation } from "../../libs/Libs";
import { CommonTextField, CommonButton } from "../../libs/Common";

const UserFilter = ({ handleShowRefreshButtonClick }) => {
  const [filter, setFilter] = useState("");
  
  const handleFilterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleShowRefreshButtonClick(filter);
    }
  }

  const handleClick = () => {
    handleShowRefreshButtonClick(filter);
  }

  const translation = H_GetTranslation();

  return(
    <div className="FilterPanel">
      <CommonTextField
        className="FilterField"
        name="filter"
        label={translation.user.filterUserNameEmailFirstNameLastName}
        autoFocus
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onKeyPress={(e) => handleFilterKeyPress(e)}
      />
      <div>
        <CommonButton
          className="ShowRefreshButton"
          onClick={handleClick}
          color="primary"
        >
          {translation.user.showRefresh}
        </CommonButton>
      </div>
    </div>
  );
}

export default UserFilter;