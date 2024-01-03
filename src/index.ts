import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan'
import router from './routes/user.route.ts'
import authRouter from './routes/auth.route.ts'

dotenv.config()


const app = express();

const PORT= process.env || 5000

app.use(morgan('tiny'))

app.use(express.json())

app.use('/v1', router)
app.use('/v1', authRouter)


app.get('/',(req,res) => {
    res.send('Welcome to the cofee api')
})

app.listen(PORT, () => {
    console.log('Server has started');
})