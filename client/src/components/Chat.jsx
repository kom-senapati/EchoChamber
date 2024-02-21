import React, { useState, useEffect, useRef } from "react";
import InputEmoji from "react-input-emoji";
import { IoSend } from "react-icons/io5";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    "Hello!",
    "How are you?",
    "I'm fine, thank you!",
    "What about you?",
    "I'm doing well too!",
    "That's great!",
    "Yes, it is!",
    "How was your day?",
    "It was good, how about yours?",
  ]);
  const chatContainerRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChats([...chats, message]);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default behavior of adding a newline
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll chat container to the bottom
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chats]);

  return (
    <div className="flex flex-col h-[80%] w-8/12 border border-gray-700 shadow-md rounded px-4 py-2">
      <div ref={chatContainerRef} className="overflow-y-auto flex-grow">
        {chats.map((chat, index) => (
          <div className="chat chat-end">
            <div className="chat-bubble">{chat}</div>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <InputEmoji
          value={message}
          onChange={setMessage}
          onKeyDown={handleKeyDown}
          shouldReturn
          placeholder="Type your message..."
          borderRadius={10}
          fontSize={20}
        />
        <button onClick={handleSendMessage} className="btn btn-square">
          <IoSend size={25} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
