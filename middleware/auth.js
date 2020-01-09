const Jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    // Get token from header 
    const token = req.header("x-auth-token");
    // check if not Token 
    if (!token) {
        return res.status(401).json({ msg: "no Token, access denide !!" })
    }
    try {
        const decode = Jwt.verify(token, config.get("jwtSecret"));
        req.user = decode.user;
        next();

    } catch (err) {
        res.status(401).json({ msg: "invalid token" })

    }
}