// services/userService.ts

import { getRepository } from "typeorm";
import { User } from "../models/User";

export const registerUser = async (email: string, password: string) => {
  try {
    const userRepository = getRepository(User);
    const user = new User();
    user.email = email;
    user.password = password;
    await userRepository.save(user);
    return user;
  } catch (error) {
    throw new Error("Failed to register user");
  }
};
