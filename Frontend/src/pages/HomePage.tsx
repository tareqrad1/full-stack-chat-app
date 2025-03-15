import React, { useState } from "react";
import UserComponents from "../components/Users";
import ContentMessage from "../components/ContentMessages";
import DemoPage from "../components/DemoPage";
import { useChatStore } from "../store/useChatStore";
import { Menu } from "lucide-react";

const HomePage: React.FC = (): React.JSX.Element => {
  const { selectedUser } = useChatStore();
  const [showSidebar, setShowSidebar] = useState(false); // Toggle sidebar for mobile

  return (
    <header className="h-screen bg-white overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar Toggle Button (Mobile) */}
        <button
          className="absolute top-30 right-4 sm:hidden z-20 p-2 bg-green-600 text-white rounded-full"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu size={24} />
        </button>

        {/* Sidebar - User List */}
        <aside
          className={`absolute sm:static top-0 left-0 w-[70%] sm:w-[30%] h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-10 
          ${showSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
        >
          <UserComponents />
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full sm:w-[70%] bg-gray-50">
          {selectedUser ? <ContentMessage /> : <DemoPage />}
        </main>
      </div>
    </header>
  );
};

export default HomePage;
