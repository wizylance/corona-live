import React from 'react';
import CountryFlag from 'react-country-flag';
import { IonRow, IonCol, IonText } from '@ionic/react';

// MOBX
import { ByCountryData } from '../store/firebase/FirebaseStore';
import { ViewMode } from '../store/app/AppState';

// UTILS
import { numberWithCommas } from '../utils/formatting';

import './CountryTable.css';

type ItemRowProps = {
  item: ByCountryData;
  pinToTop: boolean;
  className: string;
};

export const HeadRow: React.FC<{ viewMode: ViewMode }> = ({ viewMode }) => (
  <IonRow className={`head-row ${viewMode}`}>
    <IonCol className="location" size="3">
      Location
    </IonCol>
    <IonCol className="head-data">
      <p>Confirmed</p>
      <p>C Today</p>
    </IonCol>
    <IonCol className="head-data">
      <p>Dead</p>
      <p>D Today</p>
    </IonCol>
    <IonCol className="head-data">
      <p>Recovered</p>
      <p>R Today</p>
    </IonCol>
  </IonRow>
);

export const ItemRow: React.FC<ItemRowProps> = ({
  item,
  pinToTop,
  className,
}) => {
  return (
    <IonRow className={className ? className : ''}>
      <IonCol size="3" className="location">
        <CountryFlag
          countryCode={item.CountryCode}
          style={{
            fontSize: pinToTop ? '2.5em' : '1.5em',
            lineHeight: '1em',
          }}
        />
        <p className="country-name">{item.Country}</p>
      </IonCol>
      <IonCol className="data">
        <IonText color="warning">
          {numberWithCommas(item.TotalConfirmed)}
        </IonText>
        <IonText color="warning">{numberWithCommas(item.NewConfirmed)}</IonText>
      </IonCol>
      <IonCol className="data">
        <IonText color="danger">{numberWithCommas(item.TotalDeaths)}</IonText>
        <IonText color="danger">{numberWithCommas(item.NewDeaths)}</IonText>
      </IonCol>
      <IonCol className="data">
        <IonText color="success">
          {numberWithCommas(item.TotalRecovered)}
        </IonText>
        <IonText color="success">{numberWithCommas(item.NewRecovered)}</IonText>
      </IonCol>
    </IonRow>
  );
};
