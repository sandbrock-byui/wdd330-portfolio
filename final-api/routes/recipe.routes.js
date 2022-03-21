const express = require('express');
const { body } = require('express-validator');

const recipeController = require('../controllers/recipe.controller');

const router = express.Router();

/**
 * @swagger
 * /recipes/{recipeId}:
 *   delete:
 *     summary: Deletes the specified recipe.
 *     parameters:
 *     - in: path
 *       name: recipeId
 *       required: true
 *       description: ID of the recipe to delete.
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
 *       - Recipes
 */
router.delete('/:recipeId', isAuth, recipeController.deleteRecipe);

/**
 * @swagger
 * /recipes/{recipeId}:
 *   get:
 *     summary: Retrieves the specified recipe.
 *     parameters:
 *     - name: recipeId
 *       in: path
 *       required: true
 *       description: ID of the recipe to retrieve.
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: The requested recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       403:
 *         description: Unauthorized
 *       404:
 *        description: Not found
 *     tags:
 *       - Recipes
 */
router.get('/:recipeId', isAuth, recipeController.getRecipe);

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Retrieves a list of all recipes.
 *     responses:
 *       200:
 *         description: All recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#/components/schemas/Recipe'
 *     tags:
 *       - Recipes
 */
router.get('/', isAuth, recipeController.getAllRecipes);

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Creates a new recipe in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: The ID of the newly created recipe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe created successfully.
 *                 recipeId:
 *                   type: string
 *                   example: 62256c49de4e8db8b2bde8e6
 *     tags:
 *       - Recipes
 */
router.post(
  '/',
  [
    body('userId').require().withMessage('userId is required.'),
    body('title').require().withMessage('title is required.'),
    body('description').require().withMessage('description is required.'),
    body('ingredients').require().withMessage('ingredients is required.'),
    body('instructions').require().withMessage('instructions is required.')
  ],
  recipeController.createRecipe
);

/**
 * @swagger
 * /recipes:
 *   put:
 *     summary: Updates a recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: The recipe was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe updated successfully.
 *     tags:
 *       - Recipes
 */
 router.put('/', isAuth, recipeController.updateRecipe);

module.exports = router;
