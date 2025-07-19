import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getTrainerResponse = async (messages, newUserMessage) => {
  try {
    // Create system prompt for the AI trainer
    const systemPrompt = {
      role: "system",
      content: `You are FitBot, an experienced and motivating fitness trainer and coach. Your role is to:
      
      🏋️ Provide expert exercise advice and workout guidance
      💪 Motivate and encourage users in their fitness journey
      📋 Create personalized workout plans based on user goals
      ✅ Correct exercise form and technique
      🥗 Offer basic nutrition guidance
      📈 Track progress and suggest improvements
      
      Your personality:
      - Encouraging and positive
      - Knowledgeable about fitness and health
      - Patient with beginners
      - Enthusiastic about helping people reach their goals
      
      Guidelines:
      - Keep responses concise but helpful (2-4 sentences max)
      - Use emojis appropriately to add energy
      - Ask follow-up questions to better understand user needs
      - Always prioritize safety in exercise recommendations
      - If asked about medical issues, advise consulting a healthcare professional
      
      Remember: You're here to help users achieve their fitness goals through expert guidance and motivation!`,
    };

    // Format previous messages for context
    const formattedMessages = [systemPrompt];

    // Add conversation history
    messages.forEach((msg) => {
      formattedMessages.push({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      });
    });

    // Add the new user message
    if (newUserMessage) {
      formattedMessages.push({
        role: "user",
        content: newUserMessage,
      });
    }

    // Get response from Groq
    const completion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: "llama3-8b-8192", // Using Llama 3 8B model
      temperature: 0.7,
      max_tokens: 150, // Keep responses concise
      top_p: 0.9,
    });

    return (
      completion.choices[0]?.message?.content ||
      "I'm here to help with your fitness journey! What would you like to know?"
    );
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error(
      "Sorry, I'm having trouble connecting right now. Please try again!"
    );
  }
};

export default groq;
