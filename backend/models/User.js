const mongoose= require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true});

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();

    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password = hashedPassword;
    next();
})

const User = mongoose.model("User",userSchema);
module.exports = User;