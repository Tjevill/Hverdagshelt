const Dao = require("./dao.js")


'use strict';
var crypto = require('crypto');


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



var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

module.exports = class UserDao extends Dao {

    getAllDistricts (callback: mixed) {
        super.query(
            "select * FROM fylke",
            [],
            callback);
    }


    getProvincesFromFylke (id: number, callback: mixed) {
        super.query(
            "select * FROM kommune WHERE fylke_id = ?",
            [id],
            callback
        );
    }

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


    addUser(json, callback) {
      var salt = genRandomString(32); /** Creates a salt of 32 bytes. BYTES ARE CHEAP! */
      var passwordData = sha512(json.password, salt);
      var val = [json.name, json.address, json.zipcode, json.tel, json.email, json.username, passwordData.passwordHash, passwordData.salt, json.subscription];
      super.query(
        "insert into User " +
          "(name, address, zipcode, tel, email, username, password, secret, subscription) " +
          "values (?,?,?,?,?,?,?,?,?)",
        val,
        callback
      );
    }

    getUsername(username, callback) {
      super.query(
        "select * from User where username = ?",
        [username],
        callback
      );
    }

};