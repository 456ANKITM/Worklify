import Notification from "../models/Notification.js";

export const createNotification = async ({
    recipientId, 
    senderId = null, 
    type, 
    title, 
    message
}) => {
    try {
        const notification = await Notification.create({
            recipientId, 
            senderId, 
            type, 
            title, 
            message
        })

        return notification;
    } catch (error) {
        console.error("Notification error:", error.message)
    }
}