import React, { useCallback, useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import formatMessageTime from '../utils/Date';
import MessageSkeleton from './MessagesSkeleton';
const ChatMessage: React.FC = () => {
  const { messages, selectedUser, getMessages, isMessagesLoading, subscribeToMessage, unsubscribeFromMessages } = useChatStore();
  const { user } = useAuthStore();
  const messageEnd = useRef<HTMLDivElement | null>(null);

  // Fetch messages when selectedUser changes
  const fetchMessages = useCallback(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);
  
  useEffect(() => {
    // Fetch messages and subscribe to socket events
    fetchMessages();
    subscribeToMessage();
  
    // Clean up when component is unmounted or user changes
    return () => {
      unsubscribeFromMessages();
    };
  }, [fetchMessages, subscribeToMessage, unsubscribeFromMessages]);
  
  useEffect(() => {
    if(messageEnd.current && messages) {
      messageEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[messages])

  if(isMessagesLoading) return <MessageSkeleton />
  return (
    <div className="flex-1 flex flex-col overflow-auto">
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.map((message, idx) => (
        <div
          key={idx}
          className={`chat ${message?.senderId === user?._id ? "chat-end" : "chat-start"}`}
          ref={messageEnd}
        >
          {/* chat avatar */}
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border">
              <img
                src={
                  message?.senderId === user?._id
                    ? user?.profilePicture || "/avatar.png"
                    : selectedUser?.profilePicture || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
          </div>
          {/* times */}
          <div className="chat-header mb-1 text-[#000]">
            <time className="text-xs opacity-50 ml-1">
              {formatMessageTime(message?.createdAt)}
            </time>
          </div>
          {/* messages */}
          <div className="chat-bubble bg-[#27AE60] flex flex-col">
            {message?.image && (
              <img
                src={message?.image}
                alt="Attachment"
                className="sm:max-w-[100px] h-50 w-50 rounded-md mb-2"
              />
            )}
            {message?.text && <p>{message?.text}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default ChatMessage
