import { Check, CheckCheck } from "lucide-react";
import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

interface UserType {
  user: {
    _id: string;
    createdAt: Date;
    fullname: string;
    email: string;
    profilePicture: string | null;
  };
}

const UserList: React.FC<UserType> = ({ user }: UserType) => {
  const { setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div
      className="flex items-center justify-between px-4 py-3 mt-2 cursor-pointer rounded-lg hover:bg-gray-100 transition"
      onClick={() => setSelectedUser(user)}
    >
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <img
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-md border border-gray-300"
          src={user?.profilePicture === null ? "https://via.placeholder.com/150" : user.profilePicture}
          alt={user.fullname}
        />
        <div>
          <h3 className="text-black font-semibold text-sm sm:text-base">{user.fullname}</h3>
          <p className={`text-xs sm:text-sm ${onlineUsers.includes(user._id) ? "text-green-600 font-semibold" : "text-gray-500"}`}>
            {onlineUsers.includes(user._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Status & Last Active (Hidden on Mobile) */}
      <div className="hidden sm:flex flex-col items-end space-y-1">
        <small className="text-gray-500">
          {Math.floor(1 + Math.random() * 24)}:{Math.floor(1 + Math.random() * 60)}
        </small>
        {onlineUsers.includes(user._id) ? (
          <CheckCheck className="w-5 h-5 text-green-500" />
        ) : (
          <Check className="w-5 h-5 text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default UserList;
