const express = require('express');
const cors = require('cors');
const expenseRouter = require('./src/routes/expense.route');
const authRouter = require('./src/routes/auth.route');
const PORT = process.env.PORT || 8000;
const {connectDB} = require('./src/database/db')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDocs = require('swagger-jsdoc');
const authValidation = require('./src/middleware/auth.middleware');


//const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.2/swagger-ui.min.css"

const swaggerOptions = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expense Tracker',
            version: '1.0.0',
            description:'An API for tracking expenses.Users can view,create,update and delete their  records.',
        },
        components: { 
            securitySchemes: { 
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.js'], // Path to your API docs
};


const swaggerDocument = swaggerJsDocs(swaggerOptions)

const app = express();

app.use(express.json())
app.use(cors());

app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerDocument));
app.use('/api/auth',authRouter);
app.use('/api/expenses',authValidation,expenseRouter);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})