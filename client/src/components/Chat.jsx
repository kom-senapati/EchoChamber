import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import InputEmoji from "react-input-emoji";
import { IoSend } from "react-icons/io5";
import { LuAlignRight } from "react-icons/lu";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { parseCookies } from "nookies";
import { format, register } from "timeago.js";
import { AiOutlineFileProtect } from "react-icons/ai";

const ENDPOINT = "http://localhost:3000";
let socket, selectedChatCompare;

const Chat = () => {
  const apiEndpoint = "http://localhost:3000/";
  const { groupId } = useParams();
  // const { currentUser, setCurrentUser } = useContext(userInfo);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [chamber, setChamber] = useState(null);

  const navigate = useNavigate();
  const cookie = parseCookies();
  const userId = cookie["userId"];
  if (userId === undefined) {
    navigate("/login");
  }
  const customTimeTemplate = (number, index, totalSec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
      ["just now", "right now"],
      ["%ssec ago", "in %s seconds"],
      ["1m ago", "in 1 minute"],
      ["%sm ago", "in %s minutes"],
      ["1h ago", "in 1 hour"],
      ["%sh ago", "in %s hours"],
      ["1d ago", "in 1 day"],
      ["%sd ago", "in %s days"],
      ["1w ago", "in 1 week"],
      ["%sw ago", "in %s weeks"],
      ["1mon ago", "in 1 month"],
      ["%smon ago", "in %s months"],
      ["1y ago", "in 1 year"],
      ["%syrs ago", "in %s years"],
    ][index];
  };
  // register your custom with timeago
  register("custom-time-template", customTimeTemplate);

  useEffect(() => {
    socket = io(ENDPOINT);
    getUsers();
    fetchMessages();
  }, []);


  useEffect(() => {
    socket.on("new-message", (incoming_message) => {
      setChats([...chats, incoming_message]);
    });
    // Scroll chat container to the bottom
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  });

  const getUsers = useCallback(async () => {
    try {
      const resp = await axios.post(`/chat/getChatById`, {
        chamberId: groupId,
      });

      if (resp.status == 200) {
        console.log(resp.data);
        setChamber(resp.data[0]);
        setUsers(resp.data[0].users);
      }
    } catch (error) {
      console.log(error);
    }
  }, [chats]);

  const fetchMessages = async () => {
    try {
      const resp = await axios.get(`/message/getmessage`, {
        params: {
          chatId: groupId,
        },
      });
      if (resp.status == 200) {
        if (resp.data) {
          setChats(resp.data);
/*           setSelectedChat(resp.data[0]?.chat._id);
 */        }

        socket.emit("join-chat", groupId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSendMessage = async () => {
    try {
      const resp = await axios.post(`/message/sendmessage`, {
        userId: userId,
        content: message,
        chatId: groupId,
      });
      if (resp.status == 200) {
        socket.emit("new-message", resp.data);
        /*  setChats([...chats, resp.data]); */
      }
      setMessage("");
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
      <main className="h-full w-full p-2 flex items-center justify-center">
        <section className="flex h-full w-full md:h-[80%] md:w-[80%] border border-gray-700 rounded-md bg-neutral">
          <aside className="w-full flex-1 border-r border-gray-700 px-10 py-0 h-full menu bg-base-200 rounded hidden md:block">
            <h3 className="py-4 text-xl font-bold mb-2 text-accent">
              Users in {chamber?.chatName}
            </h3>
            {chamber?.users.map((user, idx) => (
              <div key={idx} className="flex items-center">
                <div className="avatar">
                  <div className="w-8 rounded-box">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <p className="font-semibold text-lg p-2 rounded-md cursor-pointer">
                  {user.username}
                </p>
                <div className="flex justify-center items-center gap-2">
                  {
                    chamber.groupAdmin === user._id ? <FaStar size={16} className="text-accent" /> : null
                  }
                  {
                    userId === user._id ? "(you)" : null
                  }
                </div>
              </div>
            ))}
          </aside>
          <div className="flex flex-col flex-[3] w-full border border-none shadow-md rounded px-4 py-2 bg-base-200 relative">
            <IoArrowBackCircleOutline
              size={40}
              className="absolute top-3 -left-5 border-2 border-base-200 bg-base-200 rounded-full cursor-pointer text-accent hidden md:block"
              onClick={() => navigate(-1)}
            />
            <div className="flex items-center justify-between md:justify-center font-semibold text-center text-accent text-xl pt-2 pb-4 md:pt-2 md:pb-2 shadow-base-100 shadow-sm">
              {chamber?.chatName}
              <div className="drawer md:hidden z-[5] w-fit">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer" className="drawer-button">
                    <LuAlignRight size={28} />
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <aside className="w-72 flex-1 border-r border-gray-700 px-10 h-full menu bg-base-200 rounded ">
                    <h3 className="py-4 text-xl font-bold mb-2 text-accent">
                      Users in {chamber?.chatName}
                    </h3>
                    {chamber?.users.map((user, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="avatar">
                          <div className="w-8 rounded-box">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          </div>
                        </div>
                        <p className="font-semibold text-lg text-base-content p-2 rounded-md cursor-pointer">
                          {user.username}
                        </p>
                        <div className="flex justify-center items-center gap-2">
                          {
                            chamber.groupAdmin === user._id ? <FaStar size={16} className="text-accent" /> : null
                          }
                          {
                            userId === user._id ? <span className="text-neutral">{"(you)"}</span> : null
                          }
                        </div>
                      </div>
                    ))}
                  </aside>
                </div>
              </div>
            </div>
            <div
              ref={chatContainerRef}
              className="overflow-y-auto flex-grow no-scrollbar"
            >
              <div className="overflow-hidden md:p-5">
                {chats.map((chat, index) => (
                  <div key={index}>
                    {chat.sender._id === userId ? (
                      <>
                        <div key={index} className="chat chat-end">
                          <div className="chat-header mr-1">
                            {chat.sender.username}
                          </div>
                          <div className="chat-bubble chat-bubble-accent text-white">
                            {chat.content}
                          </div>
                          <div className="chat-footer opacity-50">
                            {format(chat.createdAt, "custom-time-template")}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div key={index} className="chat chat-start">
                          <div className="chat-header ml-1">
                            {chat.sender.username}
                          </div>
                          <div className="chat-bubble text-white">
                            {chat.content}
                          </div>
                          <div className="chat-footer opacity-50">
                            {format(chat.createdAt, "custom-time-template")}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex mt-2">
              <InputEmoji
                value={message}
                onChange={setMessage}
                onKeyDown={handleKeyDown}
                shouldReturn
                placeholder="Type your message..."
                borderRadius={10}
              />
              <button
                onClick={handleSendMessage}
                onChange={handleMessageChange}
                className="btn btn-square"
              >
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