import React from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

import {
  APP_TITLE,
  APP_TITLE_SEPARATOR,
  APP_DEFAULT_LANG,
} from "../../Const";
import {
  H_GetLangFromUrl,
  H_GetTranslation,
} from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";

import './MainMenu.css';

export default class MainMenu extends React.Component {
  render() {
    let translation = H_GetTranslation();
    document.title = translation.mainMenu.moduleTitle + APP_TITLE_SEPARATOR + APP_TITLE;
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