const express = require('express');
const cors = require('cors');
const expenseRouter = require('./src/routes/expense.route');
const PORT = process.env.PORT || 8000;
const {connectDB} = require('./src/database/db')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDocs = require('swagger-jsdoc');


const app = express();

const swaggerOptions = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Expense Tracker',
        version: '1.0.0',
      },
    },
    apis: ['./src/routes/*.js'],
  };

const swaggerDocument = swaggerJsDocs(swaggerOptions)
app.use(express.json())
app.use(cors());
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.use('/api/expenses',expenseRouter);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})