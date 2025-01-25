// models/CustomUser.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const UserModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password : {
    type : String,
    required : true
  },
  username: {
    type: String,
    required: false,
  },
  phone_number: {
    type: String,
    unique: true,
    sparse: true, // Ensures unique constraint even with null values
  },
  user_type: {
    type: String,
    enum: ["admin", "student", "Coordinator", "Principle"],
    default: "student",
  },
  interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interest", // Reference to the Interest model
    },
  ],
  is_profile_completed: {
    type: Boolean,
    default: false,
  },
});

UserModel.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


// Export the model
module.exports = mongoose.model("UserModel", UserModel);
