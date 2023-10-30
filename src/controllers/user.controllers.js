import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createToken } from "../libs/jwt.js";

//Registar un usuario
export const register = async (req, res) => {
  const {username, name, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["el email ya esta en uso"]);
    const passwordEncripted = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      name,
      email,
      password: passwordEncripted,
    });
    const userSaved = await newUser.save();
    const token = await createToken({ id: userSaved._id });
    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username:userSaved.username,
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
      username: userFound.username,
      email: userFound.email,
      state: userFound.state,
      role: userFound.role,
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


   //Verificar Token
   export const verifyToken = async (req,res)=>{
    try {
        const{token} = req.cookies
        if(!token)return res.status(401).json({message:"unauthorized"});
     
        jwt.verify(token,process.env.JWT_KEY,async(err,user)=>{
         if(err)return res.status(401).json({message:"unauthorized"})
        const userFound = await User.findById(user.id)
        if(!userFound)return res.status(401).json({message:"unauthorized"})
        })
     return res.json({
         id:userFound._id,
         username:userFound.username,
         email:userFound.email
     })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
  
}

//Obtener Todos los Usuarios
export const getUsers = async(req,res) =>{
  try {
      const Users = await User.find()
      if(Users.length<= 0) return res.status(400).json({message:'there are not any Users avaliable'})
      res.json(Users)
  } catch (error) {
      return res.status(500).json({message:error})
  }
}

//Obtener un Usuario especifico
export const getUser = async(req,res) =>{
  try {
      const user = await User.findById(req.params.id)
      if(!user) return res.status(404).json({message:'Can not find the specified User'})
      res.json(user)
  } catch (error) {
      return res.status(500).json({message:error}) 
  }
}

//Crear un Usuario
export const createUser = async(req,res) =>{
  const {username,name,email,password,role} = (req.body)
  try {
     
      const userFound = await User.findOne({ email });
      if (userFound) return res.status(400).json(["el email ya esta en uso"]);
      const passwordEncripted = await bcrypt.hash(password, 10)
      const newUser = new User({
      username,
      email,
      password:passwordEncripted,
      name,
      role
      })
      const userSaved = await newUser.save();
     
  
      res.json({
        id: userSaved._id,
        username:userSaved.username,
        name: userSaved.name,
        email: userSaved.email,
        role: userSaved.role,
      });
  } catch (error) {
      return res.status(500).json({message:error})
  }
}
//Editar un Usuario
export const updateUser = async(req,res) =>{
  try {
      const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
      if(!user) return res.status(404).json({message:'Can not find the specified User'})
      res.json(user)
  } catch (error) {
      return res.status(500).json({message:error})
  }
}

//Eliminar un Usuario
export const deleteUser = async(req,res) =>{
  try {
      const user = await User.findByIdAndDelete(req.params.id)
      if(!user) return res.status(404).json({message:'Can not find the specified User'})
      res.json(user)
  } catch (error) {
      return res.status(500).json({message:error}) 
  }
}
