import { MessageSquare, Settings } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';

const DemoPage: React.FC = () => {
    const Navigate = useNavigate();
    const { user } = useAuthStore();
  return (
    <div>
        <nav className='flex justify-between items-center bg-[#e7e7e763] px-3 py-2'>
            <div>
                <img src={user?.profilePicture} alt={user?.fullname} className='size-12 rounded-full cursor-pointer' title='My Profile' onClick={() => Navigate('/profile')} />
            </div>
            <div>
                <Settings className='text-[#8C8C8C] cursor-pointer' onClick={() => Navigate('/profile')} />
            </div>
        </nav>
        <div className='h-screen flex flex-col items-center justify-center space-y-4'>
            <div className='animate-bounce'>
                <MessageSquare className='text-[#108c43a0] size-10' />
            </div>
            <div className='text-center px-2'>
                <h1 className='text-[#108c43a0] text-xl capitalize font-bold'>welcome to Chatty</h1>
                <p className='text-[#00000053]'>Select your conversation from the sidebar to start chatting</p>
            </div>
        </div>
    </div>
  )
}

export default DemoPage