import React from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

import {
  getTabTitle,
  APP_DEFAULT_LANG,
} from "../../utils/Common";
import {
  H_GetLangFromUrl,
  H_GetTranslation,
} from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";

import './MainMenu.css';

export default class MainMenu extends React.Component {
  render() {
    const translation = H_GetTranslation();
    document.title = getTabTitle(translation.mainMenu.moduleTitle);
    let lang = H_GetLangFromUrl();
    if (lang === "") lang = APP_DEFAULT_LANG;

    const linkToNotes = "/" + lang + "/notes";
    const linkToUser = "/" + lang + "/user";
    
    return (
      <AppContainer title={translation.mainMenu.moduleTitle}>
        <Container maxWidth="sm">
          <Link to={linkToNotes} target="_blank">Notes</Link>
          <br />
          <Link to={linkToUser} target="_blank">{translation.user.moduleTitle}</Link>
        </Container>
      </AppContainer>
    );
  }
}