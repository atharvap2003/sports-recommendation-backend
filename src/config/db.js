const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://atharvapandharikar5:EK3QwQq5mOqpgyV0@cluster0.f0tix.mongodb.net/sports-recommendation-site?retryWrites=true&w=majority"
    );
    console.log("Mongoose connected");
  } catch (error) {
    console.log("error " + { error });
    process.exit(1);
  }
};
module.exports = connectDB;
