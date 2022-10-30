const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // get the token from headers
    let token = req.header("Authorization");
    if (!token) return res.status(401).send("No token was provided");

    // Checking the token
    const payload = jwt.verify(token, process.env.secretKey);

    // save to payload
    req.payload = payload;

    next();
  } catch (err) {
    res.status(400).send(err);
  }
};
