import { DocumentType } from "@typegoose/typegoose";
import CreateUserDto from "./create.user.dto";
import UserModel, { User } from "./user.model";
import { modelHelper } from "../../utils";

const findById = async (userId: string): Promise<DocumentType<User> | null> =>
  modelHelper.findById<User>(userId, UserModel);

const create = async (
  createUserDto: CreateUserDto
): Promise<DocumentType<User>> =>
  modelHelper.create<User>(createUserDto, UserModel);

const update = async (
  userId: string,
  updateUserDto: CreateUserDto
): Promise<DocumentType<User> | null> =>
  modelHelper.update<User>(userId, updateUserDto, UserModel);

export default {
  findById,
  create,
  update,
};
