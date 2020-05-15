import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { ByCountryData } from "../store/firebase/FirebaseStore";
import { ViewMode } from "../store/app/AppState";
import CountryTableMobile from "./CountryTable.Mobile";
import CountryTableDesktop from "./CountryTable.Desktop";

import "./CountryTable.css";

export type CountryTableProps = {
  data: ByCountryData[];
  myCountryCode: string;
  viewMode: ViewMode;
};

const CountryTable: React.FC<CountryTableProps> = ({
  data,
  myCountryCode,
  viewMode,
}) => {
  const component =
    window.innerWidth <= 700 ? (
      <CountryTableMobile
        data={data}
        myCountryCode={myCountryCode}
        viewMode={viewMode}
      />
    ) : (
      <CountryTableDesktop
        data={data}
        myCountryCode={myCountryCode}
        viewMode={viewMode}
      />
    );
  return (
    <IonGrid className="table-grid">
      <IonRow className={`title-row country-title ${viewMode}`}>
        <IonCol>
          <div className="ion-text-center">By Countries</div>
        </IonCol>
      </IonRow>
      {component}
    </IonGrid>
  );
};

export default CountryTable;

// const HeadRow: React.FC = () => (
//   <IonRow className="head-row">
//     <IonCol size="3">Location</IonCol>
//     <IonCol>Confirmed</IonCol>
//     <IonCol>Dead</IonCol>
//     <IonCol>Recovered</IonCol>
//     <IonCol>C Today</IonCol>
//     <IonCol>D Today</IonCol>
//     <IonCol>R Today</IonCol>
//   </IonRow>
// );

// type ItemRowProps = {
//   item: ByCountryData;
//   pinToTop: boolean;
//   className: string;
// };

// const ItemRow: React.FC<ItemRowProps> = ({ item, pinToTop, className }) => {
//   return (
//     <IonRow className={className ? className : ""}>
//       <IonCol size="3">
//         <CountryFlag
//           countryCode={item.CountryCode}
//           style={{
//             fontSize: pinToTop ? "4em" : "2.5em",
//             lineHeight: "1em",
//           }}
//         />
//         {item.Country}
//       </IonCol>
//       <IonCol>
//         <IonText color="warning">
//           {numberWithCommas(item.TotalConfirmed)}
//         </IonText>
//       </IonCol>
//       <IonCol>
//         <IonText color="danger">{numberWithCommas(item.TotalDeaths)}</IonText>
//       </IonCol>
//       <IonCol>
//         <IonText color="success">
//           {numberWithCommas(item.TotalRecovered)}
//         </IonText>
//       </IonCol>
//       <IonCol>
//         <IonText color="warning">{numberWithCommas(item.NewConfirmed)}</IonText>
//       </IonCol>
//       <IonCol>
//         <IonText color="danger">{numberWithCommas(item.NewDeaths)}</IonText>
//       </IonCol>
//       <IonCol>
//         <IonText color="success">{numberWithCommas(item.NewRecovered)}</IonText>
//       </IonCol>
//     </IonRow>
//   );
// };

// export default CountryTable;
