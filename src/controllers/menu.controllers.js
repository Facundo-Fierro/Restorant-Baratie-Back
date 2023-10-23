import menu from '../models/menu.model.js'

//Obtener el menu completo
export const getMenu = async(req,res) =>{
    try {
        const dishes = await menu.find()
    res.json(dishes)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
//Crear un plato para el menu
export const createDish = async(req,res) =>{
    try {
        
  
    const {meal,categorie,description,price} = req.body
  const newDish =   new menu ({
        meal,
        categorie,
        description,
        price,
    })
   const savedDish = await newDish.save()
   res.json(savedDish)
 } catch (error) {
        return res.status(500).json({message:error})
    }
}
//Editar un plato del menu
export const updateMenu = async(req,res) =>{
    try {
        const dish = await menu.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!dish) return res.status(404).json({message:'Can not find the specified dish'})
        res.json(dish)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
//Borrar un plato del menu
export const deleteDish = async(req,res) =>{
    try {
        const dish = await menu.findByIdAndDelete(req.params.id)
        if(!dish) return res.status(404).json({message:'Can not find the specified dish'})
        res.json(dish)
    } catch (error) {
        return res.status(500).json({message:error}) 
    }
}