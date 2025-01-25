const StudentProfile = require("../models/authmodels/StudentProfileModel");
const User = require("../models/authmodels/authModel");

exports.createStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const existingProfile = await StudentProfile.findOne({user: user.id})

    if (existingProfile) {
        // If the profile exists, just return the existing profile without uploading new files
        return res.status(200).json({
          success: true,
          message: "Profile already exists",
          data: existingProfile,
        });
      }
      if (req.files) {
        fee_receipt = req.files?.fee_receipt?.[0]?.path || fee_receipt;
        id_proof = req.files?.id_proof?.[0]?.path || id_proof;
        profile_image = req.files?.profile_image?.[0]?.path || profile_image;
      }
    const { department, current_year, prn_no, age, description, address } = req.body;
    const profile = new StudentProfile({
      user: user.id, // Link the profile to the user
      department,
      current_year,
      prn_no,
      age,
      description,
      address,
      fee_receipt: req.files?.fee_receipt?.path || "public/images/default.png", // Uploaded file path
      id_proof: req.files?.id_proof?.path || "public/images/default.png",
      profile_image: req.files?.profile_image?.path || "public/images/default.png",
    });

    await profile.save();

    res.status(201).json({
      success: true,
      message: "Student profile created successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStudentProfile = async (req, res) => {
    try {
        console.log("ohh bhai maro mujhe maro" + req.user)
    const user = await User.findById(req.user.id);
    console.log(user)
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
  
      // Check if the profile exists
      const existingProfile = await StudentProfile.findOne({ user: user.id });
      if (!existingProfile) {
        return res.status(404).json({
          success: false,
          message: "Profile does not exist",
        });
      }
  
      // Get updated fields from the request body
      const { department, current_year, prn_no, age, description, address } = req.body;
  
      // Initialize default image paths (to preserve the existing ones if no new files are uploaded)
      let fee_receipt = existingProfile.fee_receipt;
      let id_proof = existingProfile.id_proof;
      let profile_image = existingProfile.profile_image;
  
      // Handle file uploads (update only if new files are uploaded)
      if (req.files) {
        fee_receipt = req.files?.fee_receipt?.[0]?.path || fee_receipt;
        id_proof = req.files?.id_proof?.[0]?.path || id_proof;
        profile_image = req.files?.profile_image?.[0]?.path || profile_image;
      }
  
      // Update the existing profile with new data
      existingProfile.department = department || existingProfile.department;
      existingProfile.current_year = current_year || existingProfile.current_year;
      existingProfile.prn_no = prn_no || existingProfile.prn_no;
      existingProfile.age = age || existingProfile.age;
      existingProfile.description = description || existingProfile.description;
      existingProfile.address = address || existingProfile.address;
      existingProfile.fee_receipt = fee_receipt;
      existingProfile.id_proof = id_proof;
      existingProfile.profile_image = profile_image;
  
      // Save the updated profile
      await existingProfile.save();
  
      res.status(200).json({
        success: true,
        message: "Student profile updated successfully",
        data: existingProfile,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

