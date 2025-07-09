import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  try {
    const {message} = req.body;
    const {id:receiverId} = req.params;
    const senderId=req.user._id; // Assuming you have middleware to set req.userId

    let conversation = await Conversation.findOne({
        participants : { $all: [senderId, receiverId] },

    })

    if(!conversation) {
        // Create a new conversation if it doesn't exist
        conversation = await Conversation.create({
            participants: [senderId, receiverId], 
        });
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        message,

        // senderId:senderId,
        // receiverId:receiverId,     //both are same
        // message:message,
    })

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }

    //SOCKET IO FUNCTIONALITY WILL GO HERE
    // await conversation.save();
    // await newMessage.save();   
    

    //this will save both conversation and message in parallel
    await Promise.all([conversation.save(), newMessage.save()]);


    res.status(201).json(newMessage);
    
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    
  }
};

export const getMessages = async (req, res) => {
    try {

        const {id:userToChatId} = req.params;
        const senderId= req.user._id; // Assuming you have middleware to set req.userId

        const conversation = await Conversation.findOne({ 
            participants : { $all: [senderId, userToChatId] },
        }).populate("messages"); //NOT REFERENCE BUT ACTUAL MESSAGES 


        if(!conversation) return res.status(200).json([]); // No messages found, return empty array
        const messages=conversation.messages;

        res.status(200).json(messages);
        
    } catch (error) {
        console.error("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}

