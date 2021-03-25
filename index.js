require('dotenv').config({ path: __dirname + process.argv[2] });

//const cors = require('cors');
const express = require("express");
const app = express();
//app.use(cors());
//const db = require(__dirname + "/./src/database/database")
//const router = require(__dirname + "/./routes/routes")
const bodyParser = require("body-parser");
//require('./src/utils/logger')
//const cache = require('./src/cache/cache')


async function initialize(){
    await db.initialize();
    
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

    app.use("", router);
    app.listen(process.env['PORT'])
}

initialize()

module.exports = {
    initialize
}
