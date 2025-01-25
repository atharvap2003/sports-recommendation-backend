const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public")));

//connect db::
connectDb();

//routes::
app.use("/api/auth", authRoutes);

app.get("/", (req, res)=>{
  res.send("Backend running");
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;
