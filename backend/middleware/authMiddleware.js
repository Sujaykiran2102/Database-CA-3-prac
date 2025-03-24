const jwt = require("jsonwebtoken");

const authMiddleware = async(req,res,next) =>{
    const token = req.header("Authorization");
    if(!token){
        res.status(401).json({message:"Accesss denied to invalid authorizational credintials"})
    }
    try {
        const decode = jwt.verify(token.replace("Bearer ",""),process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({message:"Access denied"});
    }
}

module.exports = authMiddleware;