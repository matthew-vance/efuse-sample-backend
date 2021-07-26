import { ErrorRequestHandler } from "express";

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  req.log.error(err);
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).send("Something went wrong...");
};

export default handleError;
