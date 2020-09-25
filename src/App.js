import React from "react";
import './App.css';

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});

const auth = firebase.auth();

function App() {
  console.log(process.env);
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <section>{user ? "Welcome browski!" : <SignIn />}</section>
      </header>
    </div>
  );
}

export default App;


function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(err => {
      console.log("signInWithGoogle -> err", err);
    });
  };

  return (
    <>
      <h1>Minimal Chat Room</h1>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>Please log in to continue to the chat-room.</p>
    </>
  );
}

