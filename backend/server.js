import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import exerciseRouter from './routes/exerciseRoutes.js';


const app = express();
const PORT = process.env.PORT ;

app.use(cors());

//connect to MongoDB
connectDB();

//middleware
app.use(express.json());

//routes

app.use('/api/users', userRouter);
app.use('/api/exercises', exerciseRouter);
app.get('/', (req, res) => {  
  res.send('Welcome to the TrainWave Backend!');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});