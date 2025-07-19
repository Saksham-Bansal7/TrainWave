import express from "express";
import { protectMiddleware } from "../middleware/authMiddleware.js";
import {
  newChat,
  deleteMessage,
  getMessages,
  sendMessage,
} from "../controllers/trainerChatController.js";

const trainerChatRouter = express.Router();

trainerChatRouter.get("/", protectMiddleware, getMessages); // Get chat history
trainerChatRouter.post("/message", protectMiddleware, sendMessage); // Send message and get AI response
trainerChatRouter.post("/new-chat", protectMiddleware, newChat);
trainerChatRouter.delete("/:id", protectMiddleware, deleteMessage);

export default trainerChatRouter;
