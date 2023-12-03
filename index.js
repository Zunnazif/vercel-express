const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors")
require("dotenv").config()
const routerEmail = require("./router/routerEmail")
const routerEbook = require("./router/routerEbook")

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.use('/email', routerEmail);
app.use('/ebook', routerEbook)
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app