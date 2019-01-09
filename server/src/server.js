// @flow
/* eslint eqeqeq: "off" */
const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require('nodemailer');
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

// Authentication with bedrehverdagshelt@gmail.com
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bedrehverdagshelt@gmail.com',
    pass: 'JegErDinHelt69'
  }
});

let hverdagsdao = new Hverdagsdao(pool);

/*
REST-Architecture:
/cases
POST: Create new case
GET: get all cases


*/

app.get("/cases", (req, res) => {
  console.log("/cases fikk request.");
  hverdagsdao.getAllCases((status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.post("/cases", (req: Object, res: Response) => {
  console.log("/cases fikk POST request");

  if(!req.body) {
    return res.sendStatus(400);
  }else {
    hverdagsdao.createCase({
    description: req.body.description,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    status_id: req.body.status_id,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
    zipcode: req.body.zipcode
    }
    ,(status, data) => {
    res.status(status); 
    res.json(data);
    

  });


  transporter.sendMail(mailOptionsCase, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}});


const server = app.listen(process.env.PORT || "8080", function() {
  console.log("App listening on port %s", server.address().port);
  console.log("Press Ctrl+C to quit");
});
