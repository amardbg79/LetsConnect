import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";
import notificationSound from "../assets/sounds/notification.mp3";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (newMessage.senderId === selectedConversation?._id) {
        newMessage.shouldShake=true;
        const sound=new Audio(notificationSound);
        sound.play();
        setMessages((prev) => [...prev, newMessage]);

      }
    };

    socket?.on("messageReceived", handleNewMessage);

    return () => socket?.off("messageReceived", handleNewMessage);
  }, [socket, selectedConversation, setMessages]);
};

export default useListenMessages;
