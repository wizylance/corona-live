import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const fetch = require("node-fetch");
const _ = require("lodash");

admin.initializeApp();

const SUMMARY_API = "https://api.covid19api.com/summary";

type CountryData = {
  Country: string;
  CountryCode: string;
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
};

const convertCountryArrToObj = (
  arr: CountryData[]
): { string: CountryData } => {
  return _.reduce(
    arr,
    (acc: Object, item: CountryData) => ({ ...acc, [item.CountryCode]: item }),
    {}
  );
};

export const cleanUpdateSummary = functions.https.onRequest(
  async (req, res) => {
    try {
      const response = await fetch(SUMMARY_API);
      const json = await response.json();
      json.Countries = convertCountryArrToObj(json.Countries);
      const ref = admin.database().ref("summary");
      await ref.set(json);
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
);

export const cronUpdateSummary = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async (context) => {
    try {
      const response = await fetch(SUMMARY_API);
      const json = await response.json();
      json.Countries = convertCountryArrToObj(json.Countries);
      const ref = admin.database().ref("summary");

      // TODO: Uncomment these lines to prevent unnecessary checks
      // const dbDate = (await ref.child("Date").once("value")).val();
      // if (dbDate === json.Date) return;

      await ref.child("Date").set(json.Date);

      const dbGlobal = (await ref.child("Global").once("value")).val();
      if (!_.isEqual(dbGlobal, json.Global)) {
        await ref.child("Global").set(json.Global);
        console.info("Updated Global summary.");
      }

      const dbCountries = (await ref.child("Countries").once("value")).val();
      _.forEach(
        json.Countries,
        async (countryData: CountryData, countryCode: string) => {
          const dbCountry = dbCountries[countryCode];
          if (!_.isEqual(countryData, dbCountry)) {
            await ref.child(`Countries/${countryCode}`).set(countryData);
            console.info(`Updated country ${countryData.Country} summary.`);
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  });
