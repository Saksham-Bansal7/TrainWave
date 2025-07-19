import Message, { SENDER_TYPES } from "../models/trainerChatModel.js";
import { getTrainerResponse } from "../config/groqApi.js";

const createMessage = async (req, res) => {
  const { content, sender } = req.body;
  const userId = req.user._id;
  try {
    const newMessage = new Message({
      userId,
      sender,
      content,
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create message", error: error.message });
  }
};

const newChat = async (req, res) => {
  //delete all the message of the user
  const userId = req.user._id;
  try {
    await Message.deleteMany({ userId });
    res.status(200).json({ message: "All messages deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete messages", error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const message = await Message.findByIdAndDelete(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete message", error: error.message });
  }
};

const getMessages = async (req, res) => {
  const userId = req.user._id;

  try {
    // Get existing messages for the user
    const messages = await Message.find({ userId })
      .sort({ timestamp: 1 }) // Oldest first for conversation flow
      .limit(20); // Limit to last 20 messages for performance

    res.status(200).json({
      messages: messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({
      message: "Failed to get messages",
      error: error.message,
    });
  }
};

const sendMessage = async (req, res) => {
  const userId = req.user._id;
  const { newMessage } = req.body;

  if (!newMessage || !newMessage.trim()) {
    return res.status(400).json({ message: "Message content is required" });
  }

  try {
    // Get existing messages for context
    const existingMessages = await Message.find({ userId })
      .sort({ timestamp: 1 })
      .limit(20);

    // Save the user's message first
    const userMessage = new Message({
      userId,
      sender: SENDER_TYPES.USER,
      content: newMessage.trim(),
    });
    await userMessage.save();

    // Get AI trainer response
    try {
      const aiResponse = await getTrainerResponse(existingMessages, newMessage);

      // Save the trainer's response
      const trainerMessage = new Message({
        userId,
        sender: SENDER_TYPES.TRAINER,
        content: aiResponse,
      });
      await trainerMessage.save();

      // Return updated conversation
      const updatedMessages = await Message.find({ userId })
        .sort({ timestamp: 1 })
        .limit(20);

      return res.status(200).json({
        messages: updatedMessages,
        newResponse: aiResponse,
      });
    } catch (aiError) {
      console.error("AI Response Error:", aiError);
      // Save a fallback trainer response
      const fallbackMessage = new Message({
        userId,
        sender: SENDER_TYPES.TRAINER,
        content:
          "I'm having trouble connecting right now, but I'm here to help with your fitness goals! 💪 Try asking me again in a moment.",
      });
      await fallbackMessage.save();

      const updatedMessages = await Message.find({ userId })
        .sort({ timestamp: 1 })
        .limit(20);

      return res.status(200).json({
        messages: updatedMessages,
        error: "AI temporarily unavailable",
      });
    }
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });
  }
};

export { createMessage, newChat, deleteMessage, getMessages, sendMessage };
