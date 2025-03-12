import { Mail, Lock, Eye, EyeClosed, Loader } from 'lucide-react'
import React, { ChangeEvent, FormEvent, JSX, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

interface UserTypes {
  email: string;
  password: string;
}
const LoginPage: React.FC = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<UserTypes>({
    email: '',
    password: '',
  });
  const {signin, isLoading, error} = useAuthStore();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signin(userDetails.email, userDetails.password);
    toast.success('Logged in successfully');
    <Navigate to={'/'}/>
  };
  return (
    <>
      <div className='flex bg-white text-black w-full h-[100vh]'>
        {/* left side */}
        <div className='hidden md:block md:w-1/2'>
          <img src='../../images/Screenshot 2025-03-09 134310.png' className='h-[100vh] w-full object-cover'/>
        </div>
        {/* right side */}
        <div className='flex justify-center items-center w-full md:w-1/2'>
          <div className='flex flex-col'>
            <div className='space-y-3 mb-6'>
              <h1 className='text-[#00072D] text-4xl capitalize font-bold'>welcome back</h1>
              <p className='text-[#00072D]'>Join us now and start chat with your friends.</p>
            </div>
            <form onSubmit={handleSubmit} className='space-y-3 text-start'>
            <div className='space-y-1'>
              <h1 className='text-sm'>Email</h1>
              <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                <Mail className='opacity-60 size-5' />
                <input type="email" name='email' value={userDetails.email} onChange={handleChange} required placeholder="Email" className='bg-white px-2'/>
              </label>
            </div>
            {showPassword ? (
              <div className='space-y-1'>
                <h1 className='text-sm'>Password</h1>
                <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                  <Lock className='opacity-60 size-5' />
                  <input type="password" name='password' value={userDetails.password} onChange={handleChange} placeholder="**********" className='bg-white px-2'/>
                  <EyeClosed className='text-sm opacity-60 cursor-pointer' onClick={() => setShowPassword(false)} />
                </label>
              </div>
            ) : (
              <div className='space-y-1'>
                <h1 className='text-sm'>Password</h1>
                <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                  <Lock className='opacity-60 size-5' />
                  <input type="input" name='password' value={userDetails.password} onChange={handleChange} placeholder="**********" className='bg-white px-2'/>
                  <Eye className='text-sm opacity-60 cursor-pointer' onClick={() => setShowPassword(true)}/>
                </label>
              </div>
            )}
            <p className='text-red-500 text-sm transition-colors'>{error}</p>
            {isLoading ? <button className='bg-[#27AE60] w-full py-2 capitalize text-sm rounded-md flex justify-center text-white cursor-pointer'><Loader className='size-5 animate-spin'/></button> : <button className='bg-[#27AE60] w-full py-2 capitalize text-sm rounded-md text-white cursor-pointer hover:bg-[#1B7F3F] transition-colors'>login</button>}
            </form>
            <p className='text-sm text-[#979797] mt-3'>Don't have account? {" "} <Link to={'/signup'} className='text-black'>Sign Up</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage