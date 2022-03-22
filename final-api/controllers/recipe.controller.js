const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const Recipe = require('../models/recipe.model');

exports.createRecipe = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.errors[0].msg;
    const error = new Error(errorMsg);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const userId = req.body.userId;
  const title = req.body.title;
  const description = req.body.description;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;

  const recipe = new Recipe({
    userId: userId,
    title: title,
    description: description,
    ingredients: ingredients,
    instructions: instructions
  });

  recipe
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Recipe created successfully.',
        recipeId: result._id
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then((recipe) => {
      if (!recipe) {
        const error = new Error('Could not find recipe.');
        error.statusCode = 404;
        throw error;
      }

      if (recipe.userId.toString() !== req.userId.toString()) {
        const error = new Error('User not authorized to delete recipe.');
        error.statusCode = 403;
        throw error;
      }

      return Recipe.findByIdAndRemove(recipeId);
    })
    .then((result) => {
      res.status(200).json({
        message: 'Deleted recipe.'
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then((recipe) => {
      if (!recipe) {
        const error = new Error('Could not find recipe.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        message: 'Recipe retrieved successfully.',
        recipe: recipe
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllRecipes = (req, res, next) => {
  Recipe.find()
    .collation({ locale: 'en', strength: 2 })
    .sort({ title: 1 })
    .then((recipes) => {
      if (!recipes) {
        const error = new Error('Could not find recipe.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        message: 'Recipes retrieved successfully.',
        recipes: recipes
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateRecipe = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.errors[0].msg;
    const error = new Error(errorMsg);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const recipeId = req.body._id;
  const title = req.body.title;
  const description = req.body.description;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;

  Recipe.findById(recipeId)
    .then((recipe) => {
      if (!recipe) {
        const error = new Error('Could not find recipe.');
        error.statusCode = 404;
        throw error;
      }

      if (recipe.userId.toString() !== req.userId.toString()) {
        const error = new Error(
          'User is not authorized to update this recipe.'
        );
        error.statusCode = 403;
        throw error;
      }

      recipe.title = title;
      recipe.description = description;
      recipe.ingredients = ingredients;
      recipe.instructions = instructions;
      return recipe.save();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Recipe updated successfully.'
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
