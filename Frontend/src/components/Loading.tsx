import { Loader } from 'lucide-react'
import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
    </div>
  )
}

export default Loading