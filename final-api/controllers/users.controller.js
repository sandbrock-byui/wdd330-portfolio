const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/user.model');

exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.errors[0].msg
    const error = new Error(errorMsg);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;

  // Hash password
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      // Persist the user to the database
      const user = new User({
        email: email,
        password: hashedPassword
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: 'User created successfully.',
        userId: result._id
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;

  if (userId !== req.userId) {
    const error = new Error('Not authorized!');
    error.statusCode = 403;
    throw error;
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      return User.findByIdAndRemove(userId);
    })
    .then((result) => {
      res.status(200).json({
        message: 'Deleted user.'
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;

  if (userId !== req.userId) {
    const error = new Error('Not authorized!');
    error.statusCode = 403;
    throw error;
  }

  User.findById(userId).then((user) => {
    if (!user) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    }

    // Exclude password field from response
    const { password, ...responseUser } = user._doc;
    res.status(200).json({
      message: 'User retrieved successfully.',
      user: responseUser
    });
  });
};

exports.loginUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.errors[0].msg
    const error = new Error(errorMsg);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;
  let foundUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }

      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((passwordsMatch) => {
      if (!passwordsMatch) {
        const error = new Error('Invalid password.');
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          userId: foundUser._id.toString(),
          email: foundUser.email
        },
        process.env.JWT_PASSWORD,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        userId: foundUser._id.toString(),
        token: token
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.updatePassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.errors[0].msg
    const error = new Error(errorMsg);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const userId = req.userId;
  const password = req.body.password;

  if (!userId) {
    const error = new Error('Not authorized!');
    error.statusCode = 403;
    throw error;
  }

  let foundUser;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      foundUser = user;
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      // Persist the user to the database
      foundUser.password = hashedPassword;
      return foundUser.save();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Password updated successfully.'
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

