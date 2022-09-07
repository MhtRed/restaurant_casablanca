import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDW4kaBbJcqvxUhUATUCvQQLSVULwnx_sc",
  authDomain: "restaurant-app-c26cc.firebaseapp.com",
  databaseURL:
    "https://restaurant-app-c26cc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "restaurant-app-c26cc",
  storageBucket: "restaurant-app-c26cc.appspot.com",
  messagingSenderId: "720294313071",
  appId: "1:720294313071:web:387437ea89353d2aa4619a",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export { app, fireStore, storage };
