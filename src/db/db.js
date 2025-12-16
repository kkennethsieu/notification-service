import Database from "better-sqlite3";

let db;

try {
  if (process.env.NODE_ENV === "test") {
    db = new Database(":memory:"); // in-memory DB for tests
  } else {
    db = new Database("./src/db/notification.db");
  }
  // Likes/Dislikes table
  db.prepare(
    `
          CREATE TABLE IF NOT EXISTS notifications (
            notificationId INTEGER PRIMARY KEY AUTOINCREMENT,
            senderId INTEGER NOT NULL,
            senderAvatarURL TEXT DEFAULT 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            receiverId INTEGER NOT NULL,
            entityId BOOLEAN NOT NULL,
            type TEXT NOT NULL, -- 'review','comment','follow'
            message TEXT NOT NULL,
            isRead BOOLEAN DEFAULT 0,
            createdAt TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
          )
        `
  ).run();
  // db.exec("DROP TABLE IF EXISTS notifications ");
} catch (error) {
  console.log("Error creating notifications table:", error);
}

export default db;
