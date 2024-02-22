/*
       Data : {
         "type" : "join",
         "payload" : {
           roomId : 123
         }
       }

       or

       Data : {
         "type" : "message",
         "payload" : {
           roomId : "hello there"
         }
       }

 */

let users = {
  [""]: {
    room: "",
    ws: {}
  }
}

let counter = 0;

const socketRoute = (wss) => {
  wss.on("connection", async (ws, req) => {
    const Id = counter++;
    ws.on("message", (message) => {
      const data = JSON.parse(message.toString());
      if (!data) throw new Error('Invalid data');
      try {
        if (data.type === 'join') {
          users[Id] = {
            room: data.payload.roomId,
            ws
          }
        }
        if (data.type === 'message') {
          const roomId = users[Id].room;
          const message = data.payload.message;

          Object.keys(users).forEach((id) => {
            if (users[Id].room === roomId) {
              users[Id].ws.send(JSON.stringify({
                type: "message",
                payload: {
                  message
                }
              }));
            }
          })
        }
      } catch (error) {
        console.log(`logging error from socket ${error}`);
      }
    })
  })
}

export default socketRoute;