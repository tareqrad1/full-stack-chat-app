import { Loader } from 'lucide-react'
import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
        <Loader className="size-10 animate-spin text-[#27AE60]" />
    </div>
  )
}

export default Loading