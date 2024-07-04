
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

//configure env
dotenv.config();  //if my env is in some folder/ not inroot config({path:}) 

//databasae config
connectDB();

//rest object or get express
const app = express();

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);

//rest api
app.get('/', (req, res)=>{
    res.send('<h1>Welcome to ecommerce app</h1>');
});

//PORT
const PORT = process.env.PORT || 8080;

//run app i.e Listen
app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`.bgCyan.white);
});