import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { usersReducer } from "./reducers/userReducer";
import { alertsReducer } from "./reducers/alertsReducers";
import { postsReducer } from "./reducers/postsReducer"

const rootReducer = combineReducers({
  usersReducer: usersReducer,
  alertsReducer: alertsReducer,
  postsReducer: postsReducer,
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
