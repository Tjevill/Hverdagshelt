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

// Dao's
const Hverdagsdao = require("../dao/hverdagsdao.js");
const eventdao = require("../dao/eventdao.js");
const Casedao = require("../dao/casesdao.js");
const Userdao = require("../dao/userdao.js");


const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql.stud.iie.ntnu.no",
  user: "mathibra",
  database: "mathibra",
  password: "QcxPTxcA",
  debug: false
});

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
  console.log("Received get-request on endpoint /getone"+req.params.id);
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

app.get("/eventOnDateAsc/:date", (req, res) =>{
  console.log("Received get-request on endpoint /eventOnDateAsc/"+req.params.date);
  eventDao.onDateAsc(req.params.date, (status, data) =>{
    res.status(status);
    res.json(data);
  });
});

app.get("/eventOnDateDesc/:date", (req, res) =>{
  console.log("Received get-request on endpoint /eventOnDateDesc/"+req.params.date);
  eventDao.onDateAsc(req.params.date, (status, data) =>{
    res.status(status);
    res.json(data);
  });
});

// End Events

// Cases

app.get("/allCases", (req, res) =>{
  console.log("Received get-request on endpoint /allCases");
  casedao.getAll((status, data) =>{
    res.status(status);
    res.json(data);
  });
});



const server = app.listen(process.env.PORT || "8080", function() {
  console.log("App listening on port %s", server.address().port);
  console.log("Press Ctrl+C to quit");
});
