import { MessageSquare, Settings } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DemoPage: React.FC = () => {
    const Navigate = useNavigate();
  return (
    <div>
        <nav className='flex justify-between items-center bg-[#e7e7e763] px-3 py-2'>
            <div>
                <img src="../../images/3d-illustration-person-with-sunglasses_23-2149436188.jpg" alt="" className='size-12 rounded-full' title='my photo' />
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