import express, { Request, Response } from "express";
import { User } from "../db";

const route = express.Router();



route.post('/register', async (req: Request, res: Response) => {

  const { username, email, password } = req.body;
  try {
    if (username === "" || email === "" || password === "") {
      res.status(400).json({ errormessage: 'fields are empty' })
    }
    const isUsernameExists = await User.findOne({ username })
    const isEmailExists = await User.findOne({ email })
    if (isEmailExists || isUsernameExists) {
      res.status(400).json({ errormessage: 'email or username already exists' })
    }
    const saveUser = new User(req.body);
    const isSaved = await saveUser.save();
    if (isSaved) res.json({ message: 'User created successfully' , data: isSaved});
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({ errormessage: error.message })
  }
})



route.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email == "" || password == "") {
    res.status(400).json({ errormessage: 'fields are empty' })
  }

  const isEmailExists = await User.findOne({ email })

  if (!isEmailExists) {
    res.status(400).json({ errormessage: 'email not exists' })
  }
  try {
    if (password === isEmailExists?.password)
      res.status(200).json({ message: 'logged in succesfully',data: isEmailExists })
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ errormessage: error.message })
  }
})


route.get('/search', async (req: Request, res: Response) => {
  try {
    const userList = await User.find({ username: { $regex: '.*' + req.query.search + '.*' } })
    if (!userList) res.status(401).json({ message: ' user with specific not foound' })
    res.status(200).json({ userList })
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ errormessage: error.message })
  }
})

route.get('/getUsers', async (req: Request, res: Response) => {
  try {
    const userList = await User.find()
    if (!userList) res.status(401).json({ message: ' user with specific not foound' })
    res.status(200).json({ userList })
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ errormessage: error.message })
  }
})
route.get('/getUsersById', async (req: Request, res: Response) => {
  try {
    const user = await User.find({_id: req.query.userId})
    if (!user) res.status(401).json({ message: ' user with specific not foound' })
    res.status(200).json(user)
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ errormessage: error.message })
  }
})


export default route