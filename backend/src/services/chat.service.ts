import { success } from "zod";
import {
    answerFromRows,
    checkQuestionRelevance,
    connectLLM,
} from "../config/llm";
import { chatRepository } from "../repositories/chat.repository";

export const chatService = async (question: string) => {
    const query = await connectLLM(question);
    const relevance = await checkQuestionRelevance(question, query);

    if (!relevance.relevant) {
        return {
            success: false,
            type: "IRRELEVANT",
            message:
                "I can only answer questions related to the connected database.",
        };
    }

    const responseFromDb = await chatRepository(query);

    const response = await answerFromRows(question, responseFromDb);
    return response;
};
