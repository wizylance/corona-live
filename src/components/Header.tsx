import React from 'react';
import { inject, observer } from 'mobx-react';
import { IonHeader, useIonViewDidEnter, IonToggle } from '@ionic/react';

import { ToggleChangeEventDetail } from '@ionic/core';

import './Header.css';

import SelectLanguage from './SelectLanguage';
import { FirebaseStore } from '../store/firebase/FirebaseStore';
import { AppState, ViewMode } from '../store/app/AppState';

type HeaderProps = {
  dataStore?: FirebaseStore;
  appState?: AppState;
  title: string;
};

const Header: React.FC<HeaderProps> = ({ dataStore, appState, title }) => {
  useIonViewDidEnter(() => {
    dataStore?.fetchByCountries();
  });

  const handleToggleMode = (e: CustomEvent<ToggleChangeEventDetail>) => {
    const viewMode = e.detail.checked
      ? ViewMode.LIGHT_MODE
      : ViewMode.DARK_MODE;

    appState!.changeViewMode(viewMode);
  };
  return (
    <IonHeader className={`header ${appState!.viewMode}`}>
      <div className="header-title">{title}</div>
      <div className="header-country-selection">
        {dataStore?.shortCountryData ? (
          <SelectLanguage
            myCountryCode={dataStore.myCountryCode}
            setMyCountryCode={dataStore.setMyCountryCode}
            data={dataStore.shortCountryData}
          />
        ) : null}
        <IonToggle
          color="dark"
          checked={appState!.viewMode === ViewMode.LIGHT_MODE}
          onIonChange={handleToggleMode}
          mode="ios"
        />
      </div>
    </IonHeader>
  );
};

export default inject('dataStore', 'appState')(observer(Header));
