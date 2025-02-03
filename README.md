# **Welcome to SCE-PLAYGROUND 🎮**

![My Image](public/PNG.webp)
SCE-PLAYGROUND is a  project built with React for the frontend and Node.js for the backend. It provides an interactive and dynamic environment where users can explore various features, sign up, and log in. 

Both the frontend and backend are essential parts of this application and need to be running simultaneously for everything to work properly.
How to Run the Project Locally
To run SCE-PLAYGROUND locally, you need to set up both the frontend and backend repositories.

Please follow the steps below to get everything running.
## **1. Clone the Repositories**
First, clone both the frontend and backend repositories to your local machine.

Clone the frontend repository
**Frontend Repository Link:**

git clone https://github.com/chenasu/SCE-Playground-Front.git

Clone the backend repository
**Backend Repository Link**

git clone https://github.com/chenasu/SCE-Playground-Backend.git
## **2. Set Up the Frontend**
**npm install**

**npm run dev**
This will start the frontend on http://localhost:5173 by default.
## **3. Set Up the Backend**
### API 

Open the terminal and run the following commands:

**cd GatewayService** 

**npm install**

**cd src**

**node index.js**

### SERVICE 
Open the terminal and run the following commands:

**cd UsersService**

**npm install**

**cd src**

**node index.js**

### **Important Notes:**

Both frontend and backend need to be running for the project to function correctly.
The frontend makes API calls to the backend to fetch data and interact with the server.
Ensure both servers are running concurrently for proper functionality.

### **Technologies Used:**

#### **Frontend**: React, JavaScript, JSX

#### **Backend**: Node.js, Express, JWT Authentication

#### **Database**: Postgres
