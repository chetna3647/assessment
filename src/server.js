const express = require("express");
const app = express();
const apiRouter = require("./api/routes/api");
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTION');

    next();
});

const port = process.env.APP_PORT;
const appUrl = process.env.APP_URL;

app.get('/', (req, res) => {
    res.json({ message: "please add /api/v1 in url" });
});

app.use(`${appUrl}`, apiRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
});