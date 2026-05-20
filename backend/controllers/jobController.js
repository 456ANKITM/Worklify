import Client from "../models/Client.js";
import Job from "../models/Job.js";

export const postJob = async (req, res) => {
    try {
        const userId = req.user._id;

        if(req.user.role !== "client") {
            return res.status(403).json({
                success:false, 
                message:"Only Clients Can post the jobs"
            })
        }

        const {
            title, 
            description, 
            keyResponsibilities,
            requirements, 
            niceToHave,
            category, 
            skillsRequired,
            budget, 
            tags,
        } = req.body;

        if(!title || !description || !category || !budget) {
            return res.status(400).json({
                success:false, 
                message:"Title, description, category and budget are"
            })
        }

        const client = await Client.findOne({userId});

        if(!client) {
            return res.status(404).json({
                success:false, 
                message:'Client Profile not found'
            })
        }

        const job = await Job.create({
            clientId: client._id, 
            title, 
            description,
            keyResponsibilities: keyResponsibilities || [],
            requirements: requirements || [],
            niceToHave: niceToHave || [],
            category, 
            skillsRequired: skillsRequired || [],
            budget,
            tags: tags || []
        });

        client.totalJobsPosted += 1;

        await client.save(); 

        return res.status(201).json({
            success:true, 
            message:"Job Posted Successfully",
            job
        })

    } catch (error) {
         return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}