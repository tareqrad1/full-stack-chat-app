import { CheckCheck } from 'lucide-react'
import React from 'react'

const UserList: React.FC = () => {
  return (
    <div className='mt-6 hover:bg-[#F5F5F5] px-4 py-2 cursor-pointer'>
        <div className='flex justify-between space-y-2'>
            <div className='flex gap-2'>
                <img className='size-12 rounded-full' src="../../images/3d-illustration-person-with-sunglasses_23-2149436188.jpg" alt="" />
                <div className='sm:flex flex-col hidden'>
                    <h3 className=' text-black font-normal text-xl'>Jon Doa</h3>
                    <p className='text-[#6E6E6E] text-[12px]'>Typing...</p>
                </div>
            </div>
            <div>
                <small className='text-[#6E6E6E]'>16:25</small>
                <CheckCheck className='size-5 text-[#27AE60]' />
            </div>
        </div>
    </div>
  )
}

export default UserList