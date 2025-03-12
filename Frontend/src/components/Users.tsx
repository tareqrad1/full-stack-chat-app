import React, { useEffect } from 'react'
import UserList from './UserList'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './SideBarSkeleton';

const Users: React.FC = (): React.JSX.Element => {
  const { getUsers, users, isUsersLoading, setSelectedUser } = useChatStore();
  useEffect(() => {
    getUsers();
  },[getUsers]);
  return (
    <header>
        <div className="px-4">
            <h1 className='font-bold text-[#27AE60] capitalize text-4xl py-4 cursor-pointer' onClick={() => setSelectedUser(null)}>Messages</h1>
            <div>
                <label className="input bg-[#EEEEEE] border-[2px] border-transparent border-solid text-black rounded-lg w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" required placeholder="Search"/>
                </label>
            </div>
            {isUsersLoading ? <SidebarSkeleton />: users.map((ele, idx) => (
              <UserList user={ele} key={idx} />
            ))}
        </div>
    </header>
  )
}

export default Users