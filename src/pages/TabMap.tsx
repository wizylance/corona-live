import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import Header from "../components/Header";

import "./TabMap.css";

const TabMap: React.FC = () => {
  return (
    <IonPage>
      <Header title="Map" />
      <IonContent>
        <ExploreContainer name="Map" />
      </IonContent>
    </IonPage>
  );
};

export default TabMap;
