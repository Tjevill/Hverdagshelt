const Dao = require("./dao.js");


'use strict';
var crypto = require('crypto');


type jsonUpdate = {
	user_id: number,
	name: string,
	address: string,
	zipcode: string,
	tel: number,
	email: string,
	subscription: number

};

type jsonUpdateSub = {
	user_id: number,
	subscription: number
}

type jsonUpdateUserPWord = {
	user_id: number,
	password: string
}


var genRandomString = function (length) {
	return crypto.randomBytes(Math.ceil(length / 2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0, length);
	/** return required number of characters */
};

var sha512 = function (password, salt) {
	var hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	var value = hash.digest('hex');
	return {
		salt: salt,
		passwordHash: value
	};
};

module.exports = class UserDao extends Dao {

	/**	Get all districts. */
	getAllDistricts (callback: mixed) {
		super.query(
			"select * FROM fylke",
			[],
			callback);
	}

	/** Get all provinces on district_id. */
	getProvincesFromFylke (id: number, callback: mixed) {
		super.query(
			"select * FROM kommune WHERE fylke_id = ?",
			[id],
			callback
		);
	}

	/**	Get all users in the db. */
	getAll (callback: mixed) {
		super.query(
			"select user_id, name, address, zipcode, tel, email, subscription FROM User",
			[],
			callback);
	}

	/**	Get one user from the db based on user_id.
	*	@param id - User_id for the user you wish to retrieve from the db.
	*/
	getOneByID (id: number, callback: mixed) {
		super.query(
			"select user_id, name, address, zipcode, tel, email, subscription FROM User WHERE user_id = ?",
			[id],
			callback
		);
	}

	getHashedPWord(id: number, callback: mixed){
		super.query(
			"select user_id, password, secret from User where user_id = ?",
			[id],
			callback
		);

	}

	/**
	 * Use this method for updating personal data, except password
	 * @param json
	 * @param callback
	 */
	updateUser (json: jsonUpdate, callback: mixed) {
		let val = [json.name, json.address, json.zipcode, json.tel, json.email, json.subscription, json.user_id];
		super.query(
			"update User set name = ?, address = ?, zipcode = ?, tel = ?, email = ?, subscription = ? where user_id = ?",
			val,
			callback
		);
	}

	/**
	 * Use this method for changing password for the user
	 * @param json
	 * @param callback
	 */
	updateUserPassword (json: jsonUpdateUserPWord, callback: mixed) {
		let salt = genRandomString(32);
		/** Creates a salt of 32 bytes. BYTES ARE CHEAP! */
		let passwordData = sha512(json.password, salt);
		let val = [passwordData.passwordHash, passwordData.salt, json.user_id];
		super.query(
			"update User set password = ?, secret = ? where user_id = ?",
			val,
			callback
		);
	}

	/**	 Update the subscription on the given user.
	*	@param json - json-object with the edited subscription level and user_id.
	*/
	updateSubription (json: jsonUpdateSub, callback: mixed) {
		let val = [json.subscription, json.user_id];
		super.query(
			"update User set subscription = ? where user_id = ?",
			val,
			callback
		);
	}

	/**	Delete user in the db on user_id.
	*	@param id - user_id for the user you wish to delete from db.
	*/
	deleteUserByID (id: number, callback: mixed) {
		let val = id;
		super.query(
			"delete from User where user_id = ?",
			[val],
			callback
		);
	}

	/**	Get the number of users in the db. */
	getCountUsers (callback: mixed) {
		super.query(
			"select COUNT(*) as x from User",
			[],
			callback
		);
	}

	/**	Get the email for a given user
	*	@param id - user_id of the user you wish to retrieve the mail for.
	*/
	getEmailUserByID (id: number, callback: mixed) {
		let val = id;
		super.query(
			"select email from User where user_id = ?",
			[val],
			callback
		);
	}

	/**	Get the province from the user based on user_id
	*	@param id - the user_id you wish the province for.
	*/
	getUsersProvinceByUserID (id: number, callback: mixed) {
		super.query(
			"select province from Place where zipcode = (select zipcode from User where user_id = ?)",
			[id],
			callback
		)
	}

	/**	Add a new user to the db
	 *	@param json - json-object with the new data needed to create a new user in the db.
	 */
	addUser (json, callback) {
		var salt = genRandomString(32);
		/** Creates a salt of 32 bytes. BYTES ARE CHEAP! */
		var passwordData = sha512(json.password, salt);
		var val = [json.name, json.address, json.zipcode, json.tel, json.email, json.username, passwordData.passwordHash, passwordData.salt, json.subscription];
		super.query(
			"insert into User (name, address, zipcode, tel, email, username, password, secret, subscription) values (?,?,?,?,?,?,?,?,?)",
			val,
			callback
		);
	}


    getUserByEmail(email, callback) {
        super.query(
            "select * from User where email = ?",
            [email],
            callback
        );
    }


};