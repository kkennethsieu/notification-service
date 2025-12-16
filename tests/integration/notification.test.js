import request from "supertest";
import app from "../../src/app.js";
import db from "../../src/db/db.js";

// Helper function to create a review in DB
function createTestNotification() {
  const info = db
    .prepare(
      `
      INSERT INTO notifications (senderId, receiverId, entityId, type, message)
      VALUES (?, ?, ?, ?, ?)
    `
    )
    .run(1, 1, 1, "review_liked", "Jack liked your review");

  // Get the inserted row
  const notification = db
    .prepare("SELECT * FROM notifications WHERE notificationId = ?")
    .get(info.lastInsertRowid);

  return notification;
}

beforeEach(() => {
  // Reset table before each test
  db.prepare("DELETE FROM notifications").run();
});

afterAll(() => {
  db.close(); // close DB after all tests
});

//getting a notificatios by userId
describe("GET /notifications/:userId", () => {
  it("should return all notifications by userId", async () => {
    const notification = createTestNotification();
    const userId = notification.receiverId;

    const res = await request(app).get(`/notify/notifications/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body.data[0]).toHaveProperty("receiverId", 1);
    expect(res.body.data[0]).toHaveProperty("type", "review_liked");
  });

  it("should return 404 if review does not exist", async () => {
    const res = await request(app).get("/notify/notifications/9999");
    expect(res.status).toBe(404);
  });
});
