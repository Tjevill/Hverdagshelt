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

module.exports = class EmployeeDao extends Dao {


    addOrganization(json, callback) {
        var salt = genRandomString(32); /** Creates a salt of 32 bytes. BYTES ARE CHEAP! */
        var passwordData = sha512(json.password, salt);
        var val = [json.organizationnumber, json.name, json.tel, json.email, passwordData.passwordHash, passwordData.salt];
        super.query(
            "insert into Organization (organizationnumber, name, tel, email, password, secret) values (?,?,?,?,?,?)",
            val,
            callback
        );
    }

    addManyRefrences(json, company_id, callback) {
        console.log("json; ", company_id);
        console.log("testing: " + json.length);

        json.map(hm =>

            console.log("catid: " + hm.catid)

          /super.query(
                "INSERT INTO Org_cat (org_id, category_id) values (?,?)",
                [company_id, hm.catid],
                callback
            )

        );


    }


    addEmployee(json, callback) {
        var salt = genRandomString(32); /** Creates a salt of 32 bytes. BYTES ARE CHEAP! */
        var passwordData = sha512(json.password, salt);
        var val = [json.name, json.tel, json.email, passwordData.passwordHash, passwordData.salt, json.county, json.commune];
        super.query(
            "insert into Employee (name, tel, email, password, secret, county, commune) values (?,?,?,?,?,?,?)",
            val,
            callback
        );
    }

    getBedriftByEmail(email, callback) {
        console.log("Getting Bedrift based on its email: " + email);
        super.query(
            "select * from Organization where email = ?",
            [email],
            callback
        );
    }


    getEmployeeByEmail(email, callback) {
        super.query(
            "select * from Employee where email = ?",
            [email],
            callback
        );
    }

    getAllCategories(callback: mixed) {
        super.query(
            "select * FROM Category",
            [],
            callback);
    }


};