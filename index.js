import express from "express";
import notificationRoutes from "./routes/notificationRoutes.js";
import cors from "cors";
import { consumeNotification } from "./services/consumer.js";

const app = express();

// Configure CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8000",
      "http://localhost:4000",
    ],
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

const PORT = 8030;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// this starts the consumer to listen for messages
consumeNotification();
