import db from "../db/db.js";

export const createNotification = (notification) => {
  try {
    const { senderId, receiverId, entityId, type } = notification;
    const stmt = db.prepare(
      `INSERT INTO notifications (senderId, receiverId, entityId,type) VALUES(?,?,?,?)`
    );
    const res = stmt.run(senderId, receiverId, entityId, type);
    return res.lastInsertRowid;
  } catch (error) {
    console.error("error creating notification:", error);
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
