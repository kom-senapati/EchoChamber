import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../utils";
import { userInfo } from "../App";
import axios from "axios";
import { parseCookies } from "nookies";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default function Dummychat() {
  const apiEndpoint = "http://localhost:3000/";
  const [joinRoomName, setJoinRoomName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const [searchUserTerm, setsearchUserTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [userFromDB, setuserFromDB] = useState([]);
  const { currentUser, setCurrentUser } = useContext(userInfo);
  const navigate = useNavigate();
  const [grpSkeleton, setGrpSkeleton] = useState(false);

  const cookie = parseCookies();
  const userId = cookie["userId"];
  if (userId === undefined) {
    navigate("/login");
  }
  useEffect(() => {
    const fetchUser = async () => {
      const resp = await axios.get("/user/getUsers");
      console.log(resp.data.userList);
      setuserFromDB(resp.data.userList);
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    getGroups();
  }, [userId]);
  console.log(userId);
  const getGroups = useCallback(async () => {
    try {
      setGrpSkeleton(true);
      const resp = await axios.get(`/chat/getchats`, {
        params: {
          currentUserId: userId,
        },
      });
      if (resp.status == 200) {
        /* console.log(resp.data); */
        setChats(resp.data);
        setGrpSkeleton(false);
      }
    } catch (error) {
      setGrpSkeleton(false);
      console.log(error);
    }
  }, [chats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomName === "" || roomName.length < 4) {
      setError("Room name should atleast contain 4 character!!");
      return;
    }
    setError("");
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    const filtered = chats.filter((chat) => chat.chatName === joinRoomName);
    const resp = await axios.post("/chat/updateChatById", {
      params: {
        chamberId: filtered[0]._id,
        userId,
      },
    });
    console.log(resp);
  };

  const createRoomClick = () => {
    console.log(roomName);
    console.log(selectedUsers);
    console.log(userId);
    const createRoom = async () => {
      const resp = await axios.post("/chat/creategroup", {
        groupusers: selectedUsers,
        groupname: roomName,
        user: userId,
      });
      if (resp) {
        console.log(resp);
      }
    };
    createRoom();
  };

  console.log(selectedUsers);
  return (
    <main className="h-full w-full flex items-center justify-center">
      <section className="h-[80%] w-full max-w-7xl bg-base-200 mx-[50px] shadow-md border border-gray-700 rounded-md flex">
        <aside className="flex-[1] h-full w-full  px-8 py-12 flex flex-col border-r-2 border-base-100">
          <h3 className="p-2 text-xl font-bold mb-4 text-accent">
            Available Rooms
          </h3>
          <div className="space-y-1 h-full text-base-content menu bg-base-200 rounded-box">
            {
              grpSkeleton ? (<div>
                <div className="skeleton rounded-sm h-9 mb-3 w-full"></div>
                <div className="skeleton h-9 rounded-sm mb-3 w-full"></div>
                <div className="skeleton h-9 rounded-sm mb-3 w-full"></div>
                <div className="skeleton h-9 rounded-sm mb-3 w-full"></div>
                <div className="skeleton h-9 rounded-sm mb-3 w-full"></div>
              </div>) : chats?.map((chat) => (
                <div
                  key={chat._id}
                  className=""
                  onClick={() => navigate(`group/${chat._id}`)}
                >
                  <p className="font-semibold text-lg hover:bg-neutral hover:text-neutral-content p-2 rounded-md cursor-pointer">
                    {chat.chatName}
                  </p>
                </div>
              ))
            }
          </div>
        </aside>
        <aside className="flex-[3] h-full w-full  flex flex-col items-center justify-center p-4">
          <AiOutlineUsergroupAdd size={40} className="text-center" />
          <p className="text-xs text-error">{error}</p>
          <form className="space-y-2 pt-7" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={joinRoomName}
              onChange={(e) => setJoinRoomName(e.target.value)}
            />
            { }
            <div className="w-full text-center">
              <button
                onClick={handleJoinRoom}
                className="btn hover:text-base-content text-primary-content w-full bg-accent"
              >
                Join Room
              </button>
              <span className="py-1">Or</span>
              <button
                onClick={() => {
                  document.getElementById("my_modal_2").showModal();
                }}
                className="btn hover:text-base-content text-primary-content w-full bg-accent"
              >
                Create Room
              </button>
            </div>
          </form>
          <p className="text-md py-2 px-1">
            Join a existing group or make a new one
          </p>
          {/* modal */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_2" className="modal min-h-96">
            <div className="modal-box flex flex-col gap-2 overflow-visible">
              <h3 className="font-bold text-lg text-center">Create room:</h3>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="roomName">Enter Room Name:</label>
                <input
                  id="roomName"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full py-1"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <label htmlFor="roomName">Add Users:</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full py-1 "
                  value={searchUserTerm}
                  onChange={(e) => setsearchUserTerm(e.target.value)}
                />
                {/* Selected user list */}
                <p className="text-accent font-semibold py-2">Selected Users</p>
                <div className="h-32 w-full bg-base-200 rounded-md overflow-y-scroll">
                  {selectedUsers &&
                    selectedUsers.length !== 0 &&
                    selectedUsers.map((user, idx) => (
                      <div
                        key={idx}
                        className="p-2 cursor-pointer"
                        onClick={() =>
                          setSelectedUsers((prev) =>
                            prev.filter((usr) => usr._id !== user._id)
                          )
                        }
                      >
                        {user.username}
                      </div>
                    ))}
                </div>

                {/* User select input */}
                <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  {userFromDB?.filter((user) =>
                    user.username.includes(searchUserTerm)
                  ).length !== 0 && searchUserTerm !== "" ? (
                    <div className=" h-44 -bottom-[-75px] right-[1.41rem] overflow-y-scroll w-60 z-10 bg-base-200 rounded-md absolute ">
                      {userFromDB
                        .filter((user) => user._id !== userId)
                        .filter((user) =>
                          user.username.includes(searchUserTerm)
                        )
                        .map((usr) => (
                          <div
                            key={usr._id}
                            className="p-2 cursor-pointer"
                            onClick={() =>
                              setSelectedUsers((prev) => [...prev, usr])
                            }
                          >
                            {usr.username}
                          </div>
                        ))}
                    </div>
                  ) : null}
                  <button
                    className="btn hover:text-base-content text-primary-content bg-accent w-full"
                    onClick={createRoomClick}
                  >
                    Create room
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        </aside>
      </section>
    </main>
  );
}
