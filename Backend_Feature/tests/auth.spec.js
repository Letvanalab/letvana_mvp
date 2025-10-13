const request = require("supertest");
const app = require("../server.test");

describe("auth-register", () => {
  it("should create new user", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      password: "SecurePass123!",
      phone_number: "+2348012345678",
      user_type: "landlord",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toHaveProperty("user_type");

    const user = await prisma.users.findUnique({
      where: { email: " john@example.com" },
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(user.first_name).toBe("john");
    expect(res.body.user.email).toBe("john@example.com");

    expect(user.is_active).toBe(true);
  });
});
