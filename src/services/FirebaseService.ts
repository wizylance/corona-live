import { observable, action } from "mobx";
import { persist } from "mobx-persist";
// import { db } from '../components/firebase/firebase';
import { db } from '../components/firebase';

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
}
export type ByCountries = {
  [key: string]: ByCountryData
}

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

  fetchByCountries = function (this: FirebaseStore) {
    try {
      db.getAllCountries(this.setAllCountries);
    } catch (err) {
      console.log("Failed to fetch contrys data!", err);
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

  @action setSummaryData = (sumary: SummaryData) => {
    this.summaryData = sumary;
  }

  @action setAllCountries = (allCountries: ByCountries) => {
    this.byCountries = allCountries;
  }

}

export default FirebaseStore;
