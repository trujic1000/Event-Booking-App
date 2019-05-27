const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
  createUser: async ({ userInput }) => {
    const { email, password } = userInput;
    try {
      let user = await User.findOne({ email });
      if (user) {
        throw new Error('User already exists');
      }
      const hash = await bcrypt.hash(password, 12);
      // Save user to database
      user = await new User({ email, password: hash }).save();
      return { ...user._doc, _id: user.id, password: null };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Authentication failed');
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Authentication failed password');
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
      userId: user.id,
      token,
      tokenExpiration: 1
    };
  }
};
