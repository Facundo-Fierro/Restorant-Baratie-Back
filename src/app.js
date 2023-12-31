import  express  from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config.js';

import userRoutes from './routes/user.routes.js'
import menuRoutes from './routes/menu.routes.js'
import orderRoutes from './routes/orders.routes.js'

const app = express()
app.use(cors({
    origin:'https://restorantbaratie.netlify.app',
    credentials:true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api',userRoutes)
app.use('/api',menuRoutes)
app.use('/api',orderRoutes)

export default app