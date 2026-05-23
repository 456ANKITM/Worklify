import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema({
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    },

    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true
    },

    freelancerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Freelancer',
        required:true
    },

    proposalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Proposal',
        required:true
    },
    status:{
        type:String,
        enum:[
            "active",
            "completed",
            "cancelled",
            "disputed"
        ],
        default: 'active'
    },
    paymentStatus:{
        type:String, 
        enum:[
            "pending",
            "escrowed",
            "paid",
            "refunded"
        ],
        default:"pending"
    },
    completionRequest: {
        status:{
            type:String, 
            enum:["none", "requested", "approved", "rejected"],
            default:"none"
        },
        message:String, 
        requestedAt: Date
    }
},{timestamps:true});

const Agreement = mongoose.model("Agreement", agreementSchema);

export default Agreement;