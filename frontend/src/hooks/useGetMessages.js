import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";    
import { set } from "mongoose";

const useGetMessages=()=>{
    const [loading ,setLoading]=useState(false);
    const {messages,setMessages,selectedConversation } = useConversation();
    useEffect(()=>{
        const getMessages = async () => {
            setLoading(true);
            try {
                const res=await fetch(`/api/messages/${selectedConversation._id}`);
                const data=await res.json();
                if(!data)throw new Error(data.error)
                    setMessages(data);
                
            } catch (error) {
                toast.error(error.message);
                
            }finally {
                setLoading(false);
            }
        }
        if(selectedConversation){
            getMessages();
        }
    },[selectedConversation?._id,setMessages]);
    return {loading,messages}
}
export default useGetMessages