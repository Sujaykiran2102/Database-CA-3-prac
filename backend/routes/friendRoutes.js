const express = require("express");
const {addFriend,getFriends,getFriendById,updateFriend,deleteFriend} = require("../controllers/friendController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",getFriends);
router.get("/:id",getFriendById);

router.post("/add",authMiddleware,addFriend);
router.put("/update/:id",authMiddleware,updateFriend);
router.delete("/delete/:id",authMiddleware,deleteFriend);

module.exports = router;