import RegisterPage from "./components/pages/RegisterPage";
import ChatPage from "./components/pages/ChatPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from "./components/Register";
import Login from "./components/Login";
import DummyChat from './components/Dummychat'
import Chat from "./components/Chat";
import { createContext, useState } from "react";


export const userInfo = createContext(null)

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <userInfo.Provider value={{
      currentUser,
      setCurrentUser
    }}>
      <Router>
        <Routes >
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<DummyChat />} />
          <Route path="/home/group/:groupId" element={< Chat />} />
        </Routes>
      </Router>
    </userInfo.Provider>
  );
}
export default App;
