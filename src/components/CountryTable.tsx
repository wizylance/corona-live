import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { ByCountryData } from "../services/DataService";
import { numberWithCommas } from "../utils/formatting";
import "./CountryTable.css";

type CountryTableProps = {
  data: ByCountryData[];
};

const CountryTable: React.FC<CountryTableProps> = ({ data }) => {
  return (
    <IonGrid>
      <HeadRow />
      {data && data.map((item) => <ItemRow key={item.location} item={item} />)}
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
    <IonCol>{item.location}</IonCol>
    <IonCol>{numberWithCommas(item.confirmed)}</IonCol>
    <IonCol>{numberWithCommas(item.dead)}</IonCol>
    <IonCol>{numberWithCommas(item.recovered)}</IonCol>
  </IonRow>
);

export default CountryTable;
