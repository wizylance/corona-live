import { observable, action, computed } from "mobx";
import { persist } from "mobx-persist";
// import { db } from '../components/firebase/firebase';
import { db } from "../../services/firebase";

export type SummaryData = {
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
};

export type ByCountryData = {
  Country: string;
  CountryCode: string;
  Date: Date;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
};

export type ByShortCountryData = {
  Country: string;
  CountryCode: string;
};

export type ByCountries = {
  [key: string]: ByCountryData;
};

export class FirebaseStore {
  @persist("object")
  @observable
  byCountries: ByCountries = {};

  @persist("object")
  @observable
  summaryData: SummaryData = {
    NewConfirmed: 0,
    NewDeaths: 0,
    NewRecovered: 0,
    TotalConfirmed: 0,
    TotalDeaths: 0,
    TotalRecovered: 0,
  };

  @observable
  myCountryCode: string = "VN";

  fetchByCountries = function (this: FirebaseStore) {
    try {
      db.getAllCountries(this.setAllCountries);
    } catch (err) {
      console.log("Failed to fetch countries data!", err);
    }
  };

  fetchSummary = function (this: FirebaseStore) {
    try {
      db.getDbGlobal(this.setSummaryData);
    } catch (err) {
      console.log("Failed to fetch summary data!", err);
    }
  };

  syncSummary = function (this: FirebaseStore) {
    try {
      db.syncDbGlobal(this.setSummaryData);
    } catch (err) {
      console.log("Failed to fetch summary data!", err);
    }
  };

  @computed get sortedCountryData(): ByCountryData[] {
    let countriesData: ByCountryData[] = [];
    const byCountriesKeys = Object.keys(this.byCountries);
    const byCountriesKeysLength = byCountriesKeys.length;

    const sortFunc = (first: ByCountryData, second: ByCountryData): number => {
      const diffConfirmed = first.TotalConfirmed - second.TotalConfirmed;
      if (diffConfirmed !== 0) return diffConfirmed;
      const diffDead = first.TotalDeaths - second.TotalDeaths;
      if (diffDead !== 0) return diffDead;
      const diffRecovered = first.TotalRecovered - second.TotalRecovered;
      if (diffRecovered !== 0) return diffRecovered;
      if (first.Country > second.Country) return 1;
      if (first.Country < second.Country) return -1;
      return 0;
    };

    for (let i = 0; i < byCountriesKeysLength; i++) {
      if (byCountriesKeys[i] !== this.myCountryCode) {
        countriesData.push(this.byCountries[byCountriesKeys[i]]);
      }
    }

    return countriesData.sort(sortFunc).reverse();
  }

  @computed get myCountryData(): ByCountryData {
    return this.byCountries[this.myCountryCode];
  }

  @computed get shortCountryData(): ByShortCountryData[] {
    let arrays = Object.keys(this.byCountries).map((key) => ({
      CountryCode: this.byCountries[key].CountryCode,
      Country: this.byCountries[key].Country,
    }));
    return arrays;
  }

  @action setSummaryData = (sumary: SummaryData) => {
    this.summaryData = sumary;
  };

  @action setAllCountries = (allCountries: ByCountries) => {
    this.byCountries = allCountries;
  };

  @action setMyCountryCode = (code: string) => {
    this.myCountryCode = code;
  };
}

export default FirebaseStore;
