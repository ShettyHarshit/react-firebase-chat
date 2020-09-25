import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom(props) {
  const messagesRef = props.firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  console.log("ChatRoom -> messages", messages);

  return (
    <>
      <main>
        {messages &&
          messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </main>
    </>
  );
}

export default ChatRoom;

function ChatMessage(props) {
  const { text } = props.message;
  return (
    <>
      <p>{text}</p>
    </>
  );
}
