import React, { useEffect } from 'react'
import io from "socket.io-client"

const ENDPOINT = "http://localhost:3000";
var socket;

export default function Dummychat() {

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log('useEffct');
  }, [])

  return (
    <div>


    </div>
  )
}
