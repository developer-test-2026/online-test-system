// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged as fbOnAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-functions.js";

const firebaseConfig = {
  apiKey: "AIzaSyBF8bot9Ad7-kHfuHZ9taeWGhR_UQkwCQA",
  authDomain: "online-exam-system-80b13.firebaseapp.com",
  projectId: "online-exam-system-80b13",
  storageBucket: "online-exam-system-80b13.firebasestorage.app",
  messagingSenderId: "588554492841",
  appId: "1:588554492841:web:eb9a530f338532daddc2b8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch(err => console.warn('IndexedDB persistence failed:', err));
const auth = getAuth(app);
const functions = getFunctions(app);

window.FB = {
  app, db, auth, functions, firebaseConfig,
  signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
  signOut: () => fbSignOut(auth),
  onAuthStateChanged: (cb) => fbOnAuthStateChanged(auth, cb),
  call: (name, data) => {
    const fn = httpsCallable(functions, name);
    return fn(data);
  }
};

console.log('Firebase initialized', firebaseConfig.projectId);
