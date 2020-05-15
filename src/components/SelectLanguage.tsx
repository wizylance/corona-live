import React from "react";
import { IonSelect, IonSelectOption } from "@ionic/react";
import CountryFlag from "react-country-flag";
import { ByShortCountryData } from "../store/firebase/FirebaseStore";

import "./SelectLanguage.css";

type SelectLanguageProps = {
  myCountryCode: string;
  data: ByShortCountryData[];
  setMyCountryCode: (code: string) => void;
};

const SelectLanguage: React.FC<SelectLanguageProps> = ({
  myCountryCode,
  setMyCountryCode,
  data,
}) => {
  return (
    <IonSelect
      value={myCountryCode}
      placeholder="Select One"
      onIonChange={(e) => setMyCountryCode(e.detail.value)}
    >
      {data &&
        data.map((item) => (
          <IonSelectOption value={item.CountryCode} key={item.CountryCode}>
            <CountryFlag countryCode={item.CountryCode} />
            {item.Country}
          </IonSelectOption>
        ))}
    </IonSelect>
  );
};

export default SelectLanguage;
