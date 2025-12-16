import app from "./app.js";
import { consumeNotification } from "./services/consumer.js";

const PORT = process.env.NOTIFY_PORT || 8030;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT}`);
});

// this starts the consumer to listen for messages
if (process.env.NODE_ENV !== "test") {
  consumeNotification();
}
