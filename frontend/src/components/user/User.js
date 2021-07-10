import React from "react";

import {
  APP_TITLE,
  APP_TITLE_SEPARATOR,
} from "../../Const";
import { H_GetTranslation } from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";

import './User.css';

export default class User extends React.Component {
  render() {
    let translation = H_GetTranslation();
    document.title = translation.user.moduleTitle + APP_TITLE_SEPARATOR + APP_TITLE;
    return (
      <AppContainer title={translation.user.moduleTitle}>
        <div className="User">
          {translation.user.moduleTitle}
        </div>
      </AppContainer>
    );
  }
}