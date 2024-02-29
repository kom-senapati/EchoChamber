import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../utils";
import { userInfo } from "../App";
import axios from "axios";
import { parseCookies } from "nookies";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default function Dummychat() {
  const apiEndpoint = "http://localhost:3000/";
  const [currUser, setCurrentUser] = useState(null)

  const [joinRoomName, setJoinRoomName] = useState("");
  const [roomName, setRoomName] = useState("");

  const [error, setError] = useState("");

  const [searchUserTerm, setsearchUserTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // chats and room names
  const [chats, setChats] = useState([]);
  const [allChats, setAllChats] = useState([]);

  const [userFromDB, setuserFromDB] = useState([]);
  const navigate = useNavigate();
  const [grpSkeleton, setGrpSkeleton] = useState(false);

  const cookie = parseCookies();
  const userId = cookie["userId"];
  if (userId === undefined) {
    navigate("/login");
  }

  useEffect(() => {
    fetchUsers();
    getGroups()
    getAllGroups()
    getuserFunc()
  }, [userId ,]);


  const fetchUsers = async () => {
    const resp = await axios.get("/user/getUsers");
    // console.log(resp.data.userList);
    setuserFromDB(resp.data.userList);
  };
  const getuserFunc = async () => {
    const getUser = await axios('/user/getUsersById',
    {
      params:{userId: userId}
    })
    if (getUser) {
      setCurrentUser(getUser.data[0])
    }
  };
  
  const getAllGroups = useCallback(async () => {
    try {
      const resp = await axios.get(`/chat/getAllChats`);
      if (resp.status == 200) {
        setAllChats(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [chats]);

  const getGroups = useCallback(async () => {
    try {
      setGrpSkeleton(true);
      const resp = await axios.get(`/chat/getchats`, {
        params: {
          currentUserId: userId,
        },
      });
      if (resp.status == 200) {
        setChats(resp.data);
        setGrpSkeleton(false);
      }
    } catch (error) {
      setGrpSkeleton(false);
      console.log(error);
    }
  }, [chats]);

  // Join-room Function

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setError('')
    const filtered = allChats.filter((chat) => chat.chatName === joinRoomName);
    if(filtered.length === 0){
      setError('Room not found')
    }else{
      try {
        const getChatByID = await axios.post('/chat/getChatById',{
          chamberId:filtered[0]._id,
      })
      const isUserIn = getChatByID.data[0].users.filter((user) => user._id === userId)
      if(!isUserIn.length >= 1){
        const resp = await axios.post("/chat/updateChatById", {
          chamberId: filtered[0]._id,
          userId,
        });
      setChats((prev) => [...prev, resp.data]);
      }else{
        setError("You're already in this group")
      }
      } catch (error) {
        console.log(error)
      }
    }
  };


  // Create-room function

  const createRoomClick = (e) => {
    e.preventDefault()

    selectedUsers.push(currUser)
    const createRoom = async () => {
      const resp = await axios.post("/chat/creategroup", {
        groupusers: selectedUsers,
        groupname: roomName,
        user: userId,
      });
      if (resp.status === 200) {
        setRoomName('')
        setSelectedUsers([])
        setsearchUserTerm('')
        getGroups()

      }
    };
    createRoom();
  };
console.log(chats.length, chats)
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
          <div className="space-y-2 pt-7">
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
            </div>
          
          <p className="text-md py-2 px-1">
            Join a existing group or make a new one
          </p>
          {/* modal */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_2" className="modal min-h-96">
            <div className="modal-box flex flex-col gap-2 overflow-visible">
          <form className="space-y-2 pt-7" onSubmit={createRoomClick}>

              <h3 className="font-bold text-lg text-center">Create room:</h3>
              <p className="text-xs text-error text-center">{error}</p>
                <label htmlFor="roomName">Enter Room Name:</label>
                <input
                  id="roomName"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full py-1"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              <div className="flex flex-col w-full gap-2 relative">
                <label htmlFor="roomName">Add Users:</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full py-1 "
                  value={searchUserTerm}
                  onChange={(e) => setsearchUserTerm(e.target.value)}
                />
                {/* User select input */}
                
                  {userFromDB?.filter((user) =>
                    user.username.includes(searchUserTerm)
                  ).length !== 0 && searchUserTerm !== "" ? (
                    <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52  absolute right-10 top-16">
                    <div className=" h-44 overflow-y-scroll w-60 z-10 bg-base-200 rounded-md">
                      {userFromDB
                        .filter((user) => user._id !== userId)
                        .filter((user) =>
                          user.username.includes(searchUserTerm)
                        )
                        .map((usr) => (
                          <div
                            key={usr._id}
                            className="p-2 cursor-pointer"
                            onClick={() =>{
                              setError('')
                              selectedUsers.includes(usr) ? 
                              setError('user already selected') :
                              setSelectedUsers((prev) => [...prev, usr])
                            }
                            }
                          >
                            {usr.username}
                          </div>
                        ))}
                    </div>
                        </div>
                  ) : null}
                  
                </div>
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

                <button
                    className="btn hover:text-base-content text-primary-content bg-accent w-full"
                        type="submit"
                  >
                    Create room
                  </button>
                  </form>
              
            </div>
            <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
          </dialog>
        </aside>
      </section>
    </main>
  );
}
