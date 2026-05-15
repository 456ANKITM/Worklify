import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import freelancerRoutes from "./routes/freelancerRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cookieParser());

await connectDB();

app.listen(PORT, () => {
  console.log("Server running on port 4000");
});

app.get("/", (req, res) => {
  res.send("The DATABASE is connected and BACKEND is Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/freelancer", freelancerRoutes);
