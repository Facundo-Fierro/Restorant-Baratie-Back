import Order from '../models/order.model.js'

//Obtener Todos los pedidos
export const getOrders = async(req,res) =>{
    try {
        const orders = await Order.find()
        if(orders.length<= 0) return res.status(400).json({message:'there are not any orders avaliable'})
        res.json(orders)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//Obtener un pedido especifico
export const getOrder = async(req,res) =>{
    try {
        const order = await Order.findById(req.params.id)
        if(!order) return res.status(404).json({message:'Can not find the specified order'})
        res.json(order)
    } catch (error) {
        return res.status(500).json({message:error}) 
    }
}

//Crear un pedido
export const createOrder = async(req,res) =>{
    try {
        const {dish,details} = (req.body)
        const newOrder = new Order({
        User:req.user.id,
        dish,
        details,
        })
        const savedOrder = await newOrder.save()
   res.json(savedOrder)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
//Editar un pedido
export const updateOrder = async(req,res) =>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!order) return res.status(404).json({message:'Can not find the specified order'})
        res.json(order)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//Eliminar un pedido
export const deleteOrder = async(req,res) =>{
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order) return res.status(404).json({message:'Can not find the specified order'})
        res.json(order)
    } catch (error) {
        return res.status(500).json({message:error}) 
    }
}
