// @flow

const mysql = require('mysql');
jest.setTimeout(10000);

const CategoryDao = require("../dao/categorydao.js");
const runsqlfile = require('./runsqlfile.js');

// GitLab CI Pool
const pool = mysql.createPool({
	connectionLimit: 1,
	host: 'mysql.stud.iie.ntnu.no',
	user: 'benos',
	password: 'uJHtIkcl',
	database: 'benos',
	debug: false,
	multipleStatements: true
});

let categorydao = new CategoryDao(pool);

beforeAll(done => {
	runsqlfile('dao/tests/create_tables.sql', pool, () => {
		runsqlfile('dao/tests/create_testdata.sql', pool, done);
	});
});

afterAll( () => {
    pool.end();
});

test('getAllCategories from categorydao.js', done => {
	function callback(status, data) {
		console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
		expect(data.length).toBe(2);
		done();
	}
	categorydao.getAll(callback);
});

test('getOneByID from categorydao.js', done => {
	function callback(status, data) {
		console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
		expect(data.length).toBe(1);
		done();
	}
	categorydao.getOneByID(1, callback);
});

test('updateCategory from categorydao.js', done => {
	function callback(status, data) {
		console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
		expect(data.length).toBe(1);
		done();
	}
	categorydao.getOneByID(1, callback);
});