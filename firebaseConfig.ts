import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: 'nameflame.firebaseapp.com',
    projectId: 'nameflame',
    storageBucket: 'nameflame.firebasestorage.app',
    messagingSenderId: '1090437595615',
    appId: '1:1090437595615:web:545e0ca29ed57291adc46a',
    measurementId: 'G-LGBKR79HPS',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };