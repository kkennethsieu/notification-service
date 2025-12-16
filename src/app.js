import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();

// Configure CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Notification microservice is running");
});

app.use("/notify", notificationRoutes);

export default app;
