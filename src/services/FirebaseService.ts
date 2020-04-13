import { observable, flow, action } from "mobx";
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

  fetchByCountries = flow(function* (this: FirebaseStore) {
    try {
      const allCountries = (yield db.getAllCountries()).val();
      this.byCountries = allCountries;
    } catch (err) {
      console.log("Failed to fetch contrys data!", err);
    }
  });

  fetchSummary = flow(function* (this: FirebaseStore) {
    try {
      const dbGlobal = (yield db.getDbGlobal()).val();
      this.summaryData = dbGlobal;
    } catch (err) {
      console.log("Failed to fetch summary data!", err);
    }
  });

  @action syncSummary = function (this: FirebaseStore) {
    try {
      db.syncDbGlobal(this.setSummaryData);
    } catch (err) {
      console.log("Failed to fetch summary data!", err);
    }
  };

  @action setSummaryData = (sumary: SummaryData) => {
    this.summaryData = sumary;
  }
}

export default FirebaseStore;