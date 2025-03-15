import { Loader, Lock, LockKeyhole, Mail, User } from 'lucide-react'
import React, { ChangeEvent, FormEvent, JSX, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast';

interface UserTypes {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Register: React.FC = (): JSX.Element => {
  const [userDetails, setUserDetails] = useState<UserTypes>({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  }
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(userDetails.fullname, userDetails.email, userDetails.password, userDetails.confirmPassword);
    toast.success('Account created successfully');
    navigate('/login');
  };
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
            <form onSubmit={handleSubmit} className='space-y-3 text-start'>
            <div className='space-y-1'>
              <h1 className='text-sm' >Full Name</h1>
              <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                <User className='opacity-60 size-5' />
                <input type="text" placeholder="Full Name" className='bg-white px-2' name='fullname' value={userDetails.fullname} onChange={handleChange}/>
              </label>
            </div>
            <div className='space-y-1'>
              <h1 className='text-sm'>Email</h1>
              <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                <Mail className='opacity-60 size-5' />
                <input type="email" required placeholder="Email" className='bg-white px-2' name='email' value={userDetails.email} onChange={handleChange}/>
              </label>
            </div>
            <div className='space-y-1'>
              <h1 className='text-sm'>Password</h1>
              <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                <Lock className='opacity-60 size-5' />
                <input type="password" placeholder="**********" className='bg-white px-2' name='password' value={userDetails.password} onChange={handleChange}/>
              </label>
            </div>
            <div className='space-y-1'>
              <h1 className='text-sm'>Confirm Password</h1>
              <label className="input validator bg-white rounded-md border-2 border-[#F1F1F1] border-solid">
                <LockKeyhole className='opacity-60 size-5' />
                <input type="password" placeholder="**********" className='bg-white px-2' name='confirmPassword' value={userDetails.confirmPassword} onChange={handleChange}/>
              </label>
            </div>
            <p className='text-red-500 text-sm transition-colors'>{error}</p>
            {isLoading ? <button className='bg-[#27AE60] w-full py-2 capitalize text-sm rounded-md flex justify-center text-white cursor-pointer'><Loader className='size-5 animate-spin'/></button> : <button className='bg-[#27AE60] w-full py-2 capitalize text-sm rounded-md text-white cursor-pointer hover:bg-[#1B7F3F] transition-colors'>create account</button>}
            </form>
            <p className='text-sm text-[#979797] mt-3'>Already have an account? {" "} <Link to={'/login'} className='text-black'>Sign In</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register