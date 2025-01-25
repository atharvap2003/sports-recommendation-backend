const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/authmodels/authModel");
const Interest = require("../models/authmodels/IntrestsModel")

exports.addinterest = async(req, res) =>{
    try{
        const {interest} = req.body
        const newInterest = new Interest({interest})
        await newInterest.save()
        res.status(201).json({
            success: true,
            message : "Interest Registered successfully"
        })
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" }); 
    }
}
exports.registerUser = async(req, res) =>{
    try{
        const {email, password, username, phone_number, user_type, interests, is_profile_completed} = req.body

        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const newUser = new User({
            email,
            password,
            username,
            phone_number,
            password,
            user_type,
            interests, // Array of interest IDs
            is_profile_completed
          });
        await newUser.save()
        const token = jwt.sign(
            {
                id : newUser._id,
                email : newUser.email,
                user_type : newUser.user_type
            },
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        )
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
              id: newUser._id,
              token : token,
              email: newUser.email,
              username: newUser.username,
              user_type: newUser.user_type,
            },
          });
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.loginUser = async(req, res) =>{
    try{
        const {email, password} = req.body

        const user = await User.findOne({email}).populate("interests")
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign(
            {
                id : user._id,
                email : user.email,
                user_type : user.user_type
            },
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        )
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: {
              id: user._id,
              email: user.email,
              username: user.username,
              user_type: user.user_type,
              interests: user.interests,
            },
          });
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
