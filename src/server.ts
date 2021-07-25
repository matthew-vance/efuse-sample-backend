import dotenv from "dotenv";
dotenv.config();
import { createApp } from "./app";
import { env, connectToDb, shutdown } from "./utils";

const startServer = async () => {
  const port = 5000;
  const { mongoUri } = env;

  const app = createApp();

  try {
    await connectToDb(mongoUri);
  } catch (err) {
    console.error(err.toString());
    shutdown(1);
  }

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};

startServer();
