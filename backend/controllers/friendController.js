const Friend = require("../models/Friend");

const addFriend = async(req,res) =>{
    try {
        const {name,age,location,image,quote} = req.body;
        const newFriend = new Friend({name,age,location,image,quote,userId:req.user.userId});
        await newFriend.save();
        res.status(201).json({message:"Friend added successfully",friend:newFriend});
    } catch (error) {
        res.status(500).json({message:"Error adding friends",Error:error});
    }
}

const getFriends = async(req,res) =>{
    try {
        const friends = await Friend.find();
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({message:"Error fetching friends",Error:error});
    }
}

const getFriendById = async(req,res) =>{
    try {
        const friend = await Friend.findById(req.params.id);
        if(!friend){
            res.status(404).json({message:"Friend not found"});
        }
        res.status(200).json(friend);

    } catch (error) {
        res.status(500).json({message:"Error fetching friend details",Error:error});
    }
}

const updateFriend = async(req,res) =>{
    try {
        const friend = Friend.findById(req.params.id);
        if(!friend){
            return res.status(404).json({message: "Friend not found with given id"});
        }
        if(friend.userId.toString()!== req.user.userId){
            return res.status(403).json({message:"User is not authorized to update this friend"});
        }

        const updatedFriend = Friend.findByIdAndUpdate(req.params.id,req.body,{new:true,select:"-password"});

        res.status(200).json({message:"Updated friend successbully"});
    } catch (error) {
        res.status(500).json({message:"Error updating friend details",Error:error,friend:updatedFriend});
    }
}

const deleteFriend = async(req,res) =>{
    try {
        const friend = Friend.findById(req.params.id);
        if(!friend){
            return res.status(404).json({message:"Friend not found"});
        }
        if(friend.userId.toString()!==req.user.userId){
            return res.status(403).json({masssage:"User is not authorized to delete this friend"});
        }

        const deletedFriend = Friend.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Friend deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Error deleting friend",Error:error});
    }
}

module.exports = {addFriend,getFriends,getFriendById,updateFriend,deleteFriend};