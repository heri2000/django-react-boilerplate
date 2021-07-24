import React from "react";

import { getTabTitle } from "../../utils/Common";
import { H_GetTranslation } from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";

import './User.css';

export default class User extends React.Component {
  render() {
    let translation = H_GetTranslation();
    document.title = getTabTitle(translation.user.moduleTitle);
    return (
      <AppContainer title={translation.user.moduleTitle}>
        <div className="User">
          {translation.user.moduleTitle}
        </div>
      </AppContainer>
    );
  }
}