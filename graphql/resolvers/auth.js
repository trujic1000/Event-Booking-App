const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
  createUser: async ({ userInput }) => {
    const { name, email, password } = userInput;
    try {
      let user = await User.findOne({ email });
      if (user) {
        throw new Error('User already exists');
      }
      const hash = await bcrypt.hash(password, 12);
      // Save user to database
      user = await new User({ name, email, password: hash }).save();
      // Generate token
      const payload = {
        userId: user.id,
        email: user.email
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      return {
        name: user.name,
        userId: user.id,
        token
      };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        errors.auth = 'Authentication failed';
      }
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        errors.auth = 'Authentication failed';
      }
      // Generate token
      const payload = {
        userId: user.id,
        email: user.email
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      return {
        name: user.name,
        userId: user.id,
        token
      };
    } catch (err) {
      throw err;
    }
  }
};
