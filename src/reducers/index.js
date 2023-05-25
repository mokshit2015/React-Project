import { combineReducers } from "redux";
import eventReducer from "./event.reducer";
import loginReducer from "./login.reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  event: eventReducer,
});

export default rootReducer;
