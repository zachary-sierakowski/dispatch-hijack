import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import hijackMiddleware from "dispatch-hijack";

import App from "./components/App";
import rootReducer from "./reducers";

const hijackFn = (action, dispatch, getState) => {
  console.log("I was hijacked");
  return action;
};

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, hijackMiddleware(hijackFn), loggerMiddleware)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
