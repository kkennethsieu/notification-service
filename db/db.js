import Database from "better-sqlite3";

const db = new Database("./db/notification.db");

try {
  // Likes/Dislikes table
  db.prepare(
    `
          CREATE TABLE IF NOT EXISTS notifications (
            notificationId INTEGER PRIMARY KEY AUTOINCREMENT,
            senderId INTEGER NOT NULL,
            receiverId INTEGER NOT NULL,
            entityId BOOLEAN NOT NULL,
            type TEXT NOT NULL, -- 'review','comment','follow'
            isRead BOOLEAN DEFAULT 0,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `
  ).run();
} catch (error) {
  console.log("Error creating notifications table:", error);
}

export default db;
