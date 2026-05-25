import Notification from "../models/Notification.js";

export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({
            recipientId: userId,
        })
        .sort({createdAt:-1})
        .limit(50);

        return res.status(200).json({
            success:true, 
            message:"Notification fetched successfully",
            total:notifications.length,
            data:notifications
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}

export const getUnreadNotificationsCount = async (req, res) => {
    try {
        const userId = req.user._id;
        const unreadCount = await Notification.countDocuments({
            recipientId: userId,
            isRead: false
        });

        return res.status(200).json({
            success:true, 
            unreadCount
        })
    } catch (error) {
         return res.status(500).json({
            success:false, 
            message:"Server Error",
            error:error.message
        })
    }
}