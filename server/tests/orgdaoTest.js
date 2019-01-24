// @flow

let mysql = require('mysql');
jest.setTimeout(50000);

const Orgdao = require("../dao/orgdao.js");
const runsqlfile = require('./runsqlfile.js');

// GitLab CI Pool
let pool = mysql.createPool({
    connectionLimit: 1,
    host: 'mysql.stud.iie.ntnu.no',
    user: 'benos',
    password: 'uJHtIkcl',
    database: 'benos',
    debug: false,
    multipleStatements: true
});


let orgdao = new Orgdao(pool);

beforeAll(done => {
    runsqlfile('dao/tests/create_tables.sql', pool, () => {
        runsqlfile('dao/tests/create_testdata.sql', pool, done);
    });
});

afterAll(done => {
    runsqlfile('dao/tests/delete_testdata.sql', pool, done);
});


/**
 * Retrieve every organization from the db.
 */
test("Get all organizations in the db", done =>{

    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data.length).toBe(4);
        done();
    }
    orgdao.getAll(callback);
});


/**
 * Get one organization from the db using the org_id
 */
test("Get one organization from the db using org_id", done =>{

    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data[0].name).toBe("Josteins Propan Og Badeballe");
        done();
    }
    orgdao.getOneByID(2, callback);
});


/**
 * Update an existing organization in the db.
 * Sending in a json-object with the rightful attributes.
 * This test does NOT update the organization password!
 */
test("Update existing organization in the db", done =>{

    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data[0].name).toBe("TestOrg");
        done();
    }
    orgdao.updateOrg(
        {
            organizationnumber : 12345678,
            name: "TestOrg",
            email : "testorg@test.no",
            tel : "12345678",
            org_id : 2
        },
        callbackB
    );

    function callbackB(){
        orgdao.getOneByID(2, callback);
    }
});


/**
 * Get the hashed password for the organization using the org_id
 */
test("Get hashed password for org", done =>{

    function callback(status, data){

        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data[0].password).toBe("3e6110ed79a8e9fae7d418078cc0a9750aa2b8cee550c9a06160de7fa8c793d3786f37dc9b89ea781ef58a02aca80f44c2711b5aebfcf9e3a8a464f6f75720d2");
        done();
    }
    orgdao.getHashedPWord(2, callback);
});


/**
 * Delete one organization from the db using the org_id.
 */
test("Delete one organization from the db", done =>{

    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data.length).toBe(3);
        done();
    }

    orgdao.deleteOrgByID(15, callbackB);

    function callbackB(){
        orgdao.getAll(callback);
    }
});


/**
 * Create an organization and add it to the db.
 */
test("Create organization", done =>{

    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data.length).toBe(4);
        done();
    }
    orgdao.addOrganization(
        {
            organizationnumber: 23456789,
            name: "AddTest",
            tel: "12345678",
            email: "addTest@test.no",
            password : "testpassord"
        },
        callbackB
    );

    function callbackB(){
        orgdao.getAll(callback);
    }
});

/**
 * Get the number of organizations in the db.
 */
test("Count every organization in the db", done => {

    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data[0].x).toBe(4);
        done();
    }
    orgdao.getCountOrg(callback);
});

/**
 * Get an organization using email.
 */
test("Get one organization using email", done => {

    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data[0].name).toBe("AddTest");
        expect(data[0].tel).toBe("12345678");
        expect(data[0].email).toBe("addTest@test.no");
        done();
    }
    orgdao.getOrgByEmail("addTest@test.no", callback);
});

test("Get all cases assigned to a organization in the db", done => {

    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data.length).toBe(1);
        done();
    }
    orgdao.getAllCasesOrg(1, callback);
});
