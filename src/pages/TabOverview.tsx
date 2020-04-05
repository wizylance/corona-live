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
import { DataStore } from "../services/DataService";
import "./TabOverview.css";

type OverviewProps = {
  dataStore: DataStore;
};

const TabOverview: React.FC<OverviewProps> = ({ dataStore }) => {
  const { summaryData, sortedCountryData } = dataStore;

  useIonViewDidEnter(() => {
    dataStore.fetchByCountries();
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
        <CountryTable data={sortedCountryData} />
      </IonContent>
    </IonPage>
  );
};

export default inject("dataStore")(observer(TabOverview));
