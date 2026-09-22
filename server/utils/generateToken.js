const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'stockwise_super_secret_jwt_key_2026_dev',
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
