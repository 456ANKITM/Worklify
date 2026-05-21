import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    freelancerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Freelancer",
        required:true
    },
    coverLetter:{
        type:String,
        required:true, 
    },
    proposedBudget:{
        type:Number,
    },
    estimatedTime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending", "accepted", "rejected"],
        default:"pending"
    }
},{timestamps:true});

const Proposal = mongoose.model("proposal", proposalSchema);

export default Proposal;