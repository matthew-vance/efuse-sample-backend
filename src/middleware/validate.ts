import { RequestHandler } from "express";
import { Schema } from "joi";

const validate =
  (schema: Schema, property: "body" | "params" | "query"): RequestHandler =>
  (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      const { details } = error;
      const messages = details.map((i) => i.message);
      res.status(422).json({ validationError: messages });
    }
    next();
  };

export default validate;
