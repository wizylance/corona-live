import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

// MOBX
import { ByCountryData } from '../store/firebase/FirebaseStore';
import { ViewMode } from '../store/app/AppState';

// COMPONENTS
import {
  HeadRow as HeadRowMobile,
  ItemRow as BodyRowMobile,
} from './CountryTable.Mobile';
import {
  HeadRow as HeadRowDesktop,
  ItemRow as BodyRowDesktop,
} from './CountryTable.Desktop';

import './CountryTable.css';

export type CountryTableProps = {
  data: ByCountryData[];
  viewMode: ViewMode;
  myCountryData: ByCountryData;
};

const CountryTable: React.FC<CountryTableProps> = ({
  data,
  viewMode,
  myCountryData,
}) => {
  let headRow: JSX.Element;

  if (window.innerWidth <= 700) {
    headRow = <HeadRowMobile viewMode={viewMode} />;
  } else {
    headRow = <HeadRowDesktop viewMode={viewMode} />;
  }

  const itemProps = (
    item: ByCountryData,
    className: string,
    pinToTop: boolean
  ) => {
    return {
      className: `${className} ${viewMode}`,
      key: item.CountryCode,
      item: item,
      pinToTop: pinToTop,
    };
  };

  const generateBodyRow = (
    item: ByCountryData,
    className: string,
    pinToTop: boolean
  ): JSX.Element => {
    if (window.innerWidth <= 700) {
      return <BodyRowMobile {...itemProps(item, className, pinToTop)} />;
    }

    return <BodyRowDesktop {...itemProps(item, className, pinToTop)} />;
  };

  return (
    <IonGrid className="table-grid">
      <IonRow className={`title-row country-title ${viewMode}`}>
        <IonCol>
          <div className="ion-text-center">By Countries</div>
        </IonCol>
      </IonRow>
      {headRow}
      {myCountryData
        ? generateBodyRow(myCountryData, 'country-row', true)
        : null}
      {data &&
        data.map((item, index) => {
          return generateBodyRow(item, 'item-row', false);
        })}
    </IonGrid>
  );
};

export default CountryTable;
