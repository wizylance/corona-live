import { observable, flow, computed } from "mobx";
import { persist } from "mobx-persist";
import axios from "axios";

const API_ROOT = "https://kt-corona-live.appspot.com";

export type SummaryData = {
  confirmed: number;
  dead: number;
  recovered: number;
  totalCountries: number;
  affectedCountries: number;
  fatalityRate: number;
  recoveryRate: number;
};

export type ByCountryData = {
  location: string;
  latitude: number;
  longitude: number;
  confirmed: number;
  dead: number;
  recovered: number;
  updated: Date;
};

export class DataStore {
  @persist("list")
  @observable
  byCountries: ByCountryData[] = [];

  fetchByCountries = flow(function* (this: DataStore) {
    try {
      const response = yield axios.get(`${API_ROOT}/api/countries/`);
      this.byCountries = response.data.data;
    } catch (err) {
      console.log("Failed to fetch summary data!", err);
    }
  });

  @computed get sortedCountryData(): ByCountryData[] {
    const sortFunc = (first: ByCountryData, second: ByCountryData): number => {
      const diffConfirmed = first.confirmed - second.confirmed;
      if (diffConfirmed !== 0) return diffConfirmed;
      const diffDead = first.dead - second.dead;
      if (diffDead !== 0) return diffDead;
      const diffRecovered = first.recovered - second.recovered;
      if (diffRecovered !== 0) return diffRecovered;
      if (first.location > second.location) return 1;
      if (first.location < second.location) return -1;
      return 0;
    };

    return this.byCountries.slice().sort(sortFunc).reverse();
  }

  @computed get summaryData(): SummaryData {
    const summary: SummaryData = this.byCountries.reduce(
      (total, current) => ({
        confirmed: total.confirmed + current.confirmed,
        dead: total.dead + current.dead,
        recovered: total.recovered + current.recovered,
        totalCountries: total.totalCountries + 1,
        affectedCountries:
          total.affectedCountries + (current.confirmed > 0 ? 1 : 0),
        fatalityRate: total.fatalityRate + current.dead,
        recoveryRate: total.recoveryRate + current.recovered,
      }),
      {
        confirmed: 0,
        dead: 0,
        recovered: 0,
        totalCountries: 0,
        affectedCountries: 0,
        fatalityRate: 0,
        recoveryRate: 0,
      }
    );
    summary.fatalityRate /= summary.confirmed;
    summary.recoveryRate /= summary.confirmed;
    return summary;
  }
}
