import { DocumentType } from "@typegoose/typegoose";
import CreatePostDto from "./create.post.dto";
import PostModel, { Post } from "./post.model";
import { modelHelper, cache } from "../../utils";
import { FilterQuery } from "mongoose";

const findById = async (postId: string): Promise<DocumentType<Post> | null> =>
  modelHelper.findById<Post>(postId, PostModel);

const create = async (
  createPostDto: CreatePostDto
): Promise<DocumentType<Post>> => {
  const post = await modelHelper.create<Post>(createPostDto, PostModel);
  await cache.sadd([`${post.user}posts`, String(post._id)]);
  return post;
};

const update = async (
  postId: string,
  updatePostDto: CreatePostDto
): Promise<DocumentType<Post> | null> =>
  modelHelper.update<Post>(postId, updatePostDto, PostModel);

const find = async (
  filter: FilterQuery<DocumentType<Post>>
): Promise<DocumentType<Post>[] | null> => {
  const cachePostIds = await cache.smembers(`${filter.user}posts`); //
  if (cachePostIds.length > 0) {
    const posts = await cache.mget(cachePostIds);
    return posts.map((post) => new PostModel(JSON.parse(post)));
  }

  const posts = await PostModel.find(filter);
  if (posts.length > 0) {
    const dbPostIds = posts.map((post) => post._id);
    await cache.sadd(dbPostIds);
    return posts;
  }
  return null;
};

export default {
  findById,
  create,
  update,
  find,
};
