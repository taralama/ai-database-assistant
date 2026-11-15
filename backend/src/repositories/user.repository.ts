import { AppDataSource } from "../AppDataSource";
import { User } from "../entities/User";

export const userRepository = async () => {
    const userList = await AppDataSource.getRepository(User).find();
    return userList;
};
