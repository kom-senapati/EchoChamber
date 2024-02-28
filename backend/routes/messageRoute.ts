import express, { Request, Response } from "express"
import { Message, User, Chat } from "../db"


const route = express.Router();


route.get('/getmessage', async (req: Request, res: Response) => {
  try {
/*     console.log(req.query.chatId)
 */    const messages = await Message.find({ chat: req.query.chatId }).populate("sender").populate("chat");
    res.status(200).json(messages)
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({ errormessage: error.message })
  }
})


route.post('/sendmessage', async (req: Request, res: Response) => {
  const { userId, content, chatId } = req.body;

  if (!content || !chatId || !userId) {
    console.log("Invalid data passed into request");
    return res.status(400).json({ errormessage: 'Invalid data passed into request' });
  }

  let newMessage = {
    sender: userId,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender");
    message = await message.populate("chat");
    message = await User.populate(message, { path: "chat.users" });
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
})

export default route;