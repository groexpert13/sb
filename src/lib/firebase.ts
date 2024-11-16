import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnFmAbx6vyrZ8bHM9lgE2DWpoMXnUfNC0",
  authDomain: "authenchain-51d08.firebaseapp.com",
  projectId: "authenchain-51d08",
  storageBucket: "authenchain-51d08.appspot.com", // исправлено окончание домена
  messagingSenderId: "643656424405",
  appId: "1:643656424405:web:57dc0993ff390168fabb5c",
  measurementId: "G-H4QV9YG1SL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// Добавляем дополнительные области доступа (scopes) для Google провайдера
googleProvider.addScope('email');
googleProvider.addScope('profile');
export const db = getFirestore(app);

