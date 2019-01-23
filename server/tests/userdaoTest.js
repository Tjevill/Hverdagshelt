// @flow

let mysql = require('mysql');
jest.setTimeout(50000);

const Userdao = require("../dao/userdao.js");
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


let userdao = new Userdao(pool);
beforeAll(done => {
    runsqlfile('dao/tests/create_tables.sql', pool, () => {
        runsqlfile('dao/tests/create_testdata.sql', pool, done);
    });
});

afterAll(done => {
    runsqlfile('dao/tests/delete_testdata.sql', pool, done);
});

test("Get all users", done => {
    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data.length).toBe(33);
        done()
    }
    userdao.getAll(callback);
});

test("Get one user with user_id", done => {
    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data[0].name).toBe("simon");
        done();
    }
    userdao.getOneByID(66, callback);
});

test("Get hashed password for user by user_id", done => {
    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data[0].password).toBe("e7b18214940c1d19abd1dab2dc5a5195f16165a10d7f169161cb2dd9c5ec879c71377d4b731f09a8ca90678535eb706429b6edee1e891d2e921e16905b00d9e9");
        done();
    }
    userdao.getHashedPWord(66, callback);
});

test("Update one user with the user_id", done => {

    function callback(status, data){
       console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
       expect(data[0].name).toBe("Ben");
       expect(data[0].address).toBe("Benroad 10");
       expect(data[0].zipcode).toBe(7069);
       expect(data[0].tel).toBe("12345678");
       expect(data[0].email).toBe("Benben@ben.no");
       expect(data[0].subscription).toBe(1);
       done();
    }

    userdao.updateUser(
       {
           name : "Ben",
           address : "Benroad 10",
           zipcode : 7069,
           tel : "12345678",
           email : "Benben@ben.no",
           subscription : 1,
           user_id : 66
       },
       callbackB
    );

    function callbackB(){
        userdao.getOneByID(66, callback);
   }

});

test("Update user password with the user_id", done => {

    function callback(status, data){

        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data[0].password).to
    }
});

























