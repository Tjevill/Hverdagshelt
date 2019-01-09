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



const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql.stud.iie.ntnu.no",
  user: "mathibra",
  database: "mathibra",
  password: "QcxPTxcA",
  debug: false
});

// Dao's
const Hverdagsdao = require("../dao/hverdagsdao.js");
const eventdao = require("../dao/eventdao.js");
const Casedao = require("../dao/casesdao.js");
const Userdao = require("../dao/userdao.js");


let userdao = new Userdao(pool);
let eventDao = new eventdao(pool);
let hverdagsdao = new Hverdagsdao(pool);
let caseDao = new Casedao(pool);


app.get("/cases", (req, res) => {
	console.log("/cases fikk request.");
	hverdagsdao.getAllCases((status, data) => {
		res.status(status);
		res.json(data);
	});
});

/**
 * Gets all users from DB
 */
app.get('/user', (req: Request, res: Response) => {
	userdao.getAll((status, data) => {
		res.status(status);
		res.json(data);
	})
});

/**
 * Get one user from DB by id
 */
app.get('/user/:id', (req: Request, res: Response) => {
	userdao.getOneByID(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

/**
 * Updates user by id
 */
app.put('/user/:id', (req: Request, res: Response) => {
	userdao.updateUser(req.body, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

/**
 * Deletes user by id
 */
app.delete('/user/:id', (req: Request, res: Response) => {
	userdao.deleteUserByID(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

/**
 * Gets count of all users in DB
 */
app.get('/userCount', (req: Request, res: Response) => {
	userdao.getCountUsers((status, data) => {
		res.status(status);
		res.json(data);
	})
});

// Events
app.get("/events", (req, res) => {
  console.log("Received get-request on endpoint /events");
  eventDao.getAllEvents((status, data)=>{
    res.status(status);
    res.json(data);
  });
});

app.get("/getEvent/:id", (req, res) =>{
  console.log("Received get-request on endpoint /getEvent/"+req.params.id);
  eventDao.getOne(req.params.id, (status, data)=>{
    res.status(status);
    res.json(data);
  });
});

app.get("/eventSearch/:keyword", (req, res) =>{
  console.log("Received get-request on endpoint /eventSearch/"+req.params.keyword);
  eventDao.searchEvent(req.params.keyword, (status, data) =>{
    res.status(status);
    res.json(data);
  });
});

app.get("/eventOnDateAsc/:date", (req, res) => {
    console.log("Received get-request on endpoint /eventOnDateAsc/" + req.params.date);
    eventDao.onDateAsc(req.params.date, (status, data) => {
        console.log("/cases fikk request.");
        hverdagsDao.getAllCases((status, data) => {
            res.status(status);
            res.json(data);
        });
    });
});

    app.put("/newuser", (req, res) => {
        console.log("Fikk POST-request fra klienten");
        userdao.addUser(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });


    app.get("/user/:username", (req, res) => {
        console.log("/user fikk request: " + req.params.username);
        userdao.getUsername(req.params.username, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get("/eventOnDateDesc/:date", (req, res) => {
        console.log("Received get-request on endpoint /eventOnDateDesc/" + req.params.date);
        eventDao.onDateAsc(req.params.date, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.post("/createEvent", (req, res) => {
        console.log("Received post-request from client on endpoint /createEvent");
        eventDao.createEvent(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.delete("/deleteEvent/:event_id", (req, res) => {
        console.log("Received delete-request from client.");
        console.log("Trying to delete event with id: " + req.params.event_id);
        eventDao.deleteEvent(req.params.event_id, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.put("/updateEvent/:event_id", (req, res) => {
        console.log("received post-request from client");
        console.log("Trying to update event with id: " + req.params.event_id);
        eventDao.updateEvent(req.params.event_id, req.body, (status, data) => {
            res.status(status);
            res.json(data);
            console.log(req.body);
        });
    });

// End Events

// Cases

    app.get("/allCases", (req, res) => {
        console.log("Received get-request on endpoint /allCases");
        caseDao.getAllCases((status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get("/getCase/:id", (req, res) => {
        console.log("Received get-request on endpoint /getCase/" + req.params.id);
        caseDao.getOne(req.params.id, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get("/getOnZip/:zipcode", (req, res) => {
        console.log("Received get-request on endpoint /getOnZip/" + req.params.zipcode);
        caseDao.getOneZip(req.params.zipcode, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get("/getOnCategory/:category_id", (req, res) => {
        console.log("Received get-request on endpoint /getOnCategory/" + req.params.category_id);
        caseDao.getOneCategory(req.params.category_id, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });


    function loginOk(username, password) {

        var promise1 = new Promise(function (resolve, reject) {
            userdao.getUsername(username, (status, data) => {
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

        promiseObject.then(function (value) {
            if (value) {
                let token = jwt.sign({username: req.body.username}, privateKey, {
                    expiresIn: 10
                });
                res.json({jwt: token, reply: "Login successful! Enjoy your stay"});

                console.log("Brukernavn & passord ok, velkommen " + req.body.username);
            } else {
                console.log("Brukernavn & passord IKKE ok");
                res.status(401);
                res.json({reply: "Not authorized. Login or password incorrect."});
            }
        });
    });


    const server = app.listen(process.env.PORT || "8080", function () {
        console.log("App listening on port %s", server.address().port);
        console.log("Press Ctrl+C to quit");
    });
