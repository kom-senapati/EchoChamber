import RegisterPage from "./components/pages/RegisterPage";
import ChatPage from "./components/pages/ChatPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from "./components/Register";
import Login from "./components/Login";
import DummyChat from './components/Dummychat'
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select" element={<DummyChat />} />

        <Route path="/group/:groupId" element={< Chat/>} />
      </Routes>
    </Router>
  );
}
export default App;
