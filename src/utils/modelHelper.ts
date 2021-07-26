import { DocumentType } from "@typegoose/typegoose";
import { CreateQuery, Model, UpdateQuery } from "mongoose";
import { cache } from ".";

const findById = async <
  DOC,
  MODEL extends Model<DocumentType<DOC>> = Model<DocumentType<DOC>>
>(
  entityId: string,
  model: MODEL
): Promise<DocumentType<DOC> | null> => {
  const cacheEntity = await cache.get(entityId);
  if (cacheEntity !== null && cacheEntity) {
    return new model(JSON.parse(cacheEntity));
  }

  const dbEntity = await model.findById(entityId);

  if (dbEntity !== null) {
    await cache.set(String(dbEntity._id), JSON.stringify(dbEntity));
    return dbEntity;
  }
  return null;
};

const create = async <
  DOC,
  DTO extends CreateQuery<DocumentType<DOC>> = CreateQuery<DocumentType<DOC>>,
  MODEL extends Model<DocumentType<DOC>> = Model<DocumentType<DOC>>
>(
  dto: DTO,
  model: MODEL
): Promise<DocumentType<DOC>> => {
  const createdEntity = await model.create(dto);
  await cache.set(String(createdEntity._id), JSON.stringify(createdEntity));
  return createdEntity;
};

const update = async <
  DOC,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DTO extends UpdateQuery<DocumentType<DOC>> = any, // Why doesn't UpdateQuery<DocumentType<DOC>> work here?
  MODEL extends Model<DocumentType<DOC>> = Model<DocumentType<DOC>>
>(
  entityId: string,
  dto: DTO,
  model: MODEL
): Promise<DocumentType<DOC> | null> => {
  const updatedEntity = await model.findByIdAndUpdate(entityId, dto, {
    new: true,
    runValidators: true,
  });

  if (updatedEntity)
    cache.set(String(updatedEntity._id), JSON.stringify(updatedEntity));
  return updatedEntity;
};

export default {
  findById,
  create,
  update,
};
