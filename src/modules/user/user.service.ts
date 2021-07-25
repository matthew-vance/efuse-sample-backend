import { DocumentType } from "@typegoose/typegoose";
import { CreateUserDto } from "./dto";
import UserModel, { User } from "./user.model";
import { cache } from "../../utils";

const readById = async (userId: string): Promise<DocumentType<User> | null> => {
  const cacheUser = await cache.get(userId);
  if (cacheUser !== null && cacheUser) {
    return new UserModel(JSON.parse(cacheUser));
  }

  const dbUser = await UserModel.findById(userId);

  if (dbUser !== null) {
    cache.set(String(dbUser._id), JSON.stringify(dbUser));
    return dbUser;
  }

  return null;
};

const create = async (
  createUserDto: CreateUserDto
): Promise<DocumentType<User>> => {
  const createdUser = await UserModel.create(createUserDto);
  cache.set(String(createdUser._id), JSON.stringify(createdUser));
  return createdUser;
};

const update = async (
  userId: string,
  updateUserDto: CreateUserDto
): Promise<DocumentType<User> | null> => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, updateUserDto, {
    new: true,
    runValidators: true,
  });
  if (updatedUser)
    cache.set(String(updatedUser._id), JSON.stringify(updatedUser));
  return updatedUser;
};

export default {
  readById,
  create,
  update,
};
