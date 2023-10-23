import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from "../controllers/orders.controllers.js"

const router = Router()

router.get('/order',authRequired,getOrders)
router.get('/order/:id',authRequired,getOrder)
router.post('/order',authRequired,createOrder)
router.put('/order:id',authRequired,updateOrder)
router.delete('/order',authRequired,deleteOrder)



export default router