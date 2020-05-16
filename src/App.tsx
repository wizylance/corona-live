import React from "react";
import { Redirect, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import {
  IonApp,
  IonRouterOutlet,
  // IonIcon,
  // IonLabel,
  // IonTabBar,
  // IonTabButton,
  // IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
// import { ellipse, square, triangle } from "ionicons/icons";

import TabOverview from "./pages/TabOverview";
import TabCountries from "./pages/TabCountries";
import TabMap from "./pages/TabMap";
import { AppState, ViewMode } from "./store/app/AppState";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./App.css";

type AppProps = {
  appState?: AppState;
};

const App: React.FC<AppProps> = ({ appState }) => {
  return (
    <IonApp className={`app-style ${appState?.viewMode}`}>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/overview" component={TabOverview} exact={true} />
          <Route path="/countries" component={TabCountries} exact={true} />
          <Route path="/map" component={TabMap} />
          <Route
            path="/"
            render={() => <Redirect to="/overview" />}
            exact={true}
          />
          <Redirect to="/overview" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default inject("appState")(observer(App));
