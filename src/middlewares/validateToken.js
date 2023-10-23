import jwt from 'jsonwebtoken'
export const authRequired = (req,res,next) =>{
    const {token} = req.cookies
     if (!token) return res.status(401).json({message:"authorization denied"})
     jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
    if(err) return res.status(403).json({message:"invalid token"})
    req.user = user
    next()
})
   
}