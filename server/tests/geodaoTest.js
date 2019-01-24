// @flow

let mysql = require('mysql');
jest.setTimeout(50000);
const config = require('../../config.js');
const Geodao = require("../dao/geodao.js");
const runsqlfile = require("./runsqlfile.js");

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

let geoDao = new Geodao(pool);

beforeAll(done => {
	runsqlfile("dao/tests/create_tables.sql", pool, () => {
		runsqlfile("dao/tests/create_testdata.sql", pool, done);
	});
});

afterAll(done => {
	runsqlfile('dao/tests/delete_testdata.sql', pool, done);
});

test("getAllCommunes", done => {
    function callback (status, data) {
    console.log("Test callback: status = " + status + " , data = " + JSON.stringify(data));
    expect(data[0].zipcode).toBe("0001");
    expect(data[0].province).toBe("OSLO");
    expect(data[1].zipcode).toBe("1001");
    expect(data[1].province).toBe("OSLO");
    expect(data[2].zipcode).toBe("2001");
    expect(data[2].province).toBe("LILLESTRØM");
    done();
    }
    geoDao.getAllCommunes(callback);
});


test("getCommunesCounty", done => {
    function callback (status, data) {
    console.log("Test callback: status = " + status + " , data = " + JSON.stringify(data));
    expect(data[0].navn).toBe("OSLO");
    
    done();
    }
    geoDao.getCommunesCounty(1,callback);
});

test("getCommuneName", done => {
    function callback (status, data) {
    console.log("Test callback: status = " + status + " , data = " + JSON.stringify(data));
    expect(data[0].navn).toBe("TRONDHEIM");
    
    done();
    }
    geoDao.getCommuneName(2,callback);
});


test("getCommunesFromKommune", done => {
    function callback (status, data) {
    console.log("Test callback: status = " + status + " , data = " + JSON.stringify(data));
    expect(data[0].navn).toBe("OSLO");
    expect(data[1].navn).toBe("TRONDHEIM");
    
    done();
    }
    geoDao.getCommunesFromKommune(callback);
});




