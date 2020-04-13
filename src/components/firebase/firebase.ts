import * as firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

firebase.initializeApp(config);
// const config = {
//   apiKey: "AIzaSyAdUjovVr0SM-H75zLq_ItxgFgoqAHxVpE",
//   projectId: "kt-corona-web",
//   databaseName: "kt-corona-web",
//   bucket: "kt-corona-web"
// };

// const firebaseConfig = {
//   apiKey: config.apiKey,
//   authDomain: `${config.projectId}.firebaseapp.com`,
//   databaseURL: `https://${config.databaseName}.firebaseio.com`,
//   storageBucket: `${config.bucket}.appspot.com`
// };

// firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export {
  db
};
