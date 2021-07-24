import { createApp } from "./app";

const startServer = () => {
  const port = 5000;
  const app = createApp();

  return app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};

startServer();
