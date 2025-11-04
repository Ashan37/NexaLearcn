import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import bodyParser from "body-parser";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
