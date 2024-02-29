# EchoChamber - Real-time Chat Application

EchoChamber is a real-time chat application built with React, TypeScript, Node.js, MongoDB, Socket.io, Redis, and DaisyUI. This application allows users to engage in instant messaging, providing a seamless and responsive chat experience.

<img width="946" alt="image" src="https://github.com/kom-senapati/EchoChamber/assets/81561733/97aa661e-5c42-4770-9421-b31d6e351024">



## Features

- **Real-time Communication:** Utilizes Socket.io for real-time bidirectional communication between the server and clients, ensuring instant message delivery.

- **Persistent Storage:** Stores user data and messages in MongoDB, offering a persistent and scalable solution.

- **User Authentication:** Implements user authentication to secure the chat environment, ensuring that only authorized users can access the application.

- **Responsive UI with DaisyUI:** The user interface is built with React and DaisyUI, providing a clean and responsive design for a smooth user experience across devices.

- **Typescript:** Enhances code readability, maintainability, and scalability through the use of TypeScript.

- **Scalability:** Incorporates Redis for handling the application's caching needs, improving overall performance and scalability.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm or yarn
- MongoDB
- Redis

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/EchoChamber.git
    cd EchoChamber

  2. **Install dependencies:**

      ```bash
      npm install
  
  3. **Configure Environment Variables:**

      Create a .env file in the root of the project and configure the following variables:

      ```env
       MONGODB_URI=your_mongodb_connection_string
       REDIS_URI=your_redis_connection_string

  4. **Start the Application:**

       ```bash
        npm start
        or
        yarn start
  
  The application should now be running at http://localhost:3000.


<br>

Happy chatting with EchoChamber! 🚀
