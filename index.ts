import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

//DB
import { connectDB } from './config/connectDb'

//ROUTES
import productRouter from './routes/route'
import authRouter from './routes/authRoute'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4040

//MIDDLEWARES
app.use(express.json())
app.use(cors())

app.use('/api/product', productRouter)
app.use('/auth', authRouter)


app.listen(PORT, ()=> {
    connectDB()
    console.log(`Server running on port ${PORT}`)
}
)