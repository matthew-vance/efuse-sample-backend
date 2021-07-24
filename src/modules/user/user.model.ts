import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";
import validator from "validator";

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true })
  firstName!: string;

  @prop({ required: true })
  lastName!: string;

  @prop({ required: true, unique: true, validate: [validator.isEmail] })
  email!: string;

  @prop({ required: true })
  username!: string;
}

const UserModel = getModelForClass(User);

export default UserModel;
