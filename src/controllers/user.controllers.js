import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createToken } from "../libs/jwt.js";

//Registar un usuario
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["el email ya esta en uso"]);
    const passwordEncripted = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: passwordEncripted,
    });
    const userSaved = await newUser.save();
    const token = await createToken({ id: userSaved._id });
    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      email: userSaved.email,
      role: userSaved.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Logearse
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "user not found" });
    const correctPassword = await bcrypt.compare(password, userFound.password);

    if (!correctPassword)
      return res.status(400).json({ message: "incorrect password" });

    const token = await createToken({ id: userFound._id });
    res.cookie("token", token);
    userFound.state = "online";
    await userFound.save();

    res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      state: userFound.state,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//Desloguearse
export const logout = async (req,res) =>{
    try {
        const userFound = await User.findById(req.user.id)
        if (!userFound) return res.status(400).json({ message: "user not found" })
        userFound.state = "offline";
        await userFound.save();

        res.cookie('token',"",{
            expires:new Date(0)
        })
        return res.status(200).json({message:'logged out'})
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 
}

//Obtener perfil logeado
export const getProfile = async (req,res) =>{
    try {
       
   const userFound = await User.findById(req.user.id)
       if(!userFound)return res.status(400).json({message:'user not found'})
       return res.json({
   id:userFound._id,
   name:userFound.name,
   email:userFound.email})
       res.send('profile')
   } catch (error) {
       return res.status(500).json({message:error.message})
   }
   }