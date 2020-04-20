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
import SelectLanguage from "../components/SelectLanguage";
import { FirebaseStore } from "../services/FirebaseService";
import "./TabOverview.css";

type OverviewProps = {
  dataStore: FirebaseStore;
};

const TabOverview: React.FC<OverviewProps> = ({ dataStore }) => {
  const {
    summaryData,
    sortedCountryData,
    shortCountryData,
    myCountryCode,
  } = dataStore;

  useIonViewDidEnter(() => {
    dataStore.fetchByCountries();
    dataStore.fetchSummary();
    dataStore.syncSummary();
  });

  return (
    <IonPage>
      <IonHeader className="header">
        <IonToolbar>
          <IonTitle>COVID-19</IonTitle>
        </IonToolbar>
        <SelectLanguage
          myCountryCode={myCountryCode}
          setMyCountryCode={dataStore.setMyCountryCode}
          data={shortCountryData}
        />
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">COVID-19</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SummaryView data={summaryData} />
        <CountryTable data={sortedCountryData} myCountryCode={myCountryCode} />
      </IonContent>
    </IonPage>
  );
};

export default inject("dataStore")(observer(TabOverview));
