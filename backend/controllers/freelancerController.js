import Freelancer from "../models/Freelancer.js";
import { cloudinary } from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

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
        
        const userId = req.user._id;
        const {links} = req.body;

        if (!Array.isArray(links) || links.length === 0) {
            return res.status(400).json({
                success:false, 
                message:"Links Must be an non-empty array"
            })
        }

        for (const link of links) {
            if(!link.title || !link.url) {
                return res.status(400).json({
                    success:false, 
                    message:"Each link must contain title and url"
                })
            }
        }

       const freelancer = await Freelancer.findOne({userId});
       if(!freelancer) {
        return res.status(404).json({
            success:false,
            message:'Freelancer not found'
        })
       }

       freelancer.links.push(...links)
       await freelancer.save();

       return res.status(200).json({
        success:true,
        message:"Links added successfully",
        links:freelancer.links
       })
    } catch (error) {
            return res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
}

export const removeLinks = async (req, res) => {
    try {
        const userId = req.user._id;
        const {linkId} = req.body;

        if(!linkId) {
            return res.status(400).json({
                success:false,
                message:"Link ID is required"
            })
        }

        const freelancer = await Freelancer.findOne({userId})
        if(!freelancer){
            return res.status(404).json({
                success:false, 
                message:"Freelancer Not found"
            })
        }

        freelancer.links = freelancer.links.filter(
            (link) => link._id.toString() !== linkId
        )

        await freelancer.save();

        return res.status(200).json({
            success:true, 
            message:"Link removed successfully",
            links:freelancer.links
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}

export const addExperience = async (req, res) => {
    try {
        const userId = req.user._id;
        const {experience} = req.body;

        if(!Array.isArray(experience) || experience.length === 0) {
            return res.status(400).json({
                success:false, 
                message:"Experience must be a non-empty array"
            })
        }
        const freelancer = await Freelancer.findOne({userId})

        if(!freelancer) {
            return res.status(404).json({
                success:false, 
                message:"Freelancer not found"
            })
        }

        freelancer.experience.push(...experience);

        await freelancer.save();

        return res.status(200).json({
            success:true, 
            message:"Experience added successfully",
            experience: freelancer.experience
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Server Error",
            error: error.message
        })
    }
}

export const removeExperience = async (req, res) => {
    try {
        const userId = req.user._id;
        const {experienceId} = req.body;

        if(!experienceId) {
            return res.status(400).json({
                success:false, 
                message:"Experience ID is required"
            })
        }

        const freelancer = await Freelancer.findOne({userId})
        if(!freelancer) {
            return res.status(404).json({
                success:false, 
                message:"Freelancer Not found"
            })
        }

        // Only keep those experience whose id does not match with experienceId
        freelancer.experience = freelancer.experience.filter(
            (exp) => exp._id.toString() !== experienceId
        )

        await freelancer.save();

        return res.status(200).json({
            success:true,
            message:'Experience removed successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Server Error", 
            error:error.message
        })
    }
}

export const addEducation = async (req, res) => {
    try {
        const userId = req.user._id;
        const {education} = req.body; 

        if(!Array.isArray(education) || education.length === 0) {
            return res.status(400).json({
                success:false, 
                message:"Education must be a non-empty array"
            })
        }
        const freelancer = await Freelancer.findOne({userId});

        if(!freelancer) {
            return res.status(404).json({
                success:false, 
                message:"Freelancer not found"
            })
        }

        freelancer.education.push(...education)
        await freelancer.save()

        return res.status(200).json({
            success:true, 
            message:"Education added successfully",
            education: freelancer.education
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Server Error",
            error: error.message
        })
    }
}

export const removeEducation = async (req, res) => {
    try {
        const userId = req.user._id; 
        const {educationId} = req.body; 
        if(!educationId) {
            return res.status(400).json({
                success:false, 
                message:"Education ID is required"
            })
        }
        const freelancer = await Freelancer.findOne({userId})
        if(!freelancer) {
            return res.status(404).json({
                success:false, 
                message:"Freelancer Not found",
            })
        }

        freelancer.education = freelancer.education.filter(
            (edu) => edu._id.toString() !== educationId
        )

        await freelancer.save();

        return res.status(200).json({
            success:true,
            message:"Education removed successfully",
            education: freelancer.education
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}

export const addCertification = async (req, res) => {
    try {
        const userId = req.user._id;
        const {certifications} = req.body;

        if(!Array.isArray(certifications) || certifications.length === 0) {
            return res.status(400).json({
                success:false, 
                message:"Certifications must be a non-empty array"
            })
        }

        for (const cert of certifications) {
           if(!cert.name || !cert.issuingOrganization || !cert.issueDate) {
            return res.status(400).json({
                success:false, 
                message:"Each Certification must have name, issuingOrganization and issueDate"
            })
           }
        }

        const freelancer = await Freelancer.findOne({userId})

        if(!freelancer) {
            return res.status(404).json({
                success:false, 
                message:"Freelancer not found"
            })
        }

        freelancer.certifications.push(...certifications)

        await freelancer.save();

        return res.status(200).json({
            success:false, 
            message:"Certifications added successfully",
            certifications: freelancer.certifications
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}

export const removeCertification = async (req, res) => {
    try {
        const userId = req.user._id;
        const {certificationId} = req.body;

        if(!certificationId) {
            return res.status(400).json({
                success:false, 
                message:"certificationId is required"
            })
        }

        const freelancer = await Freelancer.findOne({userId})

        if(!freelancer) {
            return res.status(404).json({
                success:false, 
                message:"Freelancer not found"
            })
        }

        freelancer.certifications = freelancer.certifications.filter(
            (cert) => cert._id.toString() !==  certificationId
        )

        await freelancer.save();

        return res.status(200).json({
            success:false, 
            message:"Certifications removed successfully"
        })
        
    } catch (error) {
          return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}


export const toogleAvailability = async (req, res) => {
    try {
        const userId = req.user._id;
        const {availability} = req.body;

        if(!["available", "not-available"].includes(availability)) {
            return res.status(400).json({
                success:false, 
                message:"Invalid availability value"
            })
        }

        const freelancer = await Freelancer.findOneAndUpdate(
            {userId}, 
            {availability},
            {new:true}
        )

        if(!freelancer) {
            return res.status(404).json({
                success:false, 
                message:"freelancer not found"
            })
        }

        return res.status(200).json({
            success:true, 
            message:'Availability Updated successfully',
            availability: freelancer.availability
        })
        
    } catch (error) {
          return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}

export const updateProfileImage = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!req.files || !req.files.profileImage) {
            return res.status(400).json({
                success:false, 
                message:"Profile image is required"
            })
        }
        const file = req.files.profileImage[0];

        const freelancer = await Freelancer.findOne({userId});

        if(!freelancer) {
            return res.status(404).json({
                success:false, 
                message:"Freelancer Not found"
            })
        }

        const uploadedImage = await uploadToCloudinary(file.buffer, "freelancer-profile-images");

        freelancer.profileImage = uploadedImage.secure_url;

        await freelancer.save();

        return res.status(200).json({
            success:true, 
            message:"Profile image updated successfully",
            profileImage:freelancer.profileImage
        })
        
    } catch (error) {
         return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}

export const removeProfileImage = async (req, res) => {
    try {
        const userId = req.user._id;
        const freelancer = await Freelancer.findOne({userId});
        if(!freelancer) {
            return res.status(404).json({
                success:false,
                message:'Freelancer not found'
            })
        }
        if(!freelancer.profileImage) {
            return res.status(400).json({
                success:false, 
                message:"No Profile Image found"
            })
        }

        freelancer.profileImage = "";

        await freelancer.save();

        return res.status(200).json({
            success:true, 
            message:"Profile Image is removed successfullly"
        })
        
    } catch (error) {
         return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}

export const getAllReviews = async (req, res) => {
    try {
        const {freelancerId } = req.params; 

        const freelancer = await Freelancer.findById(freelancerId)
        .populate("reviews.reviewerId", "clientName profileImage")

        if(!freelancer) {
            return res.status(404).json({
                success:false, 
                message:"freelancer not found"
            })
        }

        return res.status(200).json({
            success:true,
            totalReviews:freelancer.reviews.length, 
            data:freelancer.reviews
        })
    } catch (error) {
          return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}