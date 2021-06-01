import firebase from 'firebase/app'
import 'firebase/firestore'

type firebaseConf = {
  apiKey: string | undefined
  authDomain: string | undefined
  databaseURL: string | undefined
  projectId: string | undefined
  storageBucket: string | undefined
  messagingSenderId: string | undefined
}

const firebaseConfig: firebaseConf = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
