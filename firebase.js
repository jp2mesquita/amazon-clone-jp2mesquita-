import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWUd2JFv3Mbxstb8zPgFN664AR9zanPeo",
  authDomain: "amzn-2-clone-1a049.firebaseapp.com",
  projectId: "amzn-2-clone-1a049",
  storageBucket: "amzn-2-clone-1a049.appspot.com",
  messagingSenderId: "725232187623",
  appId: "1:725232187623:web:b09e8a834966190c9c4a42"
};

const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

  const db = app.firestore()

  export default db