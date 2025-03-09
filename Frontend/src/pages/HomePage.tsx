import React from "react"
import UserComponents from "../components/Users"
import ContentMessage from "../components/ContentMessages"

const HomePage: React.FC = (): React.JSX.Element => {
  return (
    <>
      <header className="h-screen bg-white">
        <div className="flex">
            {/* Left Side */}
          <aside className="w-[15%] sm:w-[30%] overflow-y-scroll border-r-[1px] border-[#D9D9D9] border-solid">
              <div className="flex h-screen">
                <div className="w-full">
                  <UserComponents />
                </div>
              </div>
          </aside>
          {/* Right Side */}
          <div className="w-[85%] sm:w-[70%]">
            <ContentMessage />
          </div>
        </div>
      </header>
    </>
  )
}

export default HomePage