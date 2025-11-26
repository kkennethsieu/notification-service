import amqplib from "amqplib";
import { createNotification } from "../models/models.js";

export const consumeNotification = async () => {
  const connection = await amqplib.connect("amqp://localhost:5672");
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
