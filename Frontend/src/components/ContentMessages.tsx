import React, { useState } from 'react'
import ChatMessage from './ChatMessage'
import NavbarMessages from './NavbarMessages'
import DetailsUser from './DetailsUser'
import InputMessage from './InputMessage'

const ContentMessages: React.FC = (): React.JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className='w-full relative h-full'>
        <div className='overflow-scroll'>
          <nav>
              <NavbarMessages show={show} setShow={setShow} />
          </nav>
          {show ? <DetailsUser /> : (
            <>
              <main className='overflow-y-scroll w-full relative h-[560px]'>
                {show ? <DetailsUser /> : <ChatMessage />}
              </main>
            </>
          )}
          <footer className='bg-[#FAFAFA] text-black py-3 px-3 absolute bottom-0 w-full'>
                <InputMessage />
          </footer>
        </div>
    </div>
  )
}

export default ContentMessages