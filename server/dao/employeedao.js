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

    /** Create an employee and add in the db */
    addEmployee(json, callback) {
        var salt = genRandomString(32); /** Creates a salt of 32 bytes. BYTES ARE CHEAP! */
        var passwordData = sha512(json.password, salt);
        var val = [json.name, json.tel, json.email, json.province, json.district, passwordData.passwordHash, passwordData.salt];
        super.query(
            "INSERT INTO Employee (name, tel, email, province, district, password, secret) VALUES (?,?,?,?,?,?,?)",
            val,
            callback
        );
    }

    /** Alter employee in the database */
    //alterEmp();

    /** Get all employees */
    getAllEmp(callback: any){
        super.query(
            "SELECT * FROM Employee",
            [],
            callback
        );
    }

    /** Get all employees in province */
    getAllEmpProvince(province: string, callback){
        super.query(
            "SELECT * FROM Employee WHERE province = ?",
            [province],
            callback
        );
    }

    /** Get one employee on employee_id */
    getOne(employee_id:number, callback: any){
        super.query(
            "SELECT * FROM Employee WHERE employee_id = ?",
            [employee_id],
            callback
        );
    }

    /** Get number of employees */
    countEmps(callback){
        super.query(
            "SELECT COUNT(*) AS x FROM Employee",
            [],
            callback
        );
    }

    /** Get number of employees in province */
    countEmpsProvince(province: string, callback: any){
        super.query(
            "SELECT COUNT(*) AS x FROM Employee WHERE province = ?",
            [province],
            callback
        );
    }


};