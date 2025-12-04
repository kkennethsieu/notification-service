import amqplib from "amqplib";
import { createNotification } from "../models/models.js";

//if this tries to connect before rabbitmq is booted it, it will retry
const connectWithRetry = async () => {
  let retries = 0;
  while (true) {
    try {
      const connection = await amqplib.connect("amqp://localhost:5672");
      console.log("Connected to RabbitMQ");
      return connection;
    } catch (err) {
      retries++;
      console.log(`RabbitMQ not ready, retrying in 2s... (attempt ${retries})`);
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
};

export const consumeNotification = async () => {
  const connection = await connectWithRetry();
  const channel = await connection.createChannel();

  const queue = "notification";

  await channel.assertQueue(queue, { durable: true });

  console.log(`[*] Waiting for messages in ${queue}`);

  channel.consume(
    queue,
    async (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        createNotification(message);

        console.log(message);

        channel.ack(msg);
      }
    },
    { noAck: false }
  );
};
