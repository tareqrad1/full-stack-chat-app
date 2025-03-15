import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SideBarSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Users: React.FC = (): React.JSX.Element => {
  const { getUsers, users, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [showUsers, setShowUsers] = useState(false); // Toggle user list on mobile

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <header className="relative h-screen overflow-y-auto w-full bg-white shadow-md">
      <div className="px-4 py-3">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1
            className="font-bold text-green-600 text-2xl sm:text-3xl py-2 cursor-pointer"
            onClick={() => setSelectedUser(null)}
          >
            Messages
          </h1>
          {selectedUser && (
            <div onClick={() => navigate("/profile")} className="cursor-pointer">
              <img
                src={user?.profilePicture}
                alt={user?.fullname}
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="hidden sm:block">
          <label className="flex items-center bg-gray-200 px-4 py-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-500">
            <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search..."
              className="ml-2 w-full text-black bg-transparent outline-none placeholder-gray-500"
            />
          </label>
        </div>

        {/* Toggle Button (Only on Mobile) */}
        <button
          onClick={() => setShowUsers(!showUsers)}
          className="sm:hidden w-full mt-3 py-2 bg-green-600 text-white font-semibold rounded-lg"
        >
          {showUsers ? "Hide Users" : "Show Users"}
        </button>

        {/* User List (Hidden on mobile until button is clicked) */}
        <div className={`mt-4 ${showUsers ? "block" : "hidden"} sm:block`}>
          {isUsersLoading ? <SidebarSkeleton /> : users.map((ele) => <UserList user={ele} key={ele._id} />)}
        </div>
      </div>
    </header>
  );
};

export default Users;
