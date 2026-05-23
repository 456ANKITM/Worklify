import mongoose from "mongoose"; 


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

const Job = mongoose.model("Job", jobSchema);

export default Job;