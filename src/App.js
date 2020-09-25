import React from "react";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/firestore";
import "firebase/auth";

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
const firestore = firebase.firestore();

function App() {
  const [hasLoggedIn] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>Welcome to the chat room 💬</h1>
      </header>
      <section>
        {hasLoggedIn ? (
          <ChatRoom firebase={firebase} auth={auth} firestore={firestore} />
        ) : (
          <SignIn />
        )}
      </section>
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
    <center>
      <h1>Minimal Chat Room</h1>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>Please log in to continue to the chat-room.</p>
    </center>
  );
}
