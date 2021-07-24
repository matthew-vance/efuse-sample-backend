import mongoose from "mongoose";

const connectToDb = async (connectionString: string): Promise<void> => {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export default connectToDb;
