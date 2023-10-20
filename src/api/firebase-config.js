import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAI16v3nURQlk6d3roPfpTMZOE3FBXzriI',
  authDomain: 'testhoney-1ff5e.firebaseapp.com',
  projectId: 'testhoney-1ff5e',
  storageBucket: 'testhoney-1ff5e.appspot.com',
  messagingSenderId: '943169085115',
  appId: '1:943169085115:web:b1839f3daf42903fdc939e',
  measurementId: 'G-H1RJHHKD9Z',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
