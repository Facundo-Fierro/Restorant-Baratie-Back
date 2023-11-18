import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, login, logout, register, updateUser, verifyToken } from "../controllers/user.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.get('/verify',verifyToken)

router.get('/users',authRequired,getUsers)
router.get('/user/:id',authRequired,getUser)
router.post('/user',createUser)
router.delete('/user/:id',authRequired,deleteUser)
router.put('/user/:id',authRequired,updateUser)

export default router