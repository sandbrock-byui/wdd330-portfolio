const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *           example: 62256c49de4e8db8b2bde8e6
 *         email:
 *           type: string
 *           description: The user's email
 *           example: me@here.com
 */
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
