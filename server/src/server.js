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
const HverdagsDao = require("../dao/hverdagsdao.js");
const UserDao = require("../dao/userdao.js");

let privateKey = ("asecretprivatekeytorulethemallforgedinthemountainsoffordbord");


'use strict';
var crypto = require('crypto');

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};



var pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql.stud.iie.ntnu.no",
  user: "mathibra",
  database: "mathibra",
  password: "QcxPTxcA",
  debug: false
});

let hverdagsDao = new HverdagsDao(pool);

app.get("/cases", (req, res) => {
  console.log("/cases fikk request.");
  hverdagsDao.getAllCases((status, data) => {
    res.status(status);
    res.json(data);
  });
});

let userDao = new UserDao(pool);

app.put("/newuser", (req, res) => {
  console.log("Fikk POST-request fra klienten");
  userDao.addUser(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});


app.get("/user/:username", (req, res) => {
  console.log("/user fikk request: " + req.params.username);
  userDao.getUsername(req.params.username, (status, data) => {
    res.status(status);
    res.json(data);
  });
});


function loginOk(username, password) {

  var promise1 = new Promise(function(resolve, reject) {
              userDao.getUsername(username, (status, data) => {
                console.log("data: " + data); 
                const lagretPass = data[0].password;
                const passwordData = sha512(password, data[0].secret);
                // console.log(lagretPass.localeCompare(passwordData.passwordHash));

                        if (passwordData.passwordHash == lagretPass) {
                          resolve(true);
                        } else {
                          resolve(false);
                        }
              });
  })
  return promise1;
}



app.post("/login", (req, res) => {


// console.log("LoginOK? : " + (loginOk(req.body.username, req.body.password)));
var promiseObject = loginOk(req.body.username, req.body.password);
console.log("promiseobject: " + promiseObject);

promiseObject.then(function(value) {
  if (value) {
    let token = jwt.sign({ username: req.body.username }, privateKey, {
      expiresIn: 10
    });
    res.json({ jwt: token, reply: "Login successful! Enjoy your stay" });

    console.log("Brukernavn & passord ok, velkommen " + req.body.username);
  } else {
    console.log("Brukernavn & passord IKKE ok");
    res.status(401);
    res.json({ reply: "Not authorized. Login or password incorrect." });
  }
  });
});

var server = app.listen(process.env.PORT || "8080", function() {
  console.log("App listening on port %s", server.address().port);
  console.log("Press Ctrl+C to quit");
});
