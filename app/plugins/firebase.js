import firebase from 'firebase/app'
import 'firebase/firestore'

export default (_, inject) => {
  const config = {
    databaseURL: process.env.FB_DATABASE_URL,
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
  }
  
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config)
  }
  
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  inject('db', firestore);
}