import { CircleX, Paperclip, Send } from 'lucide-react'
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';

interface MessageTypes {
    text: string;
    image: string;
}
const InputMessage: React.FC = (): React.JSX.Element => {
  const [messageDetails, setMessageDetails] = useState<MessageTypes>({
    text: '',
    image: '',
  });
  const { selectedUser, addMessages } = useChatStore();
	const imgRef = useRef<HTMLInputElement | null>(null);

function handleChange(e: ChangeEvent<HTMLInputElement>) {
  setMessageDetails((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value
    }
  });
}
function handleClick() {
  if (!messageDetails.text.trim() && !messageDetails.image) return; // Prevent empty messages
  addMessages(selectedUser?._id, messageDetails.text, messageDetails.image);
  setMessageDetails({ text: '', image: '' });
}
const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      // setImg(reader.result as string);
      setMessageDetails({text: '', image: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
};

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()} className='flex'>
        <div className='w-full flex gap-2 items-center'>
            <Paperclip className='cursor-pointer text-[#8C8C8C]'
							onClick={() => imgRef.current!.click()} />
            <input type='file' accept='image/*' hidden ref={imgRef} onChange={handleImgChange} />
            <input type="text" name='text' value={messageDetails.text} placeholder='Type your message here' className='w-full border-none outline-none bg-[#FAFAFA] rounded-md py-2 px-3' onChange={handleChange} />
        </div>
        {/* show the image before sending */}
        {messageDetails.image && (
					<div className='relative w-72 mx-auto'>
						<CircleX
							className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
							onClick={() => {
								setMessageDetails({ text: '', image: '' });
								imgRef.current!.value = '';
							}}
						/>
						<img src={messageDetails.image} className='h-30 w-full mx-auto object-contain rounded' />
					</div>
				)}
        <button onClick={handleClick} type='submit' className='ml-1 text-sm text-[#27AE60] font-bold cursor-pointer'><Send className={!messageDetails.text.trim() && !messageDetails.image ? "text-[#8c8c8c] cursor-default" : 'text-[#27AE60]' } /></button>
    </form>
  )
}

export default InputMessage;