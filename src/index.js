import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Redux
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import App from "./App";
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const rootReducer = combineReducers({
  form: formReducer
});
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ScrollToTop>
        <App></App>
      </ScrollToTop>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
