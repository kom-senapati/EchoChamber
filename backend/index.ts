import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors"
import userRoute from "./routes/userRoute"
import messageRoute from "./routes/messageRoute"
import chatRoute from "./routes/chatRoute"
import 'dotenv/config';
import { Server } from "socket.io"
import SocketFun from "./socket/socketService";



const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;


app.use('/user', userRoute);
app.use('/message', messageRoute)
app.use('/chat', chatRoute)
app.use('/', (req, res) => {
  res.json('working')
})


if (process.env.db) {
  console.log(process.env.db);
  mongoose.connect(process.env.db, { dbName: "chat" } as ConnectOptions)
  console.log('succesfully connected to gb')
} else {
  console.log('cant connect to db');
}


const server = app.listen(PORT, () => console.log(`connected to ${PORT}`));
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

SocketFun(io);






/*  Trash, dont look here

const httpServer = http.createServer(app);

const socketServiceInstance = new SocketService();
socketServiceInstance.initListeners();

socketServiceInstance.io.attach(httpServer);

httpServer.listen(PORT, () => {
  console.log(`HTTP Server started at PORT:${PORT}`)

}) 

*/


