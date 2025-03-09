import React from 'react'
import UserList from './UserList'

const Users: React.FC = (): React.JSX.Element => {
  return (
    <header>
        <div className="px-4">
            <h1 className='font-bold text-black capitalize text-4xl py-4'>Messages</h1>
            <div>
                <label className="input bg-[#EEEEEE] border-[2px] border-transparent border-solid text-black rounded-lg w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" required placeholder="Search"/>
                </label>
            </div>
            <UserList />
        </div>
    </header>
  )
}

export default Users