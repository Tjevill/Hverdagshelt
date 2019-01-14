// @flow

let mysql = require('mysql');
jest.setTimeout(10000);

const Statusdao = require("../dao/statusdao.js");
const runsqlfile = require("./runsqlfile.js");

//GitLab CI pool
let pool = mysql.createPool({
  connectionLimit: 1,
  host: 'mysql.stud.iie.ntnu.no',
  user: 'benos',
  password: 'uJHtIkcl',
  database: 'benos',
  debug: false,
  multipleStatements: true
});

let statDao = new Statusdao(pool);

beforeAll(done =>{
    runsqlfile("dao/tests/create_tables.sql", pool, () =>{
        runsqlfile("dao/tests/create_testdata.sql", pool, done);
    });
});

test("Get every status from db", done =>{
    function callback(status, data){
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data.length).toBe(6);
        done();
    }
    statDao.getAllStatuses(callback);
});

test("Get one status from db", done =>{
    function callback(status, data){
        console.log("Test callback: status = "+ status + " , data = "+JSON.stringify(data));
        expect(data[0].description).toBe("Ubehandlet");
        done();
    }
    statDao.getOneById(1, callback);
});