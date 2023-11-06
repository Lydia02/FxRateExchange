const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

const splitToken = token.split(' ')[1]

  jwt.verify(splitToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      //  console.log(err)
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
console.log(decoded)
    req.userId = decoded.user._id;
    next();
  });
}

module.exports = verifyToken;
