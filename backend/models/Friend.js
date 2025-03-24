const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    quote:{
        type:String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true});

const Friend = mongoose.model("Friend",friendSchema);

module.exports = Friend;