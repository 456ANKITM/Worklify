import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        reviewerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Auth",
            required:true,
        },
        comment:{
            type:String,
            trim:true
        }
    },
    {timestamps:true}
)

const clientSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true,
        unique:true
    },
    clientName:String,
    profileImage:String,
    description:String,
    industry:String,
    address:String,
    totalJobsPosted:{
        type:Number,
        default:0
    },
    totalSpent:{
        type:Number,
        default:0,
    },
    averageRating:{
       type:Number,
       default:0
    },
    totalReviews:{
        type:Number,
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    reviews: [reviewSchema]
},{timestamps:true});

const Client = mongoose.model("Client", clientSchema);

export default Client;

