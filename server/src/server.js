// @flow
/* eslint eqeqeq: "off" */
const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
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
const Hverdagsdao = require("../dao/hverdagsdao.js");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql.stud.iie.ntnu.no",
  user: "mathibra",
  database: "mathibra",
  password: "QcxPTxcA",
  debug: false
});

let artikkelDao = new Hverdagsdao(pool);

app.get("/cases", (req, res) => {
  console.log("/cases fikk request.");
  artikkelDao.getAllCases((status, data) => {
    res.status(status);
    res.json(data);
  });
});


const server = app.listen(process.env.PORT || "8080", function() {
  console.log("App listening on port %s", server.address().port);
  console.log("Press Ctrl+C to quit");
});
