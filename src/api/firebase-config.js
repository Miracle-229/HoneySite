import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA1SzN-5YTASSW4x3JagT4n-swp6V71MRE',
  authDomain: 'honeysite-65472.firebaseapp.com',
  projectId: 'honeysite-65472',
  storageBucket: 'honeysite-65472.appspot.com',
  messagingSenderId: '844696528488',
  appId: '1:844696528488:web:9ea311ebdd9dfd1f273ddd',
  measurementId: 'G-12FZK7SQW8',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
