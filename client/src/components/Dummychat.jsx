import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { users } from "../utils"
import { userInfo } from '../App';
import axios from 'axios';



export default function Dummychat() {

  const apiEndpoint = 'http://localhost:3000/'

  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');
  const [searchUserTerm, setsearchUserTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([])
  const [chats, setChats] = useState([]);

  const { currentUser, setCurrentUser } = useContext(userInfo);
  const navigate = useNavigate()

  useEffect(() => {
    getGroups();

  }, [currentUser])

  const getGroups = useCallback(async () => {
    try {
      const resp = await axios.get(`${apiEndpoint}chat/getchats`, {
        params: {
          currentUserId: currentUser._id
        }
      })
      if (resp.status == 200) {
        /* console.log(resp.data); */
        setChats(resp.data)
      }

    } catch (error) {
      console.log(error);
    }
  }, [chats])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomName === '' || roomName.length < 4) {
      setError('Room name should atleast contain 4 character!!')
      return
    }
    document.getElementById('my_modal_2').showModal()
    setError('')
  }

  return (
    <main className='h-full w-full flex items-center justify-center'>

      <section className='h-[80%] w-full max-w-7xl bg-white shadow-md rounded-md flex'>
        <aside className='flex-[1] h-full w-full  px-8 py-12 flex flex-col border-r'>
          <h3 className='p-2 text-xl font-bold mb-4 text-neutral-700'>ROOMS :</h3>
          <div className='space-y-1 overflow-y-scroll text-neutral-600'>
            {
              chats?.map((chat) => (
                <div key={chat._id} className='' onClick={() => navigate(`group/${chat._id}`)}>
                  <p className='font-semibold text-lg hover:bg-neutral-200 p-2 rounded-md cursor-pointer'>{chat.chatName}</p>
                </div>
              ))
            }
          </div>
        </aside>
        <aside className='flex-[3] h-full w-full  flex flex-col items-start p-4'>
          <p className=' absolute text-xs text-red-600'>{error}</p>

          <form className='space-y-2 pt-10'
            onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs border-neutral-800 bg-white text-neutral-600"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            {
            }
            <button className="btn w-full ">Button</button>
          </form>
          <p className='text-md py-2 px-1'>Join a existing group or make a new one</p>
          {/* model */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_2" className="modal ">
            <div className="modal-box flex flex-col gap-2 overflow-visible">
              <h3 className="font-bold text-lg">Add room members</h3>
              <div className='relative py-1 flex  w-full gap-2'>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-60 border-gray-700  text-neutral-600"
                  value={searchUserTerm}
                  onChange={(e) => setsearchUserTerm(e.target.value)}
                />
                {/* Selected user list */}
                <div className='flex flex-col max-h-32 bg-white rounded-md overflow-y-scroll w-full'>
                  {


                    selectedUsers && selectedUsers.length !== 0 && (
                      selectedUsers.map((user) => (
                        <div className='p-2 cursor-pointer' onClick={() => setSelectedUsers((prev) => (prev.filter((usr) => usr.id !== user.id)))}>
                          {user.name}
                        </div>
                      ))
                    )
                  }
                </div>

                {/* User select input */}
                {
                  users.filter((user) => user.name.includes(searchUserTerm)).length !== 0 && searchUserTerm !== '' ?
                    (
                      <div className=' h-32 -bottom-12 overflow-scroll w-60 z-10 bg-white rounded-md absolute '>
                        {
                          users.filter((user) => user.name.includes(searchUserTerm)).map((usr) => (
                            <div key={usr.id} className='p-2 cursor-pointer' onClick={() => setSelectedUsers((prev) => ([...prev, usr]))}>
                              {usr.name}
                            </div>

                          ))
                        }
                      </div>
                    ) : null
                }



              </div>

            </div>
          </dialog>
        </aside>
      </section>
    </main>
  )
}
