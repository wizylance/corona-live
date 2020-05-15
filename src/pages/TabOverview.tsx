import React from "react";
import { inject, observer } from "mobx-react";
import { IonContent, IonPage, useIonViewDidEnter } from "@ionic/react";
import SummaryView from "../components/SummaryView";
import CountryTable from "../components/CountryTable";
import Header from "../components/Header";

import { FirebaseStore } from "../store/firebase/FirebaseStore";
import { AppState } from "../store/app/AppState";
import "./TabOverview.css";

type OverviewProps = {
  dataStore: FirebaseStore;
  appState: AppState;
};

const TabOverview: React.FC<OverviewProps> = ({ dataStore, appState }) => {
  const { summaryData, sortedCountryData, myCountryCode } = dataStore;

  useIonViewDidEnter(() => {
    dataStore.fetchSummary();
    dataStore.syncSummary();
  });

  return (
    <IonPage>
      <Header title="COVID-19" />
      <IonContent>
        <SummaryView data={summaryData} viewMode={appState.viewMode} />
        <CountryTable
          data={sortedCountryData}
          myCountryCode={myCountryCode}
          viewMode={appState.viewMode}
        />
      </IonContent>
    </IonPage>
  );
};

export default inject("dataStore", "appState")(observer(TabOverview));
