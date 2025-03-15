import { useChatStore } from "../store/useChatStore"

const DetailsUser = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="text-black h-[500px] w-full text-center">
      <div className="flex justify-center items-center flex-col h-full">
        <div className="mb-2">
          <img className="size-50 rounded-full" src={selectedUser?.profilePicture || 'https://via.placeholder.com/150'} alt="profile-pic" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-black">{selectedUser?.fullname}</h1>
          <p className="text-sm text-[#a09d9d] mt-1">{selectedUser?.email}</p>
        </div>
      </div>
    </div>
  )
}

export default DetailsUser