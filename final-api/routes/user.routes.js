const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user.model');
const userController = require('../controllers/user.controller');
const isAuth = require('../middleware/isauth.middleware');

const router = express.Router();

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Deletes the specified user.
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       description: ID of the user to delete.
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       403:
 *         description: Unauthorized
 *       404:
 *        description: Not found
 *     tags:
 *       - Users
 */
router.delete('/:userId', isAuth, userController.deleteUser);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Retrieves the specified user.
 *     parameters:
 *     - name: userId
 *       in: path
 *       required: true
 *       description: ID of the user to retrieve.
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: The requested user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Unauthorized
 *       404:
 *        description: Not found
 *     tags:
 *       - Users
 */
router.get('/:userId', isAuth, userController.getUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Logs in a user and retrieves a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: me@here.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: secure1234
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The user ID
 *                   example: 62256c49de4e8db8b2bde8e6
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjI1NmM0OWRlNGU4ZGI4YjJiZGU4ZTYiLCJlbWFpbCI6InJvYzIwMDAyQGJ5dWkuZWR1IiwiaWF0IjoxNjQ3NDg2OTMwLCJleHAiOjE2NDc0OTA1MzB9.R52QpAC92djYCR3zBbwobN_3AQlU3BJ1sEaP4aL4jWo
 *       401:
 *         description: Invalid credentials
 *     tags:
 *       - Users
 *     security: []
 */
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters.')
  ],
  userController.loginUser
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a new user in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: me@here.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: secure1234
 *     responses:
 *       201:
 *         description: The ID of the newly created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully.
 *                 userId:
 *                   type: string
 *                   example: 62256c49de4e8db8b2bde8e6
 *     tags:
 *       - Users
 *     security: []
 */
router.post(
  '/',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((foundUser) => {
          if (foundUser) {
            return Promise.reject('A user with that email already exists.');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters.')
  ],
  userController.createUser
);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Updates the logged in user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: secure1234
 *     responses:
 *       201:
 *         description: The user was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully.
 *     tags:
 *       - Users
 */
router.put('/', isAuth, userController.updatePassword);

module.exports = router;
