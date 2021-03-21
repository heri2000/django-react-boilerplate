import React from "react";
import { Container } from "@material-ui/core";

import {
  APP_TITLE,
  APP_TITLE_SEPARATOR,
} from "../../Const";
import AppContainer from "../appContainer/AppContainer";
import NotesList from "../notes/NotesList";
import AddNote from "../notes/AddNote";

export default class MainMenu extends React.Component {
  render() {
    document.title = "Notes" + APP_TITLE_SEPARATOR + APP_TITLE;
    return (
      <AppContainer>
        <Container maxWidth="sm">
          <NotesList />
          <AddNote />
        </Container>
      </AppContainer>
    );
  }
}