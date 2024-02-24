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

// user has came and we have group

/*
   let group = {

   }
*/


let roomId = [
  1, 2, 3, 4
]



const socketRoute = (wss) => {
  wss.on("connection", async (ws, req) => {
    ws.on('event:join', (message) => {
      const data = JSON.parse(message.toString());
      if (!data) throw new Error('Invalid data');
      try {
        if(data.type == 'join'){
          
        }
      } catch (error) {
        
      }
    })
  })
}

export default socketRoute;


/* let users = {
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
} */

