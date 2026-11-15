import { userRepository } from "../repositories/user.repository";

export const UserService = async () => {
    const userInfo = await userRepository();
    return userInfo;
};
