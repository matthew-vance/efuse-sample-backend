import { CreateUserDto } from "./dto";

const readById = (userId: string): string => {
  return `User with id ${userId} found!`;
};

const create = (createUserDto: CreateUserDto): string => {
  return "User created!";
};

export default {
  readById,
  create,
};
