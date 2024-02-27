import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../utils";
import { userInfo } from "../App";
import axios from "axios";
import { parseCookies } from "nookies";

export default function Dummychat() {
  const apiEndpoint = "http://localhost:3000/";
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const [searchUserTerm, setsearchUserTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [userFromDB, setuserFromDB] = useState([]);
  const { currentUser, setCurrentUser } = useContext(userInfo);
  const navigate = useNavigate();

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
      const resp = await axios.get(`/chat/getchats`, {
        params: {
          currentUserId: userId,
        },
      });
      if (resp.status == 200) {
        /* console.log(resp.data); */
        setChats(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [chats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomName === "" || roomName.length < 4) {
      setError("Room name should atleast contain 4 character!!");
      return;
    }
    document.getElementById("my_modal_2").showModal();
    setError("");
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
      <section className="h-[80%] w-full max-w-7xl bg-base-content shadow-md rounded-md flex">
        <aside className="flex-[1] h-full w-full  px-8 py-12 flex flex-col">
          <h3 className="p-2 text-xl font-bold mb-4 text-primary">
            Available Rooms :
          </h3>
          <div className="space-y-1 h-full text-base-content menu bg-base-200 rounded-box">
            {chats?.map((chat) => (
              <div
                key={chat._id}
                className=""
                onClick={() => navigate(`group/${chat._id}`)}
              >
                <p className="font-semibold text-lg hover:bg-neutral hover:text-neutral-content p-2 rounded-md cursor-pointer">
                  {chat.chatName}
                </p>
              </div>
            ))}
          </div>
        </aside>
        <aside className="flex-[3] h-full w-full  flex flex-col items-start p-4">
          <p className=" absolute text-xs text-error">{error}</p>

          <form className="space-y-2 pt-10" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            {}
            <button className="btn w-full ">Create Room</button>
          </form>
          <p className="text-md py-2 px-1">
            Join a existing group or make a new one
          </p>
          {/* modal */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_2" className="modal ">
            <div className="modal-box flex flex-col gap-2 overflow-visible">
              <h3 className="font-bold text-lg">
                Add room members: {roomName}
              </h3>
              <div className="relative py-1 flex  w-full gap-2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-60 dropdown dropdown-bottom"
                  value={searchUserTerm}
                  onChange={(e) => setsearchUserTerm(e.target.value)}
                />
                {/* Selected user list */}
                <div className="flex flex-col max-h-32 bg-white rounded-md overflow-y-scroll w-full">
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
                    <div className=" h-32 -bottom-20 overflow-scroll w-60 z-10 bg-white rounded-md absolute ">
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
                </div>
              </div>
              <button className="btn" onClick={createRoomClick}>
                Create room
              </button>
            </div>
          </dialog>
        </aside>
      </section>
    </main>
  );
}
