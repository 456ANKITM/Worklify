import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    url:String, 
    type:{
        type:String, 
        enum:["image", "video", "file", "link"]
    },
    name:String
},{timestamps:true});

const submissionSchema = new mongoose.Schema({
    agreementId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Agreement',
        required:true
    },
    freelancerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Auth', 
        required:true, 
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth", 
        required:true
    },
    message:{
        type:String, 
        trim:true
    }, 
    files:[fileSchema], 
    status:{
        type:String, 
        enum:["submitted", "approved", "rejected"],
        default:"submitted"
    },
    submittedAt:{
        type: Date, 
        default: Date.now,
    }
},{timestamps:true})

const Submission = mongoose.model("submission", submissionSchema);

export default Submission;