import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Provider } from "mobx-react";
import { create } from "mobx-persist";
import { ellipse, square, triangle } from "ionicons/icons";

import { FirebaseStore } from "./services/FirebaseService";

import TabOverview from "./pages/TabOverview";
import TabCountries from "./pages/TabCountries";
import TabMap from "./pages/TabMap";

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
import "./theme/variables.css";

const App: React.FC = () => {
  const hydrate = create({});
  const dataStore = new FirebaseStore();

  hydrate("dataStore", dataStore);

  return (
    <IonApp>
      <Provider dataStore={dataStore}>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/overview" component={TabOverview} exact={true} />
              <Route path="/countries" component={TabCountries} exact={true} />
              <Route path="/map" component={TabMap} />
              <Route
                path="/"
                render={() => <Redirect to="/overview" />}
                exact={true}
              />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab-overview" href="/overview">
                <IonIcon icon={triangle} />
                <IonLabel>Overview</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab-countries" href="/countries">
                <IonIcon icon={ellipse} />
                <IonLabel>Countries</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab-map" href="/map">
                <IonIcon icon={square} />
                <IonLabel>Map</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </Provider>
    </IonApp>
  );
};

export default App;
