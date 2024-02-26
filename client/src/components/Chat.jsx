import React, { useState, useEffect, useRef, useContext } from "react";
import InputEmoji from "react-input-emoji";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client"
import { useParams } from "react-router-dom";
import { userInfo } from "../App";
import axios from "axios";


const ENDPOINT = "http://localhost:3000";
let socket, selectedChatCompare;



const Chat = () => {

  const apiEndpoint = 'http://localhost:3000/'
  const { groupId } = useParams();
  const { currentUser, setCurrentUser } = useContext(userInfo);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);
  const [selectedChat, setSelectedChat] = useState();


  useEffect(() => {
    fetchMessages();
    socket = io(ENDPOINT)
  }, [])



  useEffect(() => {

    socket.on('new-message', (incoming_message) => {
      console.log('incoming_message');
      setChats([...chats, incoming_message])
    })
    // Scroll chat container to the bottom
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

  })




  const fetchMessages = async () => {
    try {
      const resp = await axios.get(`${apiEndpoint}message/getmessage`, {
        params: {
          chatId: groupId
        }
      })
      if (resp.status == 200) {
/*         console.log(resp.data[0]);
 */        setChats(resp.data)
        setSelectedChat(resp.data[0].chat._id)
        socket.emit('join-chat', (groupId))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };



  const handleSendMessage = async () => {
    try {
      const resp = await axios.post(`${apiEndpoint}message/sendmessage`, {
        userId: currentUser._id,
        content: message,
        chatId: selectedChat
      })
      if (resp.status == 200) {
        console.log(resp.data);
        setChats([...chats, resp.data])
        socket.emit('new-message', (resp.data))
      }
    } catch (error) {
      console.log(error);
    }

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <>
      <input onChange={(e) => setCurrentUser(e.target.value)} />
      <main className="h-full w-full p-2 flex items-center justify-center">
        <section className="flex  h-[80%] w-[80%] border border-gray-700 rounded-md">
          <aside className="w-full flex-1 border-r border-gray-700 h-full ">
            {/* Groups the current user currenly in */}

          </aside>
          <div className="flex flex-col flex-[3] w-full border border-none shadow-md rounded px-4 py-2">
            <div ref={chatContainerRef} className="overflow-y-auto flex-grow">
              {chats.map((chat, index) => (
                <>

                  {chat.sender === currentUser._id ? (
                    <>
                      <div key={index} className="chat chat-end">
                        <div className="chat-bubble">{chat.content}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div key={index} className="chat chat-start">
                        <div className="chat-bubble">{chat.content}</div>
                      </div>
                    </>
                  )}
                </>
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
              <button onClick={handleSendMessage} onChange={handleMessageChange} className="btn btn-square">
                <IoSend size={25} />
              </button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default Chat;
