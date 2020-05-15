import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import Header from "../components/Header";

import "./TabMap.css";

const TabMap: React.FC = () => {
  return (
    <IonPage>
      <Header title="Map" />
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Map</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Map" />
      </IonContent>
    </IonPage>
  );
};

export default TabMap;
