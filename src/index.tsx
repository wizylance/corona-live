import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import { create } from "mobx-persist";

// MOBX
import { FirebaseStore } from "./store/firebase/FirebaseStore";
import { AppState } from "./store/app/AppState";

configure({ enforceActions: "always" }); // Mobx strict mode

const hydrate = create({});
const dataStore = new FirebaseStore();
const appState = new AppState();

hydrate("dataStore", dataStore);

ReactDOM.render(
  <Provider dataStore={dataStore} appState={appState}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
