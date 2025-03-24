const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendRoutes")

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoutes);
app.use("/api/friends",friendRoutes);

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log("MongoDB connected successfully"))
.catch((err)=> {
    console.log("MongoDB connection error: ",err);
    process.exit(1);
})

app.get("/",(req,res)=>{
    res.send("API is running successfully");
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})