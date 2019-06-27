// Your web app's Firebase configuration
import * as firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCBDxfiDcyQ--IRdtJ4jeUfJ2XOSdL3Ar4',
  authDomain: 'biley-world-trip.firebaseapp.com',
  databaseURL: 'https://biley-world-trip.firebaseio.com',
  projectId: 'biley-world-trip',
  storageBucket: 'biley-world-trip.appspot.com',
  messagingSenderId: '589117794348',
  appId: '1:589117794348:web:0e21134063a63e8a'
};

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'biley-world-trip' })
  .firestore();

export const TimeStamp = firebase.firestore.Timestamp;
export const GeoPoint = firebase.firestore.GeoPoint;