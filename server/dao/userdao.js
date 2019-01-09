const Dao = require("./dao.js")


'use strict';
var crypto = require('crypto');

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
