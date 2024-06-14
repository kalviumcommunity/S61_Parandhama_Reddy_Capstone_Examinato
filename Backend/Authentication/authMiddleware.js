const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(400).send('Invalid token format.');
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = auth;
