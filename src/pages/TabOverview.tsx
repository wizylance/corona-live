import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { IonPage, useIonViewDidEnter } from '@ionic/react';

// COMPONENTS
import SummaryView from '../components/SummaryView';
import CountryTable from '../components/CountryTable';
import Header from '../components/Header';
import Pagination from '@material-ui/lab/Pagination';

// MOBX STORE
import { FirebaseStore, ByCountryData } from '../store/firebase/FirebaseStore';
import { AppState } from '../store/app/AppState';

// HELPERS
import { paginate } from '../utils/array';

import './TabOverview.css';

type OverviewProps = {
  dataStore: FirebaseStore;
  appState: AppState;
};

type IState = {
  countriesData: ByCountryData[];
  pageSize: number;
  currentPage: number;
  pages: number;
};

const TabOverview: React.FC<OverviewProps> = ({ dataStore, appState }) => {
  const [localData, setLocalData] = useState<IState>({
    countriesData: [],
    pageSize: 100,
    currentPage: 1,
    pages: 1,
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
    const pages = Math.ceil(sortedCountryData.length / localData.pageSize);

    setLocalData({ ...localData, countriesData: paginatedData, pages: pages });
  }

  const handleChangePagination = (event: any, page: number) => {
    const paginatedData = paginate<ByCountryData>(
      sortedCountryData,
      localData.pageSize,
      page
    );

    setLocalData({
      ...localData,
      countriesData: paginatedData,
      currentPage: page,
    });
  };

  return (
    <IonPage>
      <Header title="COVID-19 @WIZYLANCE" />
      <div className={`tab-overview content ${appState.viewMode}`}>
        <SummaryView data={summaryData} viewMode={appState.viewMode} />
        <CountryTable
          data={localData.countriesData}
          viewMode={appState.viewMode}
          myCountryData={myCountryData}
        />
        <Pagination
          className={`custom-pagination ${appState.viewMode}`}
          count={localData.pages}
          defaultPage={1}
          color="primary"
          onChange={handleChangePagination}
        />
        <div className={`about-us ${appState.viewMode}`}>
          <p className="about-us title"><a href='https://wizylance.com/' target='_blank'>ABOUT US</a></p>
          <p className="about-us first-params">
            WizyLance is an exclusive network of the top freelance software developers, designers, testers, business analyst, and project managers in Vietnam.
          </p>
          <p className="about-us second-params">
            We focus on Web Development, App Development and UI Design with
            highly proficiency.
          </p>
        </div>
      </div>
    </IonPage>
  );
};

export default inject('dataStore', 'appState')(observer(TabOverview));
