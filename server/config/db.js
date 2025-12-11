import mongoose from "mongoose";

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
  }
};

export default ConnectToDB;

