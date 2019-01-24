// @flow

let mysql = require('mysql');
jest.setTimeout(50000);
const config = require('../../config.js');


const EmplDao = require("../dao/employeedao.js");
const runsqlfile = require('./runsqlfile.js');

const host = config.testdb.host;
const user = config.testdb.user;
const database = config.testdb.database;
const password = config.testdb.password;

// GitLab CI Pool
let pool = mysql.createPool({
	connectionLimit: 1,
	host: host,
	user: user,
	password: password,
	database: database,
	debug: false,
	multipleStatements: true
});

let empDao = new EmplDao(pool);

beforeAll(done => {
    runsqlfile('dao/tests/create_tables.sql', pool, () =>{
        runsqlfile('dao/tests/create_testdata.sql', pool, done);
    });
});

afterAll(done => {
	runsqlfile('dao/tests/delete_testdata.sql', pool, done);
});


/** Get all employees in the db */
test('getAllEmployees from db', done =>{
    
    function callback(status, data) {
        console.log('Test callback: status = '+status + ', data = '+JSON.stringify(data));
        expect(data.length).toBe(2);
        done();
    }
    empDao.getAllEmp(callback);
});

/** Get one employee from the db. */
test('GetOneEmployee from db', done =>{
    
    function callback(status, data) {
        console.log('Test callback: status = '+status+ ', data = '+JSON.stringify(data));
        expect(data[0].name).toBe('Bentoooo');
        done();
    }
    empDao.getOne(2, callback);
});

/** Count every employee in the db */
test('Count All employees in db', done =>{
    
    function callback(status, data){
        console.log("Test callback: status = "+status+ ", data = "+JSON.stringify(data));
        expect(data[0].x).toBe(2);
        done()
    }
    empDao.countEmps(callback);
});

/** Add employee to the db */
test('Insert new employee in db', done =>{
    
    function callbackA(status, data){
        console.log("Test callback: status = "+status+ ", data = "+JSON.stringify(data));
        expect(data.length).toBe(3);
        done();
    }
    empDao.addEmployee(
        {"name":"Simon", "tel":"48104122", "email":"sim@on.lil", "password": "lett", "province":1, "district":24},
        callbackB
    );

    function callbackB(status, data){
        empDao.getAllEmp(callbackA);
    }
});


/** Get all employees in a given province */
test("Get all employees in a given province", done =>{
    
    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data.length).toBe(2);
        done();
    }
    empDao.getAllEmpProvince(1, callback);
});

/** Count all employees in a given province with province number */
test("Count all employees in a gives province", done =>{

    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data[0].x).toBe(2);
        done();
    }
    empDao.countEmpsProvince(1, callback);
});

/** Delete one employee in the db based on employee_id */
test("Delete one employee in the db", done =>{
    
    function callbackA(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data.length).toBe(2);
        done();
    }
    empDao.deleteEmpById(1,callbackB);

    function callbackB(status, data){
        empDao.getAllEmp(callbackA);
    }
})

/** Edit one employee in the db based on employee_id */
test("Edit one employee in the db", done =>{

    function callbackA(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data[0].name).toBe("Ben-endret");
        expect(data[0].tel).toBe(12345678);
        expect(data[0].email).toBe("test@endret.no");
        expect(data[0].province).toBe(1);
        expect(data[0].district).toBe(23);
        done();
    }
    empDao.updateEmp(
        {"name":"Ben-endret", "tel":"12345678", "email":"test@endret.no", "province":1, "district":23},
        2,
        callbackB
    );

    function callbackB(status, data){
        empDao.getOne(2, callbackA);
    }
});

/** Update one employees password in the db */
test("Edit one employees password in the db", done =>{

    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data.affectedRows).toBe(1);
        done();
    }
    empDao.updateEmpPassword(
        {"password":"testpw", "employee_id":3},
        callback
    );
})

