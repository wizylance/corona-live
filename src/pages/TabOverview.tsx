import React from "react";
import { inject, observer } from "mobx-react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import SummaryView from "../components/SummaryView";
import CountryTable from "../components/CountryTable";
import { FirebaseStore } from "../services/FirebaseService";
import "./TabOverview.css";

type OverviewProps = {
  dataStore: FirebaseStore;
};

const TabOverview: React.FC<OverviewProps> = ({ dataStore }) => {
  const { summaryData, byCountries } = dataStore;

  useIonViewDidEnter(() => {
    dataStore.fetchByCountries();
    dataStore.fetchSummary();
    dataStore.syncSummary();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>COVID-19</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">COVID-19</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SummaryView data={summaryData} />
        <CountryTable data={byCountries} />
      </IonContent>
    </IonPage>
  );
};

export default inject("dataStore")(observer(TabOverview));
