import { expect } from "chai";
import supertest from "supertest";

describe("User Service Signup", () => {
  describe("Test user registration", () => {
    it("Should register new user successfully", async () => {
      const response = await supertest(app)
        .post("/signup")
        .send({
          username: "newUser",
          fullname: "New User",
          password: "password123",
          email: "newuser@example.com",
        })
        .expect(201);

      expect(response.body.message).to.equal("User registered successfully");
    });

    it("Should return error if user already exists", async () => {
      const response = await supertest(app)
        .post("/signup")
        .send({
          username: "existingUser",
          fullname: "Existing User",
          password: "password123",
          email: "existinguser@example.com",
        })
        .expect(400);

      expect(response.body.message).to.equal("User already exists");
    });
  });
});