import express from "express";
import { WebSocketServer } from "ws";
import http from "http"
import socketRoute from "./socket/socketRoute.js"

const app = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server })

socketRoute(wss);



server.listen(3002, () => {
  console.log('connected hogya he dekho port 3002');
})