import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipientId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    senderId: {
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Auth'
    },
    type:{
        type:String, 
        enum:[
            "proposal_submitted",
            "proposal_accepted",
            "proposal_rejected",
            "freelancer_hired",
            "completion_requested",
            "completion_approved",
            "completion_rejected",
            "payment_received",
            "payment_released",
            "new_message",
            "ratings_received",
            "review_received",
            "job_cancelled",
            "system"
        ],
        required:true
    },
    title:{
        type:String, 
        required:true, 
        trim:true
    }, 
    message:{
        type:String, 
        required:true, 
        trim:true
    },
    isRead:{
        type:Boolean, 
        default: false
    }
},{timestamps:true})

const Notification = mongoose.model("Notification", notificationSchema)

export default Notification;