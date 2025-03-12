import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("[Database] MongoDB conectado");
  } catch (error) {
    console.error("[Database] Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
