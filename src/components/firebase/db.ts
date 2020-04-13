import { db } from './firebase';

// Db API

export const getAllCountries = () => db.ref('summary').child("Countries").once('value');

export const getDbGlobal = () =>
  db.ref('summary').child("Global").once('value');

export const syncDbGlobal = (setSummaryData: any) => {
  db.ref('summary/Global').on('value', (snapshot) => {
    setSummaryData(snapshot.val());
  });
};