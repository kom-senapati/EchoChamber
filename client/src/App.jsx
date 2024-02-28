import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Hero from "./components/Hero";
import { createContext, useState } from "react";

export const userInfo = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <userInfo.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/*" element={<Hero />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/group/:groupId" element={<Chat />} />
        </Routes>
      </Router>
    </userInfo.Provider>
  );
}
export default App;
