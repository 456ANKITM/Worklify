import Client from "../models/Client.js";
import Freelancer from "../models/Freelancer.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const updateClientBasicProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const {clientName, description, industry, address} = req.body;
        const client = await Client.findOne({userId});
        if(!client) {
            return res.status(404).json({
                success:false, 
                message:"Client profile not found"
            })
        }

        if(clientName !== undefined) client.clientName = clientName;
        if(description !== undefined) client.description = description;
        if(industry !== undefined) client.industry = industry;
        if(address !== undefined) client.address = address;

        await client.save();

        return res.status(200).json({
            success:true, 
            message:'Client Profile Updated successfully'
        })
        
    } catch (error) {
         return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}

export const updateClientProfileImage = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!req.files || !req.files.profileImage) {
            return res.status(400).json({
                success:false, 
                message:"Profile image is required"
            })
        }
        const file = req.files.profileImage[0];

        const client = await Client.findOne({userId});

        if(!client) {
            return res.status(404).json({
                success:false, 
                message:"Client Not found"
            })
        }

        const uploadedImage = await uploadToCloudinary(file.buffer, "client-profile-images");

        client.profileImage = uploadedImage.secure_url;

        await client.save();

        return res.status(200).json({
            success:true, 
            message:"Profile image updated successfully",
            profileImage:client.profileImage
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
        const client = await Client.findOne({userId});
        if(!client) {
            return res.status(404).json({
                success:false,
                message:'client not found'
            })
        }
        if(!client.profileImage) {
            return res.status(400).json({
                success:false, 
                message:"No Profile Image found"
            })
        }

        client.profileImage = "";

        await client.save();

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

export const rateFreelancer = async (req, res) => {
    try {
        const userId = req.user._id;
        if(req.user.role !== "client") {
            return res.status(403).json({
                success:false, 
                message:"Only Clients can rate freelancer"
            })
        }
        const {freelancerId} = req.params;
        const {rating} = req.body;

        if(!rating) {
            return res.status(400).json({
                success:false, 
                message:"Rating is required"
            })
        }

        if(rating < 1 || rating > 5) {
            return res.status(400).json({
                success:false, 
                message:"Rating must be between 1 and 5"
            })
        }

        const client = await Client.findOne({userId});

        if(!client) {
            return res.status(404).json({
                success:false, 
                message:'Client not found'
            })
        }

        const freelancer = await Freelancer.findById(freelancerId);

        if(!freelancer) {
            return res.status(404).json({
                success:false, 
                message:"Freelancer not found"
            })
        }

        // Prevent dublicate rating from same client 
        const allreadyRated = freelancer.ratings.find(
            (r) => r.raterId.toString === userId.toString()
        )

        if(allreadyRated) {
            return res.status(400).json({
                success:false, 
                message:"You have already rated this freelancer"
            })
        }
        

        freelancer.ratings.push({
            raterId: userId, 
            rating
        })

        // calculate the average rating  
        const total = freelancer.ratings.reduce(
            (sum, r) => sum + r.rating, 0
        )

        freelancer.averageRating = total / freelancer.ratings.length

        await freelancer.save(); 

        return res.status(200).json({ 
            success:true, 
            message:"Rating submitted successfully", 
            averageRating: freelancer.averageRating
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}