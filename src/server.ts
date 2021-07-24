import { createApp } from "./app";
import { connectToDb } from "./utils";

const startServer = async () => {
  const port = 5000;
  const mongoUri = "mongodb://localhost:27017/efuse";

  const app = createApp();
  await connectToDb(mongoUri);

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};

startServer();
