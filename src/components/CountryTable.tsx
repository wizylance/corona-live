import React from "react";
import CountryFlag from "react-country-flag";
import { IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import { ByCountryData } from "../services/FirebaseService";
import { numberWithCommas } from "../utils/formatting";
import "./CountryTable.css";

type CountryTableProps = {
  data: ByCountryData[];
  myCountryCode: string;
};

const CountryTable: React.FC<CountryTableProps> = ({ data, myCountryCode }) => {
  return (
    <IonGrid className="table-grid">
      <IonRow className="title-row">
        <IonCol>
          <div className="ion-text-center">
            <h2>By Countries</h2>
          </div>
        </IonCol>
      </IonRow>
      <HeadRow />
      {data &&
        data.map((item) => {
          const isUserCountry = item && item.CountryCode === myCountryCode;
          return (
            <ItemRow
              className={isUserCountry ? "country-row" : "item-row"}
              key={item.CountryCode}
              item={item}
              pinToTop={isUserCountry}
            />
          );
        })}
    </IonGrid>
  );
};

const HeadRow: React.FC = () => (
  <IonRow className="head-row">
    <IonCol size="3">Location</IonCol>
    <IonCol>Confirmed</IonCol>
    <IonCol>Dead</IonCol>
    <IonCol>Recovered</IonCol>
    <IonCol>C Today</IonCol>
    <IonCol>D Today</IonCol>
    <IonCol>R Today</IonCol>
  </IonRow>
);

type ItemRowProps = {
  item: ByCountryData;
  pinToTop: boolean;
  className: string;
};

const ItemRow: React.FC<ItemRowProps> = ({ item, pinToTop, className }) => {
  return (
    <IonRow className={className ? className : ""}>
      <IonCol size="3">
        <CountryFlag
          countryCode={item.CountryCode}
          style={{
            fontSize: pinToTop ? "4em" : "2.5em",
            lineHeight: "1em",
          }}
        />
        {item.Country}
      </IonCol>
      <IonCol>
        <IonText color="warning">
          {numberWithCommas(item.TotalConfirmed)}
        </IonText>
      </IonCol>
      <IonCol>
        <IonText color="danger">{numberWithCommas(item.TotalDeaths)}</IonText>
      </IonCol>
      <IonCol>
        <IonText color="success">
          {numberWithCommas(item.TotalRecovered)}
        </IonText>
      </IonCol>
      <IonCol>
        <IonText color="warning">{numberWithCommas(item.NewConfirmed)}</IonText>
      </IonCol>
      <IonCol>
        <IonText color="danger">{numberWithCommas(item.NewDeaths)}</IonText>
      </IonCol>
      <IonCol>
        <IonText color="success">{numberWithCommas(item.NewRecovered)}</IonText>
      </IonCol>
    </IonRow>
  );
};

export default CountryTable;
