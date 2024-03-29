import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { signupReducer } from "./components/signup/SignupReducer";
import { loginReducer } from "./components/login/LoginReducer";
import { notesReducer } from "./components/notes/NotesReducer";
import { userReducer } from "./components/userAccounts/UserReducer";

// const rootReducer = history =>
const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
    notes: notesReducer,
    users: userReducer,
  });

// export default rootReducer;
export default createRootReducer;