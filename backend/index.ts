import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import 'dotenv/config';
import cors from "cors"
import userRoute from "./routes/userRoute"
import messageRoute from "./routes/messageRoute"
import chatRoute from "./routes/chatRoute"
import { Server } from "socket.io"

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use('/user', userRoute);
app.use('/message', messageRoute)
app.use('/chat', chatRoute)

if (process.env.db) {
  mongoose.connect(process.env.db, { dbName: "chat" } as ConnectOptions)
} else {
  console.log('cant connect to db');
}

const server = app.listen(PORT, () => console.log(`connected to ${PORT}`));
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});


io.on('connection', (socket) => {
  console.log('socket io connected');

})


