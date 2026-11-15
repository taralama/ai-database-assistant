import { AppDataSource } from "../AppDataSource";
import { User } from "../entities/User";

export const chatRepository = async (query: string) => {
    const response = await AppDataSource.query(`${query}`);
    return response;
};
