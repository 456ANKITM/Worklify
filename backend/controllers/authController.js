import Auth from "../models/Auth.js";
import Client from "../models/Client.js";
import Freelancer from "../models/Freelancer.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {email, password, role} = req.body;

        // Check if all 3 fields exists and if not throw an error
        if(!email || !password || !role) {
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            })
        }

        // Check if the user already exists with this phone Number
        const existingUser = await Auth.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"user already exists"
            })
        }

        // Create auth user
        const user = await Auth.create({
            email,
            password,
            role
        })

        // Create a profile based on role

        if(role === "freelancer") {
            await Freelancer.create({
                userId: user._id
            })
        }

         if(role === "client") {
            await Client.create({
                userId: user._id
            })
        }

       // Response 
       res.status(201).json({
        success:true,
        message:'Profile Created Successfully',
        user
       })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Server Error',
            error:error.message
        })
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if all fields are present there to log in 
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Email and Password are required"
            })
        }

        // Find user
        const user = await Auth.findOne({email})

        if(!user) {
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        // Compare password 
        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return res.status(401).json({
                success:false, 
                message:"Password did not matched"
            })
        }

        // Generate token 
        const token = generateToken(user._id);

        // send token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:7*24*60*60*100
        })

        // Response 
        res.status(200).json({
            success:true,
            message:"Login Successful",
            user:{
                _id: user._id,
                email: user.email,
                role: user.role,
                profileCompleted:user.profileCompleted
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server Error",
            error: error.message
        })
    }
};


export const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly:true,
        expires:new Date(0)
    });

    res.status(200).json({
        success:true,
        message:"Logged out Sucessfully"
    })
}

export const getMe = async (req, res) => {
    try{
        const authUser = await Auth.findById(req.user._id).select("-password")
        if(!authUser) {
            return res.status(404).json({
                success:false, 
                message:"User Not Found"
            })
        }
        let profile = null;
        if(authUser.role === "freelancer") {
            profile = await Freelancer.findOne({userId: authUser._id})
        }
        if(authUser.role === "client") {
            profile = await Client.findOne({userId: authUser._id})
        }

        const user = {
            _id: authUser._id, 
            email: authUser.email, 
            role: authUser.role,
            profileCompleted:authUser.profileCompleted,
            profile: profile || null
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:'Server Error',
            error: error.message
        })
    }
}