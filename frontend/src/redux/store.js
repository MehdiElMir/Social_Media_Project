import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { usersReducer } from "./reducers/userReducer";
import { alertsReducer } from "./reducers/alertsReducers";
const rootReducer = combineReducers({
  usersReducer: usersReducer,
  alertsReducer: alertsReducer,
});

const composeEnhancers = composeWithDevTools({});
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store;
