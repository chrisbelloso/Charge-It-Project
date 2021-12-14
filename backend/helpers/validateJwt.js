const jwt = require("jsonwebtoken");

const Company = require("../models/Company");


const validateJwt = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        req.company = await Company(uid);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });        
    }
};

module.exports = {
    validateJwt,
}