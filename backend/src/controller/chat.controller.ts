import { Request, Response } from "express";
import { chatService } from "../services/chat.service";

interface ChatProperty {
    message: string;
}

export const chatController = async (
    req: Request<unknown, unknown, ChatProperty>,
    res: Response,
) => {
    const prompt = req.body.message;
    const user = await chatService(prompt);

    res.json({
        message: req?.body?.message,
        user,
    });
};
