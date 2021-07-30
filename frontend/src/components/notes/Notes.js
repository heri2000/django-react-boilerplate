import React from "react";
import { Container } from "@material-ui/core";

import { getTabTitle } from "../../libs/Common";
import AppContainer from "../appContainer/AppContainer";
import NotesList from "../notes/NotesList";
import AddNote from "../notes/AddNote";

export default class MainMenu extends React.Component {
  render() {
    document.title = getTabTitle("Notes");
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