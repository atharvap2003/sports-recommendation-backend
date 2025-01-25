const mongoose = require("mongoose");

// Define department and year choices as arrays (similar to Django choices)
const DEPARTMENT_CHOICES = [
  "it",
  "cs",
  "entc",
  "mech",
  "biotech",
  "electrical",
  "civil",
];

const YEAR_CHOICES = ["fe", "se", "te", "be"];

// Define the StudentProfile schema
const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the CustomUser model
    required: true,
  },
  department: {
    type: String,
    enum: DEPARTMENT_CHOICES, // Restrict values to department choices
    default: "it",
  },
  current_year: {
    type: String,
    enum: YEAR_CHOICES, // Restrict values to year choices
    default: "fe",
  },
  prn_no: {
    type: String,
    trim: true,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  fee_receipt: {
    type: String, // Path to the uploaded file
    default: "public/images/default.png",
  },
  id_proof: {
    type: String, // Path to the uploaded file
    default: "public/images/default.png",
  },
  profile_image: {
    type: String, // Path to the uploaded file
    default: "public/images/default.png",
  },
});

// Export the model
const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

module.exports = StudentProfile;
