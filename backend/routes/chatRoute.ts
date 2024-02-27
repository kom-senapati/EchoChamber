import express, { Request, Response } from "express"
import { User, Chat } from "../db"


// -password means we dont need password when object is being populated
const route = express.Router();


route.get('/getchats', async (req: Request, res: Response) => {
  try {
    console.log(req.params.currentUserId)
    if (!req.query.currentUserId) res.status(400).json({ errormessage: 'invalid Id' })
    else {
      let chats = await Chat.find({ users: { $elemMatch: { $eq: req.query.currentUserId } } }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: -1 })



      /*       const chats = await Chat.aggregate([
              {
                $match: {
                  _id: mongoose.Types.ObjectId(req.query.currentUserId),
                  $or: [
                    { groupAdmin: mongoose.Types.ObjectId(req.query.currentUserId) }, // Check for groupAdmin
                    { users: { $elemMatch: { $eq: req.query.currentUserId } } }
                     // Check if user is in users array
                  ]
                }
              }
            ]); */
/*       console.log(chats);
 */      const chatList = await User.populate(chats, {
        path: "latestMessage.sender"
      })
      res.status(200).json(chatList);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(401).json({ errormessage: error.message })
  }
})

route.get('/getChatById', async (req: Request, res: Response) => {
  try {
    if (!req.query.chamberId) res.status(400).json({ errormessage: 'invalid Id' })
    else {
      let chamber = await Chat.find({ _id: req.query.chamberId }).populate("users", "-password")
      res.status(200).json(chamber);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(401).json({ errormessage: error.message })
  }
})

route.post('/creategroup', async (req: Request, res: Response) => {

  const { groupusers, groupname, user } = req.body

  if (!groupusers || !groupname) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }
  console.log(req.body);

  if (groupusers.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  try {
    const groupChat = await Chat.create({
      chatName: groupname,
      users: groupusers,
      isGroupChat: true,
      groupAdmin: user,
    });
    const fullGroupChat = await Chat.findOne(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);

  } catch (error: any) {
    console.log(error.message);
    res.status(401).json({ errormessage: error.message })
  }
})

export default route;