<h1 align="center">EchoChamber - Real-time Chat Application</h1>

<div align="center" width='900'>
    EchoChamber is a real-time chat application built with React, TypeScript, Node.js, MongoDB, Socket.io, Redis, and DaisyUI. This application allows users to engage in instant messaging, providing a seamless and responsive chat experience.
</div>
&nbsp;
<img alt="image" margin="12" src="https://github.com/kom-senapati/EchoChamber/blob/main/client/public/thumbnail-EchoChaMber.png">


<h1 align="center">Demo Video</h1>

https://github.com/kom-senapati/EchoChamber/assets/81561733/b658a84f-09a6-43a5-b3ec-d16ac8b84101



<h1 align="center">Tech-Stack</h1>

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">&nbsp;&nbsp;<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white">&nbsp;&nbsp;<img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101">&nbsp;&nbsp;<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
</p>

<h1 align="center">Introduction</h1>

<div align="center" width='900'>
Overview: echoChamber is an interactive real-time chat application that brings people together. Whether you’re connecting with friends, colleagues, or fellow enthusiasts, echoChamber provides a seamless platform for lively conversations. Sign up with ease, create your unique profile, and dive into dynamic chat rooms.
</div>

<h3 align="center"> -> Key Features <-</h3>

- **Real-time Communication:** Utilizes Socket.io for real-time bidirectional communication between the server and clients, ensuring instant message delivery.

- **Persistent Storage:** Stores user data and messages in MongoDB, offering a persistent and scalable solution.

- **User Authentication:** Implements user authentication to secure the chat environment, ensuring that only authorized users can access the application.

- **Responsive UI with DaisyUI:** The user interface is built with React and DaisyUI, providing a clean and responsive design for a smooth user experience across devices.

- **Typescript:** Enhances code readability, maintainability, and scalability through the use of TypeScript.

- **Scalability:** Incorporates Redis for handling the application's caching needs, improving overall performance and scalability.


&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;



&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;


&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
<h1 align="center">Running the project locally</h1>

## Getting Started
1. **Fork the repository**

2. **Clone the forked repo to your local :**

    ```bash
    git clone https://github.com/your-username/EchoChamber.git
    cd EchoChamber
    

3. **Install dependencies for client:**

   ```bash
   cd client
   npm install

4. **Install dependencies for backend:**

   ```bash
   cd backend
   npm install
  
3. **Configure Environment Variables for backend:**

     >Create a .env file in the root of the project and configure the following variables:

   ```env
    MONGODB_URI=your_mongodb_connection_string
    REDIS_URI=your_redis_connection_string

 4. **Start the Application for both client and backend:**

    > Client -> development server will start at http://localhost:5173
    ```bash
      npm run dev
    ```
    > Backend ->  server will start at http://localhost:3000
     ```bash
      npm run dev
    ```
<br>

<p align="center">
 Happy chatting with EchoChamber! 🚀
</p>
