import { Request, Response, NextFunction  } from 'express';

const app = require('express')(); // Importing express function

const port = 3000;

// Middleware function to log the timestamp of each request
app.use((req :Request , res : Response, next : NextFunction) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// Route handling
app.get('/', (req : Request, res :Res) => {
    res.send('Hello, Express with TypeScript!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
