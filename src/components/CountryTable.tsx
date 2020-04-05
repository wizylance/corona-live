import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { ByCountryData } from "../services/DataService";
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
    <IonCol>{item.confirmed}</IonCol>
    <IonCol>{item.dead}</IonCol>
    <IonCol>{item.recovered}</IonCol>
  </IonRow>
);

export default CountryTable;
