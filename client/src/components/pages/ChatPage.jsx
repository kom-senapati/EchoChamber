import Rooms from "../Rooms";
import Chat from "../Chat";

function ChatPage() {
  return (
    <div className="flex justify-center gap-2 items-center h-screen px-10 py-5">
      <Rooms />
      <Chat />
    </div>
  );
}
export default ChatPage;
