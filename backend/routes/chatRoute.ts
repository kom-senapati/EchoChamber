import express, { Request, Response } from "express"
import { User, Chat } from "../db"


// -password means we dont need password when object is being populated
const route = express.Router();

// [⁜]------<[ Create a single Room/ChatRoom  ]>------[⁜] //

route.post('/creategroup', async (req: Request, res: Response) => {

  const { groupusers, groupname, user } = req.body

  if (!groupusers || !groupname) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }
  /*   console.log(req.body);
   */
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

// [⁜]------<[ fetch Rooms/chatRoom of a specific user ]>------[⁜] //

route.get('/getchats', async (req: Request, res: Response) => {
  try {
/*     console.log(req.params.currentUserId)
 */    if (!req.query.currentUserId) res.status(400).json({ errormessage: 'invalid Id' })
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

// [⁜]------<[ fetch all available Rooms/ChatRooms ]>------[⁜] //

route.get('/getAllChats', async (req: Request, res: Response) => {
  try {
   
      let chambers = await Chat.find().populate("users", "-password")
      res.status(200).json(chambers);
    
  } catch (error: any) {
    console.log(error.message);
    res.status(401).json({ errormessage: error.message })
  }
})


// [⁜]------<[ fetch a single Room/ChatRoom by is ID ]>------[⁜] //

route.post('/getChatById', async (req: Request, res: Response) => {
  try {
    if (!req.body.chamberId) res.status(400).json({ errormessage: 'invalid Id' })
    else {
      let chamber = await Chat.find({ _id: req.body.chamberId }).populate("users", "-password")
      res.status(200).json(chamber);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(401).json({ errormessage: error.message })
  }
})


// [⁜]------<[ update a single Room/ChatRoom by is ID ]>------[⁜] //

route.post('/updateChatById', async (req: Request, res: Response) => {
  try {
    if (!req.body.chamberId || !req.body.userId) res.status(400).json({ errormessage: 'invalid params' })
    else {
      let updatedChamber = await Chat.findOneAndUpdate({ _id: req.body.chamberId }, { $push: { users: req.body.userId } }, { new: true }).populate("users", "-password")
      res.status(200).json(updatedChamber);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(401).json({ errormessage: error.message })
  }
})



export default route;