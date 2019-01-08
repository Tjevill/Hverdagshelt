// @flow
/* eslint eqeqeq: "off" */
var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json()); // for å tolke JSON
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "http://kalvskinnet-api.herokuapp.com"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
const ArtikkelDao = require("../dao/hverdagsdao.js");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql.stud.iie.ntnu.no",
  user: "mathibra",
  database: "mathibra",
  password: "QcxPTxcA",
  debug: false
});

let artikkelDao = new ArtikkelDao(pool);

app.get("/cases", (req, res) => {
  console.log("/cases fikk request.");
  artikkelDao.getAllCases((status, data) => {
    res.status(status);
    res.json(data);
  });
});


var server = app.listen(process.env.PORT || "8080", function() {
  console.log("App listening on port %s", server.address().port);
  console.log("Press Ctrl+C to quit");
});
