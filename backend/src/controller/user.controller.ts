import { Response, Request } from "express";
import { UserService } from "../services/user.service";

interface ChatProperty {
    message: string;
}

export const chatController = async (
    req: Request<unknown, unknown, ChatProperty>,
    res: Response,
) => {
    const user = await UserService();

    res.json({
        message: req?.body?.message,
        user,
    });
};
