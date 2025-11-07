import { GoogleGenerativeAI } from '@google/generative-ai';
import ChatHistory from '../models/chatHistoryModel.js';
import Course from '../models/courseModel.js'; // Assumes you have a Course model

// Initialize Google AI Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

/**
 * --- RAG Step 1: Get Context from your Database ---
 * Finds relevant courses from your MongoDB to "stuff" the prompt.
 */
const getNexaLearnContext = async (message) => {
  try {
    // This uses MongoDB's $text search.
    // NOTE: You must create a text index on your Course model for this to work!
    // e.g., courseSchema.index({ title: 'text', description: 'text' });
    const courses = await Course.find(
      { $text: { $search: message } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(3); // Get top 3 matches

    if (courses.length === 0) {
      return 'No specific course information found.';
    }

    // Format the context for the AI
    let context = 'Relevant NexaLearn Courses:\n';
    courses.forEach((course) => {
      const description = course.description || '';
      const descriptionPreview = description.substring(0, 100);
      context += `- ${course.title}: ${descriptionPreview}${description.length > 100 ? '...' : ''} (Level: ${course.level})\n`;
    });
    return context;
  } catch (error) {
    console.error('Error fetching RAG context:', error);
    return 'Error finding course context.';
  }
};

/**
 * --- Controller 1: Handle Chat Request ---
 */
export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id; // From 'protect' middleware

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // --- RAG ---
    // 1. Get relevant knowledge from our own database
    const courseContext = await getNexaLearnContext(message);

    // 2. Get user's past chat history
    let chatHistory = await ChatHistory.findOne({ user: userId });
    if (!chatHistory) {
      chatHistory = new ChatHistory({ user: userId, messages: [] });
    }

    // Format history for Gemini API (role: 'user' or 'model')
    const geminiHistory = chatHistory.messages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // --- Create the "Smart" Prompt ---
    const systemPrompt = `You are a helpful assistant for NexaLearn, an e-learning platform.
    The user's name is ${req.user.name}.
    Use the following course information to answer the user's question.
    If the answer is not in this information, politely say you don't have that detail.

    --- Course Context ---
    ${courseContext}
    --------------------
    `;

    // Start a chat session with the full history
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'Okay, I am ready to help!' }] },
        ...geminiHistory,
      ],
      generationConfig: { maxOutputTokens: 1000 },
    });

    // 3. Send new message to Gemini
    const result = await chat.sendMessage(message);
    const aiMessage = result.response.text();

    // 4. Save new messages to our database
    chatHistory.messages.push({ sender: 'user', text: message });
    chatHistory.messages.push({ sender: 'bot', text: aiMessage });
    await chatHistory.save();

    // 5. Send response to frontend
    res.json({ response: aiMessage });
  } catch (error) {
    console.error('Error in AI Chat Controller:', error);
    res.status(500).json({ error: 'An error occurred with the AI model' });
  }
};


export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const chatHistory = await ChatHistory.findOne({ user: userId });

    if (!chatHistory) {
      return res.json({ messages: [] });
    }

    res.json({ messages: chatHistory.messages });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Server error' });
  }
};