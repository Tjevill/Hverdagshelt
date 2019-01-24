// @flow

let mysql = require('mysql');
jest.setTimeout(50000);

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

beforeAll(done => {
	runsqlfile("dao/tests/create_tables.sql", pool, () => {
		runsqlfile("dao/tests/create_testdata.sql", pool, done);
	});
});

afterAll(done => {
	runsqlfile('dao/tests/delete_testdata.sql', pool, done);
});

/**
 * Gets all statuses from Status table in DB
 */
test("Get every status from db", done => {
	function callback (status, data) {
		console.log("Test callback: status = " + status + " , data = " + JSON.stringify(data));
		expect(data.length).toBe(5);
		expect(data[0].description).toEqual('Status1');
		expect(data[1].description).toEqual('Status2');
		expect(data[2].description).toEqual('Status3');
		expect(data[3].description).toEqual('Status4');
		expect(data[4].description).toEqual('Status5');
		done();
	}
	
	statDao.getAllStatuses(callback);
});

/**
 * Gets one status by its id from Status table in DB
 */
test("Get one status from db", done => {
	function callback (status, data) {
		console.log("Test callback: status = " + status + " , data = " + JSON.stringify(data));
		expect(data[0].description).toBe("Status1");
		done();
	}
	
	statDao.getOneById(1, callback);
});