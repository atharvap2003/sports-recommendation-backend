const Equipment = require("../models/Equipments");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    // Destructure request body. Note: availableQuantity is required.
    const { equipmentname, availableQuantity, TotalQuantity } = req.body;

    if (!equipmentname || availableQuantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Equipment name and available quantity are required.",
      });
    }

    const equipment = new Equipment({
      equipmentname,
      availableQuantity,
      TotalQuantity:
        TotalQuantity !== undefined ? TotalQuantity : availableQuantity,
    });

    await equipment.save();

    return res.status(201).json({
      success: true,
      message: "Equipment added successfully.",
      data: equipment,
    });
  } catch (error) {
    console.error("Error adding equipment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while adding equipment.",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    // Fetch all equipment documents from the database
    const equipments = await Equipment.find();
    
    // If no equipment is found, you may choose to return an empty array
    return res.status(200).json({
      success: true,
      data: equipments,
    });
  } catch (error) {
    console.error("Error fetching equipment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching equipment.",
      error: error.message,
    });
  }
});

module.exports = router;
