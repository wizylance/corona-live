import { db } from './firebase';
import { SummaryData, ByCountries } from '../../services/FirebaseService';

// Db API

export const getAllCountries = (setAllCountries: (d: ByCountries) => void) => db.ref('summary/Countries').once('value', (snapshot) => setAllCountries(snapshot.val()));

export const getDbGlobal = (setSummaryData: (d: SummaryData) => void) =>
  db.ref('summary/Global').once('value', (snapshot) => setSummaryData(snapshot.val()));

export const syncDbGlobal = (setSummaryData: (d: SummaryData) => void) => {
  db.ref('summary/Global').on('value', (snapshot) => {
    setSummaryData(snapshot.val());
  });
};
