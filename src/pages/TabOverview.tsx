import React, { UIEvent, useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { IonPage, useIonViewDidEnter } from "@ionic/react";

// COMPONENTS
import SummaryView from "../components/SummaryView";
import CountryTable from "../components/CountryTable";
import Header from "../components/Header";
import Loading from "../components/Loading";

// MOBX STORE
import { FirebaseStore, ByCountryData } from "../store/firebase/FirebaseStore";
import { AppState } from "../store/app/AppState";

// HELPERS
import { paginate } from "../utils/array";

import "./TabOverview.css";

type OverviewProps = {
  dataStore: FirebaseStore;
  appState: AppState;
};

type IState = {
  countriesData: ByCountryData[];
  pageSize: number;
  currentPage: number;
  showLoading: boolean;
};

const TabOverview: React.FC<OverviewProps> = ({ dataStore, appState }) => {
  let timeOut: NodeJS.Timer;

  const [localData, setLocalData] = useState<IState>({
    countriesData: [],
    pageSize: 20,
    currentPage: 1,
    showLoading: false,
  });

  const { summaryData, sortedCountryData, myCountryData } = dataStore;

  useIonViewDidEnter(() => {
    dataStore.fetchSummary();
    dataStore.syncSummary();
  });

  if (localData.countriesData.length === 0 && sortedCountryData.length !== 0) {
    const paginatedData = paginate<ByCountryData>(
      sortedCountryData,
      localData.pageSize,
      localData.currentPage
    );

    setLocalData({ ...localData, countriesData: paginatedData });
  }

  const handleScroll = (v: UIEvent<HTMLDivElement>): void => {
    const target: Partial<HTMLDivElement> = v.target;

    const reachedBottom =
      target.scrollTop! + target.offsetHeight! === target.scrollHeight!;
    const reachedMaxData =
      localData.countriesData.length === sortedCountryData.length;

    if (reachedBottom && !localData.showLoading && !reachedMaxData) {
      setLocalData({ ...localData, showLoading: true });
    }

    v.preventDefault();
  };

  if (localData.showLoading) {
    const currentCountriesData = localData.countriesData;
    const nextPage = ++localData.currentPage;
    const paginatedData = paginate<ByCountryData>(
      sortedCountryData,
      localData.pageSize,
      nextPage
    );

    const newCountriesData = [...currentCountriesData, ...paginatedData];

    timeOut = setTimeout(() => {
      setLocalData({
        ...localData,
        currentPage: nextPage,
        countriesData: newCountriesData,
        showLoading: false,
      });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <Header title="COVID-19" />
      <div
        className={`tab-overview content ${appState.viewMode}`}
        onScroll={handleScroll}
      >
        <SummaryView data={summaryData} viewMode={appState.viewMode} />
        <CountryTable
          data={localData.countriesData}
          viewMode={appState.viewMode}
          myCountryData={myCountryData}
        />
        <div className="loading-wrapper">
          {localData.showLoading ? <Loading /> : null}
        </div>
      </div>
    </IonPage>
  );
};

export default inject("dataStore", "appState")(observer(TabOverview));
