import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import {
  H_GetLangFromUrl,
} from "./libs/Libs";

import Root from "./Root";
import requireAuth from "./utils/RequireAuth";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import MainMenu from "./components/mainMenu/MainMenu";
import User from "./components/userAccounts/UserAccounts";
import NoMatchPage from "./components/noMatchPage/NoMatchPage";
import Notes from "./components/notes/Notes";

// axios.defaults.baseURL = "http://127.0.0.1:8000";
if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}


class App extends React.Component {
  render() {
    const lang = H_GetLangFromUrl();
    const defaultRedirect = "/" + lang + "/login";
    return(
      <Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
        <Switch>
          <Route path="/" exact>
            <Redirect to={defaultRedirect} />
          </Route>
          <Route path="/:lang" exact>
            <Redirect to={defaultRedirect} />
          </Route>
          <Route path="/:lang/login" component={Login} />
          <Route path="/:lang/signup" component={Signup} />
          <Route path="/:lang/mainmenu" component={requireAuth(MainMenu)} />
          <Route path="/:lang/useraccounts" component={requireAuth(User)} />
          <Route path="/:lang/notes" component={requireAuth(Notes)} />
          <Route path="*" component={NoMatchPage} />
        </Switch>
      </Root>
    );
  }
}

export default App;
