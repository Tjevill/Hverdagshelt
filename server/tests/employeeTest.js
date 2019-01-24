// @flow

let mysql = require('mysql');
jest.setTimeout(50000);
//const config = require('../../config.js');


const EmplDao = require("../dao/employeedao.js");
const runsqlfile = require('./runsqlfile.js');

// const host = config.testdb.host;
// const user = config.testdb.user;
// const database = config.testdb.database;
// const password = config.testdb.password;

// GitLab CI Pool
const pool = mysql.createPool({
  connectionLimit: 1,
  host: 'mysql',
  user: 'root',
  password: 'secret',
  database: 'supertestdb',
  debug: false,
  multipleStatements: true
});
let empDao = new EmplDao(pool);

beforeAll(done => {
    runsqlfile('dao/tests/create_tables.sql', pool, () =>{
        runsqlfile('dao/tests/create_testdata.sql', pool, done);
    });
});

// afterAll(done => {
// 	runsqlfile('dao/tests/delete_testdata.sql', pool, done);
// });


/**
 * Get all employees in the db
 */
test("Get all employees in db", done =>{

    function callback(status, data){
        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data.length).toBe(10);
        done();
    }
    empDao.getAllEmp(callback);
});


/**
 * Add one employee to the db
 */
test("Add an employee into the db", done => {

    function callback(status, data){
        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data.length).toBe(11);
        done();
    }
    empDao.addEmployee(
        {
            name : "AddTestEmp",
            tel : 12345678,
            email : "addtestEmp@test.no",
            commune : 1,
            county : 1,
            password : "testadd"
        },
        callbackB
    );

    function callbackB(){
        empDao.getAllEmp(callback);
    }
});


/**
 * Get all the employees in a specific commune based on commune_id.
 */
test("Get all employees in one commune", done =>{

    function callback(status, data){
        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data.length).toBe(4);
        done();
    }
    empDao.getAllEmpCommune(1, callback);
});


/**
 *  Delete one employee using employee_id.
 */
test("Delete one employee in the db", done =>{

    function callback(status, data){
        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data.length).toBe(10);
        done();
    }
    empDao.deleteEmpById(21, callbackB);

    function callbackB(){
        empDao.getAllEmp(callback);
    }
});


/**
 * Update one employee in the db using employee_id.
 * Also tests the getOne() method.
 */
test("Update one employee in the db and getOne().", done =>{

    function callback(status, data){
        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data[0].name).toBe("TestEdit emp");
        expect(data[0].tel).toBe(87654321);
        expect(data[0].email).toBe("testedit@test.no");
        expect(data[0].commune).toBe(2);
        expect(data[0].county).toBe(2);
        done();
    }
    empDao.updateEmp(
        {
            name: "TestEdit emp",
            tel : 87654321,
            email : "testedit@test.no",
            commune: 2,
            county: 2,
        },
        3,
        callbackB
    );

    function callbackB(){
        empDao.getOne(3, callback);
    }
});


/**
 *  Count all employees in the db
 */
test("Count all the employees in the db", done =>{

    function callback(status, data){
        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data[0].x).toBe(10);
        done()
    }

    empDao.countEmps(callback);
});


/**
 * Count all the employees in a given province.
 */
test("Count all the employees in a given province", done =>{

    function callback(status, data){
        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data[0].x).toBe(3);
        done();
    }
    empDao.countEmpsProvince(1, callback);
});


/**
 * Get one employee by email
 */
test("Get one employee searching on email", done =>{

    function callback(status, data){

        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data[0].employee_id).toBe(1);
        expect(data[0].name).toBe("Øyvind Valstadsve");
        done();
    }
    empDao.getEmployeeByEmail("oyvinval@stud.ntnu.no", callback);
});


/**
 * Get every case assigned to one employee.
 * This query uses the Cases table.
 */
test("Get every case assigned to one employee", done =>{

    function callback(status, data){

        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data.length).toBe(6);
        done();
    }
    empDao.getCaseOnEmployeeID(1, callback);
});

