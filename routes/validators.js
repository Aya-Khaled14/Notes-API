// validators.js
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

// Validator for new note
exports.newNoteValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('user').isMongoId().withMessage('Invalid user ID'),
  body('content').optional().isString().withMessage('Content must be a string'),
];

// Validator for sign up
exports.signUpValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  
  body('email').isEmail().withMessage('Invalid email format')
      .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject('Email already in use');
      }
    }),
  
  
    body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];  