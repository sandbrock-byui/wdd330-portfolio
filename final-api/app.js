const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const userRoutes = require('./routes/user.routes');

// Load environment variables
dotenv.config();

// Create express application
const app = express();

// CORS
app.use(cors());

// Swagger
const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'Edible Delights',
    version: '1.0.0',
    description: 'Edible Delights REST API'
  },
  basePath: '/',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};
const jsdocOptions = {
  swaggerDefinition,
  apis: ['./models/*.js', './routes/*.js']
};
const swaggerSpec = swaggerJSDoc(jsdocOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Parse JSON body entries
app.use(bodyParser.json());

// Internal routes
app.use('/users', userRoutes);

// Error handling
app.use((error, req, res, next) => {
  console.log('error', error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// Config values
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5499;

// MongoDB driver options
const mongoDBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB
mongoose
  .connect(MONGODB_URL, mongoDBOptions)
  .then((result) => {
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });
