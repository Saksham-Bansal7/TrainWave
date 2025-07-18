import express from 'express';
import { protectMiddleware } from "../middleware/authMiddleware.js";
import {
  createExercise,
  getUserExercises,
  deleteExercise,
  getLeaderboard, 
} from '../controllers/exerciseController.js';

const exerciseRouter = express.Router();

exerciseRouter.post("/", protectMiddleware, createExercise);
exerciseRouter.get("/", protectMiddleware, getUserExercises);
exerciseRouter.get("/leaderboard", protectMiddleware, getLeaderboard);
exerciseRouter.delete("/:id", protectMiddleware, deleteExercise);

export default exerciseRouter;
