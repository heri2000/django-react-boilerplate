import React from "react";
import {
  Container,
} from "@material-ui/core";

import { getTabTitle } from "../../utils/Common";
import { H_GetTranslation } from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";

import './NoMatchPage.css';

export default class NoMatchPage extends React.Component {
  render() {
    let translation = H_GetTranslation();
    document.title = getTabTitle(translation.noMatchPage.moduleTitle);
    return (
      <AppContainer>
        <Container className="NoMatchPage" maxWidth="sm">
          <h1 className="lower center">{translation.noMatchPage.moduleTitle}</h1>
          <p className="larger center">{translation.noMatchPage.message}</p>
        </Container>
      </AppContainer>
    );
  }
}