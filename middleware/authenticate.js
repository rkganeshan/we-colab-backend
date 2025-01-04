const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    console.log('Authorization header is missing');
    return res.status(401).send({ error: 'Authorization header is missing' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecret123');
    console.log('Decoded token:', decoded);
    
    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.log('User not found');
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = { authenticate };
