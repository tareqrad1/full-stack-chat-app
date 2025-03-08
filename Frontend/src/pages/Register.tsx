import { Lock, LockKeyhole, Mail, User } from 'lucide-react'
import React, { JSX } from 'react'
import { Link } from 'react-router-dom'

const Register: React.FC = (): JSX.Element => {
  return (
    <>
      <div className='flex bg-white text-black w-full h-[100vh]'>
        {/* left side */}
        <div className='hidden md:block md:w-1/2'>
          <img src='../../images/SIDEBAR.png' className='h-[100vh] w-full object-cover'/>
        </div>
        {/* right side */}
        <div className='flex justify-center items-center w-full md:w-1/2'>
          <div className='flex flex-col'>
            <div className='space-y-3 mb-6'>
              <h1 className='text-[#00072D] text-4xl capitalize font-bold'>hi, welcome</h1>
              <p className='text-[#00072D]'>Join us now and start chat with your friends.</p>
            </div>
            <form className='space-y-3 text-start'>
            <div className='space-y-1'>
              <h1 className='text-sm' >Full Name</h1>
              <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                <User className='opacity-60 size-5' />
                <input type="text" required placeholder="Full Name" className='bg-white px-2'/>
              </label>
            </div>
            <div className='space-y-1'>
              <h1 className='text-sm'>Email</h1>
              <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                <Mail className='opacity-60 size-5' />
                <input type="email" required placeholder="Email" className='bg-white px-2'/>
              </label>
            </div>
            <div className='space-y-1'>
              <h1 className='text-sm'>Password</h1>
              <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                <Lock className='opacity-60 size-5' />
                <input type="password" required placeholder="**********" className='bg-white px-2'/>
              </label>
            </div>
            <div className='space-y-1'>
              <h1 className='text-sm'>Confirm Password</h1>
              <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                <LockKeyhole className='opacity-60 size-5' />
                <input type="password" required placeholder="**********" className='bg-white px-2'/>
              </label>
            </div>
            <button className='bg-[#3431BE] w-full py-2 capitalize text-sm rounded-md text-white cursor-pointer'>create account</button>
            </form>
            <p className='text-sm text-[#979797] mt-3'>Already have an account? {" "} <Link to={'/login'} className='text-black'>Sign In</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register