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

export const experienceSchema = new mongoose.Schema(
    {
        company:String,
        role:String,
        startDate: Date,
        endDate: Date,
        description:String,
        currentlyWorking:{
            type:Boolean,
            default: false
        }

    },
    {timestamps:true}
);

const educationSchema = new mongoose.Schema({
    institution:String,
    degree: String,
    fieldOfStudy:String,
    startYear: Number,
    endYear: Number,
    currentlyStudying:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
);

const certificationSchema = new mongoose.Schema({
    name:String,
    issuingOrganization:String,
    issueDate: Date,
    credentialId:String,
},{timestamps:true})


const linkSchema = new mongoose.Schema({
    title:String,
    url:String
})

const freelancerSchema = new mongoose.Schema ({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    freelancerName:String,
    professionalTitle:String,
    profileImage:String,
    category:[String],
    skills:[String],
    bio:String,
    availability:{
        type:String,
        enum:["available", "not-available"],
        default:"available"
    },
    averageRating:{
        type:Number,
        default:0
    },
    address:String,
    isVerified:{
        type:Boolean,
        default:false
    },
    reviews: [reviewSchema],
    experience: [experienceSchema],
    education: [educationSchema],
    certifications: [certificationSchema],
    links: [linkSchema],
},{timeStamps:true})

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

export default Freelancer;