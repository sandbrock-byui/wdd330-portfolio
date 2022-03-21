const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The recipe ID
 *           example: 62256c49de4e8db8b2bde8e6
 *         userId:
 *           type: string
 *           description: The ID of the user that created the recipe
 *           example: 72256c49de4e8db8b2bde8e6
 *         title:
 *           type: string
 *           description: The title of the recipe
 *           example: 'Beef Empanadas'
 *         description:
 *           type: string
 *           description: An introduction to the recipe
 *           example: 'Mouth watering empanadas that will keep you coming back for more!'
 *         ingredients:
 *           type: string
 *           description: A line-delimited list of ingredients.
 *           example: '1 egg\n2 cups flour'
 *         instructions:
 *           type: string
 *           description: A line-delimited set of instructions to follow
 *           example: 'Mix ingredients.\nPut in baking pan.\nPut in oven for 20 mins at 300 degrees.'
 */
 const recipeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);