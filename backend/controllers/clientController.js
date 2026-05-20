import Client from "../models/Client.js";
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