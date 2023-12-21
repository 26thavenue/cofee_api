import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config()

const app = express();

app.use(morgan('tiny'))
const PORT= process.env || 5000

app.listen(PORT, () => {
    console.log('Server has started');
})