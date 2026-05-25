import mongoose from "mongoose";

const messageSchema = new mongoose.Schema ({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth", 
        required:true, 
    },
    text:{
        type:String, 
        trim:true
    }, 
    media:{
        url: String, 
        type:{
            type: String,
        }
    },
    status:{
        type:String, 
        enum:["sent", "delivered", "seen"]
    },
    seenBy:[
        {
            type:mongoose.Schema.Types.ObjectId
        }
    ]
},{timestamps:true})

const Message = mongoose.model("message", messageSchema); 

export default Message;