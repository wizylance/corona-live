import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./TabCountries.css";

const TabCountries: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Countries</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Countries</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Countries" />
      </IonContent>
    </IonPage>
  );
};

export default TabCountries;
