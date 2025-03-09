import React, { useState } from 'react'
import ChatMessage from './ChatMessage'
import NavbarMessages from './NavbarMessages'
import { Paperclip, Send } from 'lucide-react'
import DetailsUser from './DetailsUser'

const ContentMessages: React.FC = (): React.JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className='w-full'>
        <div className=''>
          <nav>
              <NavbarMessages show={show} setShow={setShow} />
          </nav>
          {show ? <DetailsUser /> : (
            <>
            <main>
              {show ? <DetailsUser /> : <ChatMessage />}
          </main>
          <footer className='bg-[#FAFAFA] text-black py-3 px-3'>
              <div className='flex'>
                <div className='w-full flex gap-2 items-center'>
                  <Paperclip className='cursor-pointer text-[#8C8C8C]' />
                  <input type="text" placeholder='Type your message here' className='w-full border-none outline-none bg-[#FAFAFA] rounded-md py-2 px-3' />
                </div>
                <button className='ml-1 text-sm text-[#27AE60] font-bold cursor-pointer'><Send /></button>
              </div>
          </footer>
            </>
          )}
        </div>
    </div>
  )
}

export default ContentMessages