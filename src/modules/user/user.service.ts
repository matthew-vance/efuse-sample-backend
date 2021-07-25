import { DocumentType } from "@typegoose/typegoose";
import { CreateUserDto } from "./dto";
import UserModel, { User } from "./user.model";

const readById = async (userId: string): Promise<DocumentType<User> | null> => {
  return await UserModel.findById(userId);
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
