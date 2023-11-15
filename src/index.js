import app from './app.js'
import {connectDB } from './db.js'

connectDB()
app.listen('https://restorant-baratie-back-noy9.vercel.app')
console.log('server listening')