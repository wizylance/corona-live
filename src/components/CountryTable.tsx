import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { ByCountries, ByCountryData } from "../services/FirebaseService";
import { numberWithCommas } from "../utils/formatting";
import "./CountryTable.css";

type CountryTableProps = {
  data: ByCountries;
};

const CountryTable: React.FC<CountryTableProps> = ({ data }) => {
  const itemRows = [];
  if (data) {
    for (let key in data) {
      let item = data[key];
      itemRows.push(<ItemRow key={item.Country} item={item} />)
    }
  }
  return (
    <IonGrid>
      <HeadRow />
      {itemRows}
    </IonGrid>
  );
};

const HeadRow: React.FC = () => (
  <IonRow className="head-row">
    <IonCol>Location</IonCol>
    <IonCol>Confirmed</IonCol>
    <IonCol>Dead</IonCol>
    <IonCol>Recovered</IonCol>
  </IonRow>
);

type ItemRowProps = {
  item: ByCountryData;
};

const ItemRow: React.FC<ItemRowProps> = ({ item }) => (
  <IonRow className="item-row">
    <IonCol>{item.Country}</IonCol>
    <IonCol>{numberWithCommas(item.TotalConfirmed)}</IonCol>
    <IonCol>{numberWithCommas(item.TotalDeaths)}</IonCol>
    <IonCol>{numberWithCommas(item.TotalRecovered)}</IonCol>
  </IonRow>
);

export default CountryTable;
