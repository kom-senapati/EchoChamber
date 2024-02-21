import React, { useState } from "react";

function Rooms() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-4/12 h-4/5 border border-gray-700 rounded-lg shadow-xl mx-auto my-8 px-3">
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab(1)}
          className={`py-2 px-4 text-gray-400 hover:text-gray-100 focus:outline-none ${
            activeTab === 1 ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Group Chats
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`py-2 px-4 text-gray-400 hover:text-gray-100 focus:outline-none ${
            activeTab === 2 ? "border-b-2 border-blue-500" : ""
          }`}
        >
          DMs
        </button>
      </div>
      <div className="py-4">
        {activeTab === 1 && (
          <div>
            <ul className="mt-2 text-gray-400">
              <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <span className="flex-grow">Group Chat 1</span>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <span className="flex-grow">Group Chat 2</span>
              </li>
              {/* Add more group chats as needed */}
            </ul>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <ul className="mt-2 text-gray-400">
              <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <span className="flex-grow">DM 1</span>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <span className="flex-grow">DM 2</span>
              </li>
              {/* Add more DMs as needed */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;
