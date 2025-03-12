import { Camera, Mail, MessageSquare, User } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage: React.FC = (): React.JSX.Element => {
  const Navigate = useNavigate();
  return (
    <header className='bg-white h-screen w-full'>
      <nav className='flex justify-between items-center py-3 px-5 bg-[#fafafa]'>
        <div className=''>
          <MessageSquare className='text-[#108c43a0] size-10' />
        </div>
        <div>
          <button className='btn bg-[#108c43a0] capitalize text-white border-none' onClick={() => Navigate('/')}>go back</button>
        </div>
      </nav>
      {/* start content */}
      <main className='text-black h-[calc(100% - 64px)] flex flex-col justify-center items-center'>
        <div className='w-[500px]'>
          <header className='mb-5'>
            <h1 className='text-3xl font-bold text-center'>PROFILE</h1>
            <p className='text-[#9c9c9c] text-center line-clamp-2 text-sm'>Your profile information</p>
          </header>
          <div className='flex justify-center flex-col items-center'>
            <div className='relative'>
              <img className='size-60 rounded-full' src="../../images/3d-illustration-person-with-sunglasses_23-2149436188.jpg" alt="" />
              <Camera className='absolute bottom-[25px] right-[22px] z-20 text-[#000] cursor-pointer' />
            </div>
            <small className='text-[#acaaaa]'>click the camera icon to update your photo</small>
          </div>
          <div className='space-y-4 mt-5 w-[100%]'>
            <div className='flex justify-center flex-col items-center'>
              <h3 className='flex'><User className='mr-1 ' /> Full Name</h3>
              <input type="text" className='mt-2 px-4 py-[1px] rounded-lg border-none bg-[#7777] outline-0'/>
            </div>
            <div className='flex justify-center flex-col items-center'>
              <h3 className='flex'><Mail className='mr-1' /> Email</h3>
              <input type="text"  className='mt-2 px-4 py-[1px] rounded-lg border-none bg-[#7777] outline-0'/>
            </div>
            <div>
              <button className='bg-[green] border-none w-full cursor-pointer h-full px-4 py-1 text-white text-center rounded-full flex justify-center'>Save Change</button>
            </div>
          </div>
        </div>
      </main>
    </header>
  )
}

export default ProfilePage