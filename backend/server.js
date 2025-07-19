import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import exerciseRouter from './routes/exerciseRoutes.js';
import trainerChatRouter from './routes/trainerChatRoutes.js'; // Assuming this is the correct path for trainer chat routes


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
app.use('/api/trainer-chat', trainerChatRouter); // Trainer chat routes

// Test route
app.get('/', (req, res) => {  
  res.send('Welcome to the TrainWave Backend!');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});