import { Check, CheckCheck } from 'lucide-react'
import React from 'react'
import { useChatStore } from '../store/useChatStore'

interface UserType {
    user: {
        _id: string;
        createdAt: string;
        fullname: string;
        email: string;
        profilePicture: string;
    }
}

const UserList: React.FC<UserType> = ({ user }: UserType) => {
    const { setSelectedUser } = useChatStore();
    return (
        <div className='mt-3 hover:bg-[#F5F5F5] px-4 py-2 cursor-pointer bg-[#f9f9f9be]' onClick={() => setSelectedUser(user)}>
            <div className='flex justify-between space-y-2'>
                <div className='flex gap-2'>
                    <img className='size-12 rounded-full' src={user.profilePicture} alt="" />
                    <div className='sm:flex flex-col hidden'>
                        <h3 className=' text-black font-normal text-xl'>{user.fullname}</h3>
                        <p className='text-[#6E6E6E] text-[12px]'>Offline</p>
                    </div>
                </div>
                <div className='w-full flex-1 flex items-end flex-col gap-1.5'>
                    <small className='text-[#6E6E6E]'>16:25</small>
                    {true ? <CheckCheck className='size-5 text-[#27AE60]' /> : <Check className='size-5 text-[#3333]' />}                
                </div>
            </div>
        </div>
    )
}

export default UserList