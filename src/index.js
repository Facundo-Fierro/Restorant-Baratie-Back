import app from './app.js'
import {connectDB } from './db.js'

connectDB()
app.listen('https://restorant-baratie2.onrender.com')
console.log('server listening')