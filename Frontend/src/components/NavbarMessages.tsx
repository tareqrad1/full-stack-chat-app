import { Info, X } from 'lucide-react'
import React from 'react'
import { useChatStore } from '../store/useChatStore'

const NavbarMessages = ({ show, setShow }: { show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>> }) => {  
  const { selectedUser } = useChatStore();

  
  
  return (
    <div className=' flex justify-between items-center py-3 px-4 bg-[#FFFFFF]'>
      <div className='flex gap-2 cursor-pointer' onClick={() => setShow(true)}>
        <img src={selectedUser?.profilePicture} alt={selectedUser?.fullname} className='size-12 rounded-full' />
        <div>
          <h1 className='text-black'>{selectedUser?.fullname}</h1>
          <small className='text-[#6E6E6E]'>offline</small>
        </div>
      </div>
      <div>
          {show ? <X className='cursor-pointer text-[#8C8C8C]' onClick={() => setShow(false)} /> : <Info className='cursor-pointer text-[#8C8C8C]' onClick={() => setShow(true)} />}
      </div>
    </div>
  )
}

export default NavbarMessages