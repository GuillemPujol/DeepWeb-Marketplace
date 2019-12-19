/**** External libraries ****/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('mongodb');
const checkJWT = require('express-jwt');

/**** Configuration ****/
const appName = "Used Book Marketplace";
const port = (process.env.PORT || 8080);
const app = express();
const buildPath = path.join(__dirname, '..', 'client', 'build');
const MONGO_URL = process.env.MONGO_URL || "";

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all http requests to the console
app.use(express.static(buildPath)); // Serve React from build directory

app.use((req, res, next) => {
    // Additional headers for the response to avoid trigger CORS security errors in the browser
    // Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // Intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      // Always respond with 200
      console.log("Allowing OPTIONS");
      res.send(200);
    } else {
      next();
    }
});

/*** OPEN Paths ***/
let openPaths = [
    { url: '/api/users/authenticate', methods: ['POST'] },
    // Users not logged in can still see the categories
    { url: '/api/categories', methods: ['GET'] }
];

/*** Authentication and validation ***/
const secret = "the cake is a lie";

app.use(checkJWT({ secret: secret }).unless({ path : openPaths }));
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { // Check if authorized or not
        res.status(401).json({ error: err.message });
    } else {
        next(); // If no errors, send request to next middleware or route handler
    }
});

/*** DB mongoose layers ***/
const userDal = require("./userDal")(mongoose);
const categoryDal = require("./categoryDal")(mongoose);

/*** Start ***/
mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Database connected");
        await userDal.bootstrapTestusers();
        await categoryDal.bootstrap();

        /**** Routes ****/
        const usersRouter = require("./router/userRouter")(userDal, secret);
        app.use("/api/users", usersRouter);

        const categoryRouter = require("./router/categoriesRouter")(categoryDal);
        app.use("/api/categories", categoryRouter);

        // "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html)
        // It's important to specify this route as the very last one to prevent overriding all of the other routes
        app.get("*", (req, res) =>
            res.sendFile(path.resolve("..", "client", "build", "index.html"))
        );

        // When DB connection is ready, let's open the API
        await app.listen(PORT);
        console.log(`QA API running on port ${PORT}!`);
    })
    .catch(error => {
        console.error(error);
    });