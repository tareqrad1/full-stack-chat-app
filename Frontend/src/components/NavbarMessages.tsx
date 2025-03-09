import { Info, X } from 'lucide-react'
import React from 'react'

const NavbarMessages = ({ show, setShow }: { show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>> }) => {  
  return (
    <div className=' flex justify-between items-center py-3 px-4 bg-[#FFFFFF]'>
      <div className='flex gap-2 cursor-pointer' onClick={() => setShow(true)}>
        <img src="../../images/3d-illustration-person-with-sunglasses_23-2149436188.jpg" alt="" className='size-12 rounded-full' />
        <div>
          <h1 className='text-black'>Jon Doa</h1>
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