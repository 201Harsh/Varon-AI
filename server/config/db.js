import mongoose from "mongoose";

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Error Connecting to DB: ${error}`);
  }
};

export default ConnectToDB;

