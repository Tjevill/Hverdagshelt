// @flow

const Dao = require("./dao.js");

type jsonUpdate = {
	user_id: number,
	name: string,
	address: string,
	zipcode: string,
	tel: number,
	email: string,
	username: string,
	password: string,
	subscription: number
	
};

module.exports = class UserDao extends Dao {
	
	getAll (callback: mixed) {
		super.query(
			"select user_id, name, address, zipcode, tel, email, username, subscription FROM User",
			[],
			callback);
	}
	
	getOneByID (id: number, callback: mixed) {
		super.query(
			"select user_id, name, address, zipcode, tel, email, username, subscription FROM User WHERE user_id = ?",
			[id],
			callback
		);
	}
	
	updateUser (json: jsonUpdate, callback: mixed){
		let val = [json.name, json.address, json.zipcode, json.tel, json.email, json.username, json.password, json.subscription, json.user_id];
		super.query(
			"update User set name = ?, address = ?, zipcode = ?, tel = ?, email = ?, username = ?, password = ?, subscription = ? where user_id = ?",
			val,
			callback
		);
	}
	
	deleteUserByID(id: number, callback: mixed) {
		let val = id;
		super.query(
			"delete from User where user_id = ?",
			[val],
			callback
		);
	}
	
	getCountUsers(callback: mixed) {
		super.query(
			"select COUNT(*) as x from User",
			[],
			callback
		)
	}
	
};