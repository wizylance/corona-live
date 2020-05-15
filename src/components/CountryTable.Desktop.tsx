import React from "react";
import CountryFlag from "react-country-flag";
import { IonRow, IonCol, IonText } from "@ionic/react";
import { ByCountryData } from "../store/firebase/FirebaseStore";
import { ViewMode } from "../store/app/AppState";
import { numberWithCommas } from "../utils/formatting";
import { CountryTableProps } from "./CountryTable";
import "./CountryTable.css";

const CountryTable: React.FC<CountryTableProps> = ({
  data,
  myCountryCode,
  viewMode,
}) => {
  return (
    <>
      <HeadRow viewMode={viewMode} />
      {data &&
        data.map((item) => {
          const isUserCountry = item && item.CountryCode === myCountryCode;
          return (
            <ItemRow
              className={
                isUserCountry
                  ? `country-row ${viewMode}`
                  : `item-row ${viewMode}`
              }
              key={item.CountryCode}
              item={item}
              pinToTop={isUserCountry}
            />
          );
        })}
    </>
  );
};

const HeadRow: React.FC<{ viewMode: ViewMode }> = ({ viewMode }) => (
  <IonRow className={`head-row desktop ${viewMode}`}>
    <IonCol className="location" size="3">
      Location
    </IonCol>
    <IonCol className="head-data">
      <p>Confirmed</p>
    </IonCol>
    <IonCol className="head-data">
      <p>Dead</p>
    </IonCol>
    <IonCol className="head-data">
      <p>Recovered</p>
    </IonCol>
    <IonCol className="head-data">
      <p>C Today</p>
    </IonCol>
    <IonCol className="head-data">
      <p>D Today</p>
    </IonCol>
    <IonCol className="head-data">
      <p>R Today</p>
    </IonCol>
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
      <IonCol size="3" className="location desktop">
        <CountryFlag
          countryCode={item.CountryCode}
          style={{
            fontSize: pinToTop ? "4em" : "2.5em",
            lineHeight: "1em",
          }}
        />
        <p className="country-name">{item.Country}</p>
      </IonCol>
      <IonCol className="data">
        <IonText color="warning">
          {numberWithCommas(item.TotalConfirmed)}
        </IonText>
      </IonCol>
      <IonCol className="data">
        <IonText color="danger">{numberWithCommas(item.TotalDeaths)}</IonText>
      </IonCol>
      <IonCol className="data">
        <IonText color="success">
          {numberWithCommas(item.TotalRecovered)}
        </IonText>
      </IonCol>
      <IonCol className="data">
        <IonText color="warning">{numberWithCommas(item.NewConfirmed)}</IonText>
      </IonCol>
      <IonCol className="data">
        <IonText color="danger">{numberWithCommas(item.NewDeaths)}</IonText>
      </IonCol>
      <IonCol className="data">
        <IonText color="success">{numberWithCommas(item.NewRecovered)}</IonText>
      </IonCol>
    </IonRow>
  );
};

export default CountryTable;
