import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { createDish, deleteDish, getDish, getMenu, updateMenu } from "../controllers/menu.controllers.js"

const router = Router()

router.get('/menu',authRequired,getMenu)
router.get('/dish/:id',authRequired,getDish)
router.post('/dish',authRequired,createDish)
router.delete('/dish/:id',authRequired,deleteDish)
router.put('/dish/:id',authRequired,updateMenu)


export default router