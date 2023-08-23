import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://nextjs-socketio-api.vercel.app/");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    
    if(message){
      socket.emit("message", message);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.off("new-message")
    socket.on("new-message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  return (
    <div>
      <form>
        <input
          className="p-1 text-black"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-green-400 p-1 mx-2" onClick={sendMessage}>send</button>
      </form>
      <div className="messages flex flex-col items-center justify-center mt-7">
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
    </div>
  );
}
