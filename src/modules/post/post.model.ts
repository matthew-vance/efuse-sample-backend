import {
  prop,
  modelOptions,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { User } from "../user/user.model";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Post {
  @prop({
    required: true,
    ref: "User",
    type: Schema.Types.ObjectId,
    immutable: true,
  })
  user!: Ref<User>;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  content!: string;
}

const PostModel = getModelForClass(Post);

export default PostModel;
