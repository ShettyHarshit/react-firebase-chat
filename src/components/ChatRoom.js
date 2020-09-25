import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom(props) {
  const messagesRef = props.firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async e => {
    e.preventDefault();

    const { uid, photoURL } = props.auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue("");
  };

  console.log("ChatRoom -> messages", messages);

  return (
    <>
      <main>
        {messages &&
          messages.map(msg => (
            <ChatMessage
              user={props.auth.currentUser}
              key={msg.id}
              message={msg}
            />
          ))}
        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={e => setFormValue(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit" disabled={!formValue}>
            Send
          </button>
        </form>
      </main>
    </>
  );
}

export default ChatRoom;

function ChatMessage(props) {
  const { text } = props.message;

  return (
    <div>
      <p>{`${props.user.displayName}: ${text}`}</p>
    </div>
  );
}
