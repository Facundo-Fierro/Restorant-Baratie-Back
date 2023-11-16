import app from './app.js'
import {connectDB } from './db.js'

connectDB()
app.listen(process.env.PORT,()=>{console.log(`Server listening on port ${process.env.PORT}`)})
console.log('server listening')