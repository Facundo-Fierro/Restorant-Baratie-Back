import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { createDish, deleteDish, getMenu, updateMenu } from "../controllers/menu.controllers.js"

const router = Router()

router.get('/menu',authRequired,getMenu)
router.post('/menu',authRequired,createDish)
router.delete('/menu/:id',authRequired,deleteDish)
router.put('/menu/:id',authRequired,updateMenu)


export default router