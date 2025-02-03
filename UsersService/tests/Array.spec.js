import request from 'supertest';
import { app as apiGatewayApp } from '../../GatewayService/src/index.js'; 
import { expect } from "chai";

describe('Integration tests for API Gateway and Auth Service', () => {
  it('should sign up a new user through API Gateway and Auth Service', async () => {
    const newUser = {
      fullname: "Test User",
      username: "testuser",
      password: "password123",
      email: "testuser@example.com",
    };

    const signupResponse = await request(apiGatewayApp)
      .post('/signup')
      .send(newUser)
      .expect(400); 

    expect(signupResponse.body.message).to.be.eql("User already exists");
  });

  it('should log in a user and receive a token through API Gateway and Auth Service', async () => {
    const credentials = {
      username: 'testuser',
      password: 'password123',
    };

    const loginResponse = await request(apiGatewayApp)
      .post('/login')
      .send(credentials)
      .expect(200);

    expect(loginResponse.body.message).to.be.eql("Login successful");
  });

  it('should reject invalid login attempt through API Gateway and Auth Service', async () => {
    const invalidCredentials = {
      username: 'wronguser',
      password: 'wrongpassword',
    };

    const loginResponse = await request(apiGatewayApp)
      .post('/login')
      .send(invalidCredentials)
      .expect(401);  

    expect(loginResponse.body.message).to.be.eql("Invalid username or password");
  });
});
