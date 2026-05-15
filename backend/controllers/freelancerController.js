import Freelancer from "../models/Freelancer.js";

export const updateBasicProfile = async (req, res) => {
    try {
    const userId = req.user._id;
    const {freelancerName, professionalTitle, address, bio, availability} = req.body;

    //find freelancer profile 
    const freelancer = await Freelancer.findOne({userId});
    if(!freelancer) {
        return res.status(404).json({
            success:false,
            message:"freelancer profile not found"
        })
    }

    // Update only provided fields 
    if(freelancerName !== undefined) freelancer.freelancerName = freelancerName;
    if(professionalTitle !== undefined) freelancer.professionalTitle = professionalTitle;
    if(address !== undefined) freelancer.address = address;
    if(bio !== undefined) freelancer.bio = bio;
    if(availability !== undefined) freelancer.availability = availability;

    await freelancer.save();

    return res.status(200).json({
        success:true,
        message:"Basic Profile Updated Successfully",
        data: freelancer
    })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:error.message
        })
    }
}

export const addSkills = async (req, res) => {
    try {
        const userId = req.user._id;
        const {skills} = req.body;

        if(!Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({
                success:false, 
                message:"skills must be a non-empty array"
            })
        }

        const freelancer = await Freelancer.findOneAndUpdate({userId},{
            $addToSet:{
                skills:{$each: skills}
            }
        },{new:true})

        if(!freelancer) {
            return res.status(404).json({message:"freelancer not found"});
        }
        res.status(201).json({
            success:true,
            message:"Skills added Sucessfully",
            skills:freelancer.skills
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
}

export const removeSkills = async (req, res) => {
    try {
        const userId = req.user._id;
        const {skills} = req.body;

        if(!Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({
                success:false, 
                message:"Skills must be a non-empty array"
            })
        }

        const freelancer = await Freelancer.findOneAndUpdate( {userId},
            {
            $pull:{
                skills:{ $in: skills}
            }
        },{new:true})

        if(!freelancer) {
            return res.status(404).json({message:"freelancer not found"})
        }

        return res.status(201).json({
            success:true,
            message:"Skills removed successfully",
            skills:freelancer.skills
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
}

export const addCategory = async (req, res) => {
    try {
        const userId = req.user._id;
        const {category} = req.body;

        if(!Array.isArray(category) || category.length === 0) {
            return res.status(400).json({
                success:false,
                message:"Category must be a non-empty array"
            })
        }

        const freelancer = await Freelancer.findOneAndUpdate({userId},
            {
                $addToSet:{
                    category:{$each: category}
                }
            },
            {new:true}
        )

        if(!freelancer) {
            return res.status(404).json({
                success:false,
                message:"Freelancer not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Category added Successfully",
            category: freelancer.category
        })
        
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
}
export const removeCategory = async (req, res) => {
    try {
        const userId = req.user._id;
        const {category} = req.body;

        if(!Array.isArray(category) || category.length === 0) {
            return res.status(400).json({
                success:false,
                message:"Category must be a non-empty array"
            })
        }

        const freelancer = await Freelancer.findOneAndUpdate({userId},
            {
                $pull:{
                    category:{$in: category}
                }
            },
            {new:true}
        )

        if(!freelancer) {
            return res.status(404).json({
                success:false,
                message:"Freelancer not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Category removed Successfully",
            category: freelancer.category
        })
        
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
}

export const addLinks = async (req, res) => {
    try {
        
    } catch (error) {
            return res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
}