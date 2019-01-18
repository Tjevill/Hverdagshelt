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
        "http://hverdagshelt.herokuapp.com"
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
const crypto = require('crypto');

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
    user: "mariteil",
    database: "mariteil",
    password: "Fs7ABKyd",
    debug: false
});

// Dao's
const Hverdagsdao = require("../dao/hverdagsdao.js");
const eventdao = require("../dao/eventdao.js");
const Casedao = require("../dao/casesdao.js");
const Userdao = require("../dao/userdao.js");
const Orgdao = require("../dao/orgdao.js");
const Categorydao = require("../dao/categorydao.js");
const Empdao = require("../dao/employeedao.js");
const Statusdao = require("../dao/statusdao.js");
const GeoDao = require("../dao/geodao.js");

const Employeedao = require("../dao/employeedao.js");




// Authentication with bedrehverdagshelt@gmail.com
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bedrehverdagshelt@gmail.com',
        pass: 'JegErDinHelt69'
    }
});

let userdao = new Userdao(pool);
let eventDao = new eventdao(pool);
let hverdagsdao = new Hverdagsdao(pool);
let caseDao = new Casedao(pool);
let employeeDao = new Employeedao(pool);
let orgDao = new Orgdao(pool);
let categoryDao = new Categorydao(pool);
let empDao = new Empdao(pool);
let statusDao = new Statusdao(pool);
let geodao = new GeoDao(pool);


/** Send password reset link   */
/* uncomplete
app.get("/forgotPassword", (req, res) => {
	console.log("/forgotPassword fikk request.");
	if ( req.body.email == '') {
        res.json('E-post feltet må fylles ut')
    }
    console.log('forgotten password request for ' + req.body.email);
    userdao.findUserByEmail(req.params.email, (req,res)=>{
        res.status(status);
        res.json(data);
    });

    if(data.body == null) {
        console.log('Email does not exist in database');
        res.json('Email does not exist in database');

    } else {
        const 
    } 
}); */




app.put("/newuser", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    userdao.addUser(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.put("/newemployee", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    employeeDao.addEmployee(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.put("/neworganization", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    employeeDao.addOrganization(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/neworgcat/:id", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    employeeDao.addManyRefrences(req.body, req.params.id, (status, data) => {
        res.status(status);
        //  res.json(data);
    });
});


app.get("/cases", (req, res) => {
    console.log("/cases fikk request.");
    hverdagsdao.getAllCases((status, data) => {
        res.status(status);
        res.json(data);
    });
});

/**
 * Gets all districts from DB
 */
app.get('/getdistricts', (req: Request, res: Response) => {
    userdao.getAllDistricts((status, data) => {
        res.status(status);
        res.json(data);
    })
});


/**
 * Gets all provinces from specific district from DB
 */
app.get('/getdistricts/:id', (req: Request, res: Response) => {
    userdao.getProvincesFromFylke(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
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

/**
 * Gets email from user by ID
 */
app.get('/userEmail/:id', (req: Request, res: Response) => {
    userdao.getEmailUserByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * For updating subscription for one user
 */
app.put('/userSubscriptionUpdate', (req: Request, res: Response) => {
    userdao.updateSubription(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * For updating users password. Send object with user_id and new password
 */
app.put('/updateUserPWord', (req: Request, res: Response) => {
    userdao.updateUserPassword(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get province from User by users ID
 */
app.get('/userProvince/:id', (req: Request, res: Response) => {
    userdao.getUsersProvinceByUserID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

// Organization

/**
 * Get all organisations from DB
 */
app.get("/org", (req: Request, res: Response) =>{
    orgDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get one org by ID
 */
app.get('/org/:id', (req: Request, res: Response) => {
    orgDao.getOneByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Update org by ID (does not include password update)
 */
app.put('/org/:id', (req: Request, res: Response) => {
    orgDao.updateOrg(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Update org password by ID send object including new password and org_id
 */
app.put('/updateOrgPWord', (req: Request, res: Response) => {
    orgDao.updateOrgPassword(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Delete one org by ID
 */
app.delete('/org/:id', (req: Request, res: Response) => {
    orgDao.deleteOrgByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Add new organization
 */
app.post("/newOrg", (req, res) => {
    orgDao.addOrg(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

/**
 * Get count of all organizations from DB
 */
app.get('/orgCount', (req: Request, res: Response) => {
    orgDao.getCountOrg((status, data) => {
        res.status(status);
        res.json(data);
    })
});

// Category
/**
 * Get all categories from DB
 */
app.get("/category", (req: Request, res: Response) =>{
    categoryDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get one category by ID
 */
app.get("/category/:id", (req: Request, res: Response) =>{
    categoryDao.getOneByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Update category
 */
app.put('/category/:id', (req: Request, res: Response) => {
    categoryDao.updateCategory(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Deletes one category by ID
 */
app.delete('/category/:id', (req: Request, res: Response) => {
    categoryDao.deleteCategoryByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get count of categories in DB
 */
app.get('/categoryCount', (req: Request, res: Response) => {
    categoryDao.getCountCategories((status, data) => {
        res.status(status);
        res.json(data);
    })
});


// End user



// Employee

/** Get all employees from the db */
app.get("/employee", (req, res) => {
    console.log("Received get-request on endpoint /employee.");
    empDao.getAllEmp( (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Get one employee matched on employee_id */
app.get("/employee/:employee_id", (req, res) =>{
    console.log("Received get-request on endpoint /employee/"+req.params.employee_id);
    empDao.getOne(req.params.employee_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Get all employees in one province */
app.get("/employee/province/:province_id", (req, res) =>{
    console.log("Received get-request on endpoint /employee/"+req.params.province_id);
    empDao.getAllEmpProvince(req.params.province_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/**  Create an employee in the db*/
app.put("/employee", (req, res) =>{
    console.log("Received put-request on endpoint /employee");
    empDao.addEmployee(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

/** Delete an employee in the db on employee_id */
app.delete("/employee/:employee_id", (req, res) =>{
    console.log("Received delete-request on endpoint /employee/"+req.employee_id);
    empDao.deleteEmpById(req.params.employee_id, (status, data)=>{
        res.status(status);
        res.json(data);
    });
});

/** Update an employee in db on employee_id. Does NOT include password change. */
app.put("/employee/:employee_id", (req: Request, res: Response) =>{
    console.log("Received put-request on endpoint /employee/"+req.params.employee_id);
    console.log("body & soul "+req.body.email);
    empDao.updateEmp(req.body, req.params.employee_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Update an employee password in the db on employee_id */
app.put("/updateEmpPW", (req: Request, res: Response) =>{
    console.log("Received post-request on endpoint /updateEmpPw");
    empDao.updateEmpPassword(req.body, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Count every employee in the db */
app.get("/countEmp", (req: Request, res: Response) =>{
    console.log("Received get-request on endpoint /countEmp");
    empDao.countEmps( (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/**  Count every employee in a specific province*/
app.get("/countEmp/:province", (req: Request, res: Response) =>{
    console.log("Received get-request on endpoint /countEmp/"+req.params.province);
    empDao.countEmpsProvince(req.params.province, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

app.get("/getCasesOnCommuneID/:id", (req, res) => {
	empDao.getCasesOnCommuneID(req.params.id, (status, data) => {
		console.log(req.params.id);
		res.status(status);
		res.json(data);
	});
});

// End employee




// Events

/** Get all events */
app.get("/events", (req, res) => {
    console.log("Received get-request on endpoint /events");
    eventDao.getAllEvents((status, data)=>{
        res.status(status);
        res.json(data);
    });
});

/** Get one event on event_id */
app.get("/getEvent/:id", (req, res) =>{
    console.log("Received get-request on endpoint /getEvent/"+req.params.id);
    eventDao.getOne(req.params.id, (status, data)=>{
        res.status(status);
        res.json(data);
    });
});

/** Search for event on description */
app.get("/eventSearch/:keyword", (req, res) =>{
    console.log("Received get-request on endpoint /eventSearch/"+req.params.keyword);
    eventDao.searchEvent(req.params.keyword, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Search for event on date ascending */
app.get("/eventOnDateAsc/:date", (req, res) => {
    console.log("Received get-request on endpoint /eventOnDateAsc/" + req.params.date);
    eventDao.onDateAsc(req.params.date, (status, data) => {
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

/**  */
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

/** Get all cases */
app.get("/allCases", (req, res) => {
    console.log("Received get-request on endpoint /allCases");
    caseDao.getAllCases((status, data) => {
        res.status(status);
        res.json(data);
    });
});
/*
app.put("/changeCaseStatus/:id", (req, res) => {
    caseDao.updateCaseStatus(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});
*/

app.put("/updateCaseStatusToDeleted/:id", (req, res) => {
	caseDao.updateCaseStatusToDeleted(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
	})
}); 
/** Get every case with status_id = 1. */
app.get("/allCases/status/:status_id", (req, res) =>{
    console.log("Received get-request on endpoint /allCases/status/"+req.params.status_id);
    caseDao.getStatus(req.params.status_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Get the province of every case*/
app.get("/allCases/:province", (req, res) =>{
    console.log("Received get-request on endpoint /allCases/"+req.params.province);
    caseDao.getProvinceOnCase( req.params.province, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Count all cases in db */
app.get("/countCases", (req, res) =>{
    console.log("Received get-request on endpoint /countCases");
    caseDao.getNumberOfCases( (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Get case by id */
app.get("/getCase/:id", (req, res) => {
    console.log("Received get-request on endpoint /getCase/" + req.params.id);
    caseDao.getOne(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

/** Get case on user id */
app.get("/getCaseUserId/:user_id", (req, res) =>{
    console.log("Received get-request on endpoint /getCaseUserId/"+req.params.user_id);
    caseDao.getCaseOnUser(req.params.user_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
})

/** get case on zip */
app.get("/getOnZip/:zipcode", (req, res) => {
    console.log("Received get-request on endpoint /getOnZip/" + req.params.zipcode);
    caseDao.getOneZip(req.params.zipcode, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

/** get case on category_id */
app.get("/getOnCategory/:category_id", (req, res) => {
    console.log("Received get-request on endpoint /getOnCategory/" + req.params.category_id);
    caseDao.getOneCategory(req.params.category_id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


/** get all categories  */

app.get("/getAllCategories", (req, res) => {
    console.log("Received get-request on endpoint /getAllCategories");
    employeeDao.getAllCategories((status, data) => {
        res.status(status);
        res.json(data);
    });
});


/** update case on case_id */
/*app.put("/updateCase/:case_id", (req, res) =>{
    console.log("Received delete-request from client.");
    console.log("Trying to update case with id: "+req.params.case_id);
    caseDao.updateCase(req.params.case_id, req.body, (status, data) =>{
        res.status(status);
        res.json(data);
        console.log(req.body);
    });

    let email = req.body.email;
    const mailOptionsUpdateCase = {
        from: 'bedrehverdagshelt@gmail.com',
        to: email,
        subject: 'Saken er oppdatert!',
        html:
            '<h1> Status: ' + req.body.status_id + '</h1>' +
            '<p><b> HverdagsHelt Support Team </b></p>' +
            '<a href="mailto:bedrehverdagshelt@gmail.com" style="color: rgb(71, 124, 204); text-decoration: none; display: inline;">bedrehverdagshelt@gmail.com</a>' +
            '<p> <b> HverdagsHelt AS </b> </p>' +
            '<p> 72 59 50 00 </p>'
    };

    transporter.sendMail(mailOptionsUpdateCase, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}); */


/** update case on case_id */
app.put("/updateCase/:case_id", (req, res) =>{
      console.log("Received put-request from client.");
        console.log("Trying to update case with id: "+req.params.case_id);
   caseDao.updateCase(req.body, (status, data) =>{
            if (!(req.body instanceof Object)) return res.sendStatus(400);
            res.status(status);
            res.json(data);
            console.log(req.body);
        });
    });



/** search case by category description */
app.get("/searchCaseCategory/:description", (req, res) =>{
    console.log("Received get-request from client.");
    caseDao.searchCaseCategory(req.params.description, (status, data)=>{
        res.status(status);
        res.json(data);
    });
});

/** search case by description */
app.get("/searchCaseDesc/:description",(req, res) =>{
    console.log("Received get-request from client.");
    caseDao.searchCaseDescription(req.params.description, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** delete case by case_id */
app.delete("/deleteCase/:case_id", (req, res) =>{
    console.log("Received delete-request from client.");
    console.log("Trying to delete event with id: "+req.params.case_id);
    caseDao.deleteCase(req.params.case_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** create case on user side  */
app.post("/createUserCase", (req, res) => {
    console.log("Received post-request from client on endpoint /createEvent");
    caseDao.createUserCase(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});



/** create case and send confirmation mail */
app.post("/cases", (req, res) => {
    console.log("/cases received POST-request");
    console.log(req.body.description);

    if(!req.body) {
        return res.sendStatus(400);
    } else {
        caseDao.create({
                headline: req.body.headline,
                description: req.body.description,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                zipcode: req.body.zipcode,
                user_id: req.body.user_id,
                category_id: req.body.category_id,
                picture: req.body.picture,
                email: req.body.email
            },
            (status, data) => {
                res.status(status);
                res.json(data);
                console.log("json.data:" + data[0]);
            });
    }
    // mail
    let sub = req.body.headline;
    let des = req.body.description;
    let email = req.body.email;
    const mailOptionsCreateCase = {
        from: 'bedrehverdagshelt@gmail.com',
        to: email,
        subject: 'Takk for din henvendelse, saken er registert!',
        html: '<h1>'+ sub + '</h1><p> ' + des + '</p>'
    };

    transporter.sendMail(mailOptionsCreateCase, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

/**
 * For organizations to update comment and status of a case they are registered as working on
 */
app.put("/updateStatusAndComment/:id", (req, res) => {
	caseDao.updateCommentAndStatusOrg(req.params.id, req.body, (status, data) => {
    console.log(req.params.id);
		res.status(status);
		res.json(data);
	});
});



// End Cases

// GEO (Place, kommune, fylke)
app.get("/getCommunes", (req, res) => {
	geodao.getAllCommunes((status, data) => {
		res.status(status);
		res.json(data);
	});
});



// Login

/**
 * Verifies old password for user.
 */
app.post('/userVerification', (req: Request, res: Response) => {
    console.log("app.get(/userverification):::::" + req.body.user_id + "----------" + req.body.oldPassword);

    let dbHash;
    userdao.getHashedPWord(req.body.user_id, (status, data) => {
        console.log(data[0].password + " DATABASE!******************************");
        let savedPassword = data[0].password;
        let passwordData = sha512(req.body.oldPassword, data[0].secret);
        console.log(passwordData.passwordHash, "NEW***********************");
        dbHash = passwordData.passwordHash === savedPassword;
        console.log(dbHash, " FRA VERIFY FALSE TRUE");

        if (dbHash) {
            console.log("STATUS: ", "200");
            res.status(200).json(1);
        } else {
            console.log("STATUS: ", "500");
            res.status(500).json("Wrong password. Try again");
        }

    });

});
/**
 * Verifies old password for employee.
 */
app.post('/employeeVerification', (req: Request, res: Response) => {

    let dbHash;
    empDao.getHashedPWord(req.body.employee_id, (status, data) => {
        console.log(data[0].password + " DATABASE!******************************");
        let savedPassword = data[0].password;
        let passwordData = sha512(req.body.oldPassword, data[0].secret);
        console.log(passwordData.passwordHash, "NEW***********************");
        dbHash = passwordData.passwordHash === savedPassword;
        console.log(dbHash, " FRA VERIFY FALSE TRUE");

        if (dbHash) {
            console.log("STATUS: ", "200");
            res.status(200).json(1);
        } else {
            console.log("STATUS: ", "500");
            res.status(500).json("Wrong password. Try again");
        }

    });

});
/**
 * Verifies old password for organization.
 */
app.post('/organizationVerification', (req: Request, res: Response) => {

    let dbHash;
    orgDao.getHashedPWord(req.body.org_id, (status, data) => {
        console.log(data[0].password + " DATABASE!******************************");
        let savedPassword = data[0].password;
        let passwordData = sha512(req.body.oldPassword, data[0].secret);
        console.log(passwordData.passwordHash, "NEW***********************");
        dbHash = passwordData.passwordHash === savedPassword;
        console.log(dbHash, " FRA VERIFY FALSE TRUE");

        if (dbHash) {
            console.log("STATUS: ", "200");
            res.status(200).json(1);
        } else {
            console.log("STATUS: ", "500");
            res.status(500).json("Wrong password. Try again");
        }

    });

});



app.post("/loginhh", (req, res) => {

    let promise1 = new Promise(function (resolve, reject) {
        userdao.getUserByEmail(req.body.email1, (status, data) => {

            if (data[0] != undefined) {

                console.log("data email: " + data[0].password);

                const lagretPass = data[0].password;
                const passwordData = sha512(req.body.password1, data[0].secret);
                // console.log(lagretPass.localeCompare(passwordData.passwordHash));

                if (passwordData.passwordHash == lagretPass) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else { resolve(false); }

        });
    })

    promise1.then(function (value) {
        if (value) {
            userdao.getUserByEmail(req.body.email1, (status, data) => {
                console.log("STATUS: ", status);
                let token = jwt.sign({email: req.body.email1}, privateKey, { expiresIn: 60000 });
                res.json({jwt: token, reply: "Success", email: data[0].email, username: data[0].username, user_id: data[0].user_id, name: data[0].name});
                console.log("Brukernavn & passord ok, velkommen " + req.body.email1);
            });

        } else {

            console.log("Brukernavn & passord IKKE ok");
            res.json({reply: "Brukernavn eller passord er ikke riktig"});
            res.status(401);

        }
    });
});


app.post("/logink", (req, res) => {

    let promise1 = new Promise(function (resolve, reject) {
        employeeDao.getEmployeeByEmail(req.body.email3, (status, data) => {

            if (data[0] != undefined) {


                console.log("data email: " + req.body.email3);
                const lagretPass = data[0].password;
                const passwordData = sha512(req.body.password3, data[0].secret);
                // console.log(lagretPass.localeCompare(passwordData.passwordHash));

                if (passwordData.passwordHash == lagretPass) {
                    resolve(true);
                } else {
                    resolve(false);
                }} else { resolve(false); }
        });
    })

    promise1.then(function (value) {
        if (value) {
            employeeDao.getEmployeeByEmail(req.body.email3, (status, data) => {

                let token = jwt.sign({email: req.body.email3}, privateKey, { expiresIn: 60000 });
                res.json({jwt: token, reply: "Success", email: data[0].email, username: data[0].username, user_id: data[0].employee_id, name: data[0].name, commune: data[0].commune, superuser: data[0].superuser});
                console.log("Brukernavn & passord ok, velkommen " + req.body.email3);
            });

        } else {
            console.log("Brukernavn & passord IKKE ok");
            res.json({reply: "Not authorized. Login or password incorrect."});
            res.status(401);

        }
    });
});



app.post("/loginb", (req, res) => {

    let promise1 = new Promise(function (resolve, reject) {
        employeeDao.getBedriftByEmail(req.body.email2, (status, data) => {
            if (data[0] != undefined) {


                console.log("data email: " + req.body.email2);
                const lagretPass = data[0].password;
                const passwordData = sha512(req.body.password2, data[0].secret);
                console.log(lagretPass.localeCompare(passwordData.passwordHash));

                if (passwordData.passwordHash == lagretPass) {
                    resolve(true);
                } else {
                    resolve(false);
                }} else { resolve(false); }
        });
    })

    promise1.then(function (value) {
        if (value) {
            employeeDao.getBedriftByEmail(req.body.email2, (status, data) => {

                let token = jwt.sign({email: req.body.email2}, privateKey, { expiresIn: 60000 });
                res.json({jwt: token, reply: "Success", email: data[0].email, username: data[0].username, user_id: data[0].user_id, name: data[0].name});
                console.log("Brukernavn & passord ok, velkommen " + req.body.email2);
            });

        } else {
            console.log("Brukernavn & passord IKKE ok");
            res.json({reply: "Not authorized. Login or password incorrect."});
            res.status(401);

        }
    });
});




// REFRESHING TOKEN
app.use("/refreshtoken", (req, res) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok, så du får    ikke refreshet");
            res.status(401);
            res.json({ error: "No old token detected, no refresh for you!" });
        } else {
            let token = jwt.sign({ email: req.body.email }, privateKey, {
                expiresIn: 60000
            });
            res.json({ jwt: token });
        }
    });
});

// PASSWORD PROTECTED AREA!! DONT PUT ANYTHING OUTSIDE OF /admin AND
// DONT PUT ANYTHING THAT SHOULD BE PASSWORD PROTECTED


app.use("/admin", (req, res, next) => {
    var token = req.headers["x-access-token"];
    console.log("/admin : req.headers: ", req.headers["x-access-token"]);
    console.log("/admin : req.headers: ", req.headers);
    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else {
            console.log("Token ok: " + decoded.brukernavn);
            next();
        }
    });
});

app.post("/admin/legginn", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    artikkelDao.addArtikkel(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/admin/edit/:id", (req, res) => {
    console.log("Fikk PUT-request fra klienten: " + res.params);
    artikkelDao.editArtikkel(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/admin/delete/:id", (req, res) => {
    console.log("/admin/delete/:id fikk request: " + req.params.id);
    artikkelDao.delArtikkel(req.params.id, (status, data) => {
        res.status(status);
        res.json(data[0]);
    });
});

/** Get all status */
app.get("/status", (req, res) => {
    console.log("Received get-request on endpoint /allCases");
    statusDao.getAllStatuses((status, data) => {
        res.status(status);
        res.json(data);
    });
});

/** Get status by ID */
app.get("/status/:id", (req, res) => {
    console.log("Received get-request on endpoint /allCases");
    statusDao.getOneById( req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});




const server = app.listen(process.env.PORT || "8080", function () {
    console.log("App listening on port %s", server.address().port);
    console.log("Press Ctrl+C to quit");
});
