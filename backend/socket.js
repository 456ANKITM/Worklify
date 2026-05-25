import { Server } from "socket.io";


const onlineUsers = new Map();

export const initSocket = (server) => {
    const io = new  Server(server,{
        cors:{
            ORIGI: "*",
            METHOD: ["GET", "POST"]
        }
    });

    
}