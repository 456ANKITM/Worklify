import mongoose from "mongoose"; 

const proposalSchema = new mongoose.Schema ({
    freelancerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Freelancer',
        required:true, 
    },
    coverLetter:{
        type:String, 
        required:true
    },
    proposedBudget:{
        type:Number, 
        required:true
    }, 
    estimatedTime:String,
    status:{
        type:String,
        enum:["pending", "accepted", "rejected"],
        default:"pending"
    }
},{timestamps:true})

const jobSchema = new mongoose.Schema({
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client", 
        required:true
    },
    title:{
        type:String, 
        required:true, 
        trim:true
    },
    description:{
        type:String, 
        required:true
    }, 
    keyResponsibilities:{
        type:[String],
        default:[]
    }, 
    requirements:{
        type:[String],
        default:[]
    }, 
    niceToHave:{
        type:[String],
        default:[]
    },
    category:{
        type:String, 
        enum:[
            "Software Development",
            "UI/UX Design",
            "Graphic Design",
            "Digital Marketing",
            "Content Writing",
            "Video Editing",
            "Cybersecurity",
            "AI and ML",
            "Data Science",
            "DevOps and Cloud",
            "QA and Testing",
            "Social Media Management"
        ],
        required:true
    }, 
    skillsRequired:{
        type:[String],
        default:[]
    }, 
    budget:{
        type:Number, 
        required:true
    },
    proposals:[proposalSchema],
    selectedFreelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Freelancer",
        default:null
    },
    status:{
        type:String, 
        enum:[
            "open", 
            "in-progress",
            "completed",
            'cancelled'
        ],
        default:"open"
    },
    paymentStatus:{
        type:String, 
        enum:["unpaid", "escrowed", "released"],
        default:"unpaid"
    },
    tags:{
        type:[String],
        default:[]
    },

},{timestamps:true})

const Job = mongoose.model("job", jobSchema);

export default Job;