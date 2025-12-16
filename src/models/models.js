import db from "../db/db.js";
import { getGame, getReview, getUser } from "../api/index.js";

export const createNotification = async (notification) => {
  let message;
  const { senderId, receiverId, entityId, type } = notification;

  const sender = await getUser(senderId);
  switch (type) {
    case "review_liked":
      const review = await getReview(entityId);
      const game = await getGame(review.gameId);
      message = `${sender.username} liked your review on "${game.title}"`;
      break;
    case "review_disliked":
      const reviewDislike = await getReview(entityId);
      const gameDislike = await getGame(reviewDislike.gameId);
      message = `${sender.username} disliked your review on "${gameDislike.title}"`;
      break;
    case "friend_request":
      message = `${sender.username} send you a friend request`;
      break;
    default:
      message = "You have a new notification";
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO notifications (senderId,senderAvatarURL, receiverId, entityId, type, message) VALUES(?,?,?,?,?,?)"
    );
    const res = stmt.run(
      senderId,
      sender.avatarURL,
      receiverId,
      entityId,
      type,
      message
    );

    return res.lastInsertRowid;
  } catch (error) {
    console.error("Error creating notification", error);
  }
};

export const getNotificationsForUser = (userId) => {
  try {
    const stmt = db.prepare(
      `SELECT * FROM notifications WHERE receiverId = ? ORDER BY createdAT DESC`
    );
    const res = stmt.all(userId);
    return res;
  } catch (error) {
    console.error("Error getting notifications for user:", error);
  }
};

export const readNotification = (notificationId) => {
  const stmt = db.prepare(
    `UPDATE notifications SET isRead = 1 WHERE notificationId = ?`
  );
  const res = stmt.run(notificationId);
  return res.changes;
};
export const deleteNotification = (notificationId) => {
  const stmt = db.prepare(`DELETE FROM notifications WHERE notificationId = ?`);
  const res = stmt.run(notificationId);
  return res.changes;
};
