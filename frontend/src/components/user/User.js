import { useState } from 'react'

import { getTabTitle } from "../../libs/Common";
import { H_GetTranslation } from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";
import UserFilter from "./UserFilter";
import UserList from "./UserList";

import './User.css';

const User = () => {
  const [filter, setFilter] = useState("");
  const [currentFilter, setCurrentFilter] = useState(filter);
  const [showList, setShowList] = useState(false);

  const handleShowRefreshButtonClick = () => {
    setCurrentFilter(filter);
    setShowList(true);
  }

  const translation = H_GetTranslation();
  document.title = getTabTitle(translation.user.moduleTitle);
  
  return( 
    <AppContainer title={translation.user.moduleTitle}>
      <div className="PageContent">
        <UserFilter
          filter={filter}
          setFilter={setFilter}
          handleShowRefreshButtonClick={handleShowRefreshButtonClick}
        />
        {showList ?
          <UserList
            filter={currentFilter}
          /> : ""
        }
      </div>
    </AppContainer>
  );
}

export default User;