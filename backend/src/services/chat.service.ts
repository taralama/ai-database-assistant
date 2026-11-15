import { answerFromRows, connectLLM } from "../config/llm";
import { chatRepository } from "../repositories/chat.repository";

export const chatService = async (question: string) => {
    const query = await connectLLM(question);

    const responseFromDb = await chatRepository(query);

    const response = await answerFromRows(question, responseFromDb);
    return response;
};
