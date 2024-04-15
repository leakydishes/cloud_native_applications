/*
- Aim:  Microservice handles incoming requests and arithmetic operations
        (addition, subtraction, multiplication, division) imported numbers (n1, n2)

- combined.log: Stores broader operational information
- error.log: Stores all errors
- Additional Arthmetic Operations: endpoints for exponentiation, square root, and modulo operations
- Error Handling: Improve error checks across all endpoints.
*/

const express = require("express");
const res = require("express/lib/response");
const app = express();
const fs = require('fs');
const winston = require('winston');

// Winston logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
        // - write all logs with importance level of 'error' or less to error.log'
        // - write all logs with importance level of 'info' or less to combined.log'
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
});

// Non Prod - log to 'console' with format:
// `${info.level}: ${info.message} JSON.stringify({ ... rest })`
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Helper functions operations
const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => {
    if (n2 === 0) throw new Error("Division by zero is not allowed"); // updated message
    return n1 / n2;
};
// created new operations
const exponentiate = (base, exponent) => Math.pow(base, exponent);
const sqrt = (value) => {
    if (value < 0) throw new Error("Square root of negative number is not allowed");
    return Math.sqrt(value);
};
const modulo = (n1, n2) => {
    if (n2 === 0) throw new Error("Modulo by zero is not allowed");
    return n1 % n2;
};

// Logger validation
const validateInput = (n1, n2) => {
    if (isNaN(n1) || isNaN(n2)) {
        logger.error("Invalid input numbers, must be valid numbers");
        throw new Error("Invalid input numbers, must be valid numbers");
    }
}

// Endpoints
// /add
app.get("/add", ( req, res )=>{
    try{
        const n1= parseFloat( req.query.n1 );
        const n2= parseFloat( req.query.n2 );
        if(isNaN( n1 )) {
            logger.error("n1 is incorectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN( n2 )) {
            logger.error("n2 is incorreclty defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters '+n1+' and '+n2+' received for addition');
        const result = add( n1,n2 );
        res.status( 200 ).json({ statuscode:200, data: result });
    } catch( error ) {
        console.error( error )
        res.status( 500 ).json({statuscode:500, msg: error.toString()})
    }
});


// /subtract
app.get("/subtract", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("n1 or n2 is incorrectly defined for subtraction");
            throw new Error("Invalid input numbers, must be valid numbers");
        }

        logger.info(`Subtraction parameters received: ${n1} and ${n2}`);
        const result = subtract(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statuscode: 500, message: error.toString() });
    }
});


// /multiply
// Multiplication endpoint
app.get("/multiply", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("n1 or n2 is incorrectly defined for multiplication");
            throw new Error("Invalid input numbers, must be valid numbers");
        }

        logger.info(`Multiplication parameters received: ${n1} and ${n2}`);
        const result = multiply(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statuscode: 500, message: error.toString() });
    }
});


// /divide
app.get("/divide", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("n1 or n2 is incorrectly defined for division");
            throw new Error("Invalid input numbers, must be valid numbers");
        }
        if (n2 === 0) {
            logger.error("Attempt to divide by zero");
            throw new Error("Division by zero is not allowed");
        }

        logger.info(`Division parameters received: ${n1} and ${n2}`);
        const result = divide(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statuscode: 500, message: error.toString() });
    }
});


// Updated endpoints
// /exponentiate
app.get("/exponentiate", (req, res) => {
    try {
        const base = parseFloat(req.query.base);
        const exponent = parseFloat(req.query.exponent);
        validateInput(base, exponent); // Uses new Validate input method
        const result = exponentiate(base, exponent);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statuscode: 500, message: error.toString() });
    }
});

// /sqrt
app.get("/sqrt", (req, res) => {
    try {
        const value = parseFloat(req.query.value);
        if (isNaN(value)) {
            logger.error("Input value is incorrectly defined for square root");
            throw new Error("Input value is incorrectly defined");
        }

        logger.info(`Square root parameter received: ${value}`);
        const result = sqrt(value);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statuscode: 500, message: error.toString() });
    }
});

// /modulo
app.get("/modulo", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        validateInput(n1, n2); // Uses new Validate input method
        if (n2 === 0) {
            logger.error("Attempt to modulo by zero");
            throw new Error("Modulo by zero is not allowed");
        }
        const result = modulo(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statuscode: 500, message: error.toString() });
    }
});

// Start Server
const port = 3040;
app.listen( port, ()=> {
    console.log("hello I'm listenting to post: " + port);
})

// Run url tests
// /addition
// http://localhost:3040/add?n1=674&n2=7867
// http://localhost:3040/add?n1=500&n2=200
// http://localhost:3040/add?n1=-10&n2=-20
// http://localhost:3040/add?n1=123.45&n2=678.90
// http://localhost:3040/add?n1=text&n2=100

// /subtraction
// http://localhost:3040/subtract?n1=200&n2=100
// http://localhost:3040/subtract?n1=0&n2=0
// http://localhost:3040/subtract?n1=1000.50&n2=500.25
// http://localhost:3040/subtract?n1=text&n2=100
// http://localhost:3040/subtract?n1=text&n2=100

// /division
// http://localhost:3040/divide?n1=50&n2=2
// http://localhost:3040/divide?n1=7.5&n2=0.5
// http://localhost:3040/divide?n1=7.5&n2=0.5
// http://localhost:3040/divide?n1=10&n2=0

// /multiply
// http://localhost:3040/multiply?n1=6&n2=7
// http://localhost:3040/multiply?n1=5&n2=2
// http://localhost:3040/multiply?n1=2.5&n2=4.4
// http://localhost:3040/multiply?n1=text&n2=100

// /exponentiate
// http://localhost:3040/exponentiate?base=2&exponent=3
// http://localhost:3040/exponentiate?base=2&exponent=6
// http://localhost:3040/exponentiate?base=5&exponent=0
// http://localhost:3040/exponentiate?base=text&exponent=2

// /sqrt
// http://localhost:3040/sqrt?value=16
// http://localhost:3040/sqrt?value=20
// http://localhost:3040/sqrt?value=text

// /modulo
// http://localhost:3040/modulo?n1=10&n2=3
// http://localhost:3040/modulo?n1=10&n2=3
// http://localhost:3040/modulo?n1=-10&n2=45
// http://localhost:3040/modulo?n1=text&n2=5

// Test new Validation method
// http://localhost:3040/exponentiate?base=5&exponent=3
// http://localhost:3040/exponentiate?base=5&exponent=text
// http://localhost:3040/modulo?n1=13&n2=5
// http://localhost:3040/modulo?n1=text&n2=5

// run app in terminal
// node calculatorwithlogger.js