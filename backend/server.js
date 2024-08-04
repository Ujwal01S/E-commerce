
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';



//configure env
dotenv.config();  //if my env is in some folder/ not inroot config({path:}) 

//databasae config
connectDB();

//rest object or get express
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//auth routes
app.use('/api/v1/auth', authRoutes);

//category routes
app.use('/api/v1/category', categoryRoutes);

//product routes
app.use('/api/v1/product', productRoutes);

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