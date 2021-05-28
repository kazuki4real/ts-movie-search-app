import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAuS-FllN95aGJtEGf-ENQEgSEM3wnLpQE',
  authDomain: 'ts-movie.firebaseapp.com',
  projectId: 'ts-movie',
  storageBucket: 'ts-movie.appspot.com',
  messagingSenderId: '239649469542',
  appId: '1:239649469542:web:1449aeb42426d6f8f4e9a7'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
