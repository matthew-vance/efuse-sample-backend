import { DocumentType } from "@typegoose/typegoose";
import { CreateUserDto } from "./dto";
import UserModel, { User } from "./user.model";

const readById = (userId: string): string => {
  return `User with id ${userId} found!`;
};

const create = async (
  createUserDto: CreateUserDto
): Promise<DocumentType<User>> => {
  return await UserModel.create(createUserDto);
};

export default {
  readById,
  create,
};
