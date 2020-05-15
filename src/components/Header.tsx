import React from "react";
import { inject, observer } from "mobx-react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";

import "./Header.css";

import SelectLanguage from "./SelectLanguage";
import { FirebaseStore } from "../store/firebase/FirebaseStore";
import { AppState } from "../store/app/AppState";

type HeaderProps = {
  dataStore?: FirebaseStore;
  appState?: AppState;
  title: string;
};

const Header: React.FC<HeaderProps> = ({ dataStore, appState, title }) => {
  useIonViewDidEnter(() => {
    dataStore?.fetchByCountries();
  });

  return (
    <IonHeader className="header">
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
      {dataStore?.shortCountryData ? (
        <SelectLanguage
          myCountryCode={dataStore.myCountryCode}
          setMyCountryCode={dataStore.setMyCountryCode}
          data={dataStore.shortCountryData}
        />
      ) : null}
    </IonHeader>
  );
};

export default inject("dataStore", "appState")(observer(Header));
