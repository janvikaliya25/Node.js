
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Token is required." });
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    let decode = jwt.verify(token, "user");
    console.log("Decoded Payload:", decode);
    console.log("Expiry Date:", new Date(decode.exp * 1000));

    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token." });
  }
};

module.exports = auth;
