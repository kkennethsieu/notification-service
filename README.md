## Notifications Overview

Whenever an action occurs in your service such as liking a review or submitting a friend-request you can send a notification using RabbitMQ. The publishNotification function publishes a message to the notification queue, containing the sender, receiver, entity, and event type. The Notification microservice consumes these messages and processes them (storing in database). You can then fetch all the notifications.

## Running the Service

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Or run normally
node index.js
```

The service will start on `http://localhost:3005` by default.

## Setup Requirements

- RabbitMQ must be running locally or in a container before using the function
- Example using docker:
  docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management

## Available Notification Types

- review_liked
- review_disliked
- friend_request

## Publish Notifications via RabbitMQ

The publishNotification function allows your service to send events to the Notification microservice through RabbitMQ. Place this function in a /services or /utils folder so it can be reused anywhere in your codebase.

The `publishNotification` function is located in `/src/services/publishNotification.js`.

## Example Usage

import publishNotification from "../services/publishNotification.js";

// When a user likes a review

```javascript
await publishNotification({
  senderId: userId, // User who performed the action
  receiverId: authorId, // User who should receive the notification
  entityId: reviewId, // The object the action happened on
  type: "review_liked", // Event type
});
```

## How the publishNotification function works:

1. Connects to the RabbitMQ server (amqp://localhost:5672).

2. Creates a channel and ensures the notification queue exists.

3. Sends a JSON message to the queue with the following structure:

```json
{
  "senderId": "string",
  "receiverId": "string",
  "entityId": "string",
  "type": "string"
}
```

4. Closes the channel and connection safely, even if an error occurs.

Notes:

Make sure to fetch the relevant user data (e.g., author of a review) if you need to determine the receiverId.

The Notification service will consume messages from this queue and handle them appropriately (e.g., storing in DB, sending real-time alerts).

## API Endpoints

### 1. Get all notifications for a user

**Endpoint**: `POST /notify/notifications/:reviewId`

**Description**: Gets the total likes and dislikes for a certain review

**Example Request**:

```javascript
const response = await fetch(
  `http://localhost:3005/notify/notifications/${userId}`
);

const data = await response.json();
console.log(data);
```
